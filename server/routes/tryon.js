const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── AUTH MIDDLEWARE ──
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── VIRTUAL TRY-ON ROUTE ──
const SPACES = [
  'yisol/IDM-VTON',
  'Kwai-Kolors/Kolors-Virtual-Try-On',
];

// Helper: convert base64 string → Blob
function base64ToBlob(base64) {
  const stripped = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(stripped, 'base64');
  return new Blob([buffer], { type: 'image/jpeg' });
}

// Try the IDM-VTON space (yisol/IDM-VTON)
async function tryIDMVTON(client, humanBlob, garmentBlob, category) {
  try {
    const result = await client.predict('/tryon', {
      dict: { background: humanBlob, layers: [], composite: null },
      garm_img: garmentBlob,
      garment_des: `${category || 'clothing'} item`,
      is_checked: true,
      is_checked_crop: false,
      denoise_steps: 30,
      seed: 42,
    });
    return result?.data?.[0];
  } catch (err) {
    console.warn(`IDM-VTON prediction step execution failed: ${err.message}`);
    return null;
  }
}

// Try the Kolors space (Kwai-Kolors/Kolors-Virtual-Try-On)
async function tryKolors(client, humanBlob, garmentBlob, category) {
  try {
    // Bro, updated properties to match current Kwai-Kolors Gradio API payload specs
    const result = await client.predict('/tryon', {
      person_img: humanBlob,
      garment_img: garmentBlob,
      garment_des: `${category || 'clothing'} item`,
      denoise_steps: 20,
      seed: 42,
    });
    return result?.data?.[0];
  } catch (err) {
    console.warn(`Kolors prediction step execution failed: ${err.message}`);
    return null;
  }
}

router.post('/', async (req, res) => {
  try {
    const { userPhotoBase64, productImageBase64, category } = req.body;

    if (!userPhotoBase64 || !productImageBase64) {
      return res.status(400).json({ error: 'Both user photo and product image are required.' });
    }

    // Dynamically import @gradio/client (ESM inside CJS)
    const { Client } = await import('@gradio/client');

    const humanBlob = base64ToBlob(userPhotoBase64);
    const garmentBlob = base64ToBlob(productImageBase64);

    let outputImage = null;
    let lastError = null;

    // Try each space in order until one succeeds
    for (let i = 0; i < SPACES.length; i++) {
      const spaceName = SPACES[i];
      try {
        console.log(`🪞 Trying space: ${spaceName} ...`);

        const client = await Client.connect(spaceName, {
          hf_token: process.env.HF_TOKEN || undefined,
        });

        if (i === 0) {
          outputImage = await tryIDMVTON(client, humanBlob, garmentBlob, category);
        } else {
          outputImage = await tryKolors(client, humanBlob, garmentBlob, category);
        }

        if (outputImage) {
          console.log(`✅ Virtual Try-On success via ${spaceName}`);
          let imageUrl = typeof outputImage === 'object' && outputImage?.url ? outputImage.url : outputImage;
          if (imageUrl && typeof imageUrl === 'string' && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            const root = client.config?.root || `https://${spaceName.replace('/', '-').toLowerCase()}.hf.space`;
            const cleanUrl = imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
            imageUrl = `${root.replace(/\/$/, '')}${cleanUrl}`;
          }
          outputImage = imageUrl;
          break;
        }
      } catch (spaceErr) {
        console.warn(`⚠️  Space "${spaceName}" connection/execution failed: ${spaceErr.message}`);
        lastError = spaceErr;
      }
    }

    if (!outputImage) {
      return res.status(503).json({
        error: 'All AI try-on spaces are currently busy or sleeping. Please try again in 1–2 minutes.',
        details: lastError?.message,
      });
    }

    res.json({ success: true, resultImage: outputImage });
  } catch (err) {
    console.error('❌ Virtual Try-On Error:', err.message);
    res.status(500).json({
      error: 'Try-on processing failed. Please try again.',
      details: err.message,
    });
  }
});

// ── SAVE TRY-ON RESULT ──
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { resultImage, productId, productName, productImage, category } = req.body;
    if (!resultImage) return res.status(400).json({ error: 'No result image provided' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.savedTryOns.unshift({ resultImage, productId, productName, productImage, category });
    if (user.savedTryOns.length > 20) user.savedTryOns = user.savedTryOns.slice(0, 20);
    await user.save();

    res.json({ success: true, message: 'Try-on saved to your profile!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET SAVED TRY-ONS ──
router.get('/saved', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('savedTryOns');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.savedTryOns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE SAVED TRY-ON ──
router.delete('/saved/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.savedTryOns = user.savedTryOns.filter(t => t._id.toString() !== req.params.id);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;