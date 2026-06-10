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
// Uses HuggingFace IDM-VTON Gradio Space (free, no credits needed)
// Falls back through multiple spaces if one is sleeping

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
}

// Try the Kolors space (Kwai-Kolors/Kolors-Virtual-Try-On)
async function tryKolors(client, humanBlob, garmentBlob, category) {
  const result = await client.predict('/tryon', {
    person_image: humanBlob,
    garment_image: garmentBlob,
    garment_des: `${category || 'clothing'} item`,
    denoise_steps: 20,
    seed: 42,
  });
  return result?.data?.[0];
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
          outputImage = await tryIDMVTON(client, humanBlob, garmentBlob, category).catch(e => {
            console.warn(`IDM-VTON prediction failed: ${e.message}`);
            return null;
          });
        } else {
          outputImage = await tryKolors(client, humanBlob, garmentBlob, category).catch(e => {
            console.warn(`Kolors prediction failed: ${e.message}`);
            return null;
          });
        }

        if (outputImage) {
          console.log(`✅ Virtual Try-On success via ${spaceName}`);
          break;
        }
      } catch (spaceErr) {
        console.warn(`⚠️  Space "${spaceName}" failed: ${spaceErr.message}`);
        lastError = spaceErr;
      }
    }

    if (!outputImage) {
      return res.status(503).json({
        error: 'All AI try-on spaces are currently busy or sleeping. Please try again in 1–2 minutes.',
        details: lastError?.message,
      });
    }

    // outputImage may be { url: '...' } or a raw URL string
    const imageUrl =
      typeof outputImage === 'object' && outputImage?.url
        ? outputImage.url
        : outputImage;

    res.json({ success: true, resultImage: imageUrl });
  } catch (err) {
    console.error('❌ Virtual Try-On Error:', err.message);
    res.status(500).json({
      error: 'Try-on processing failed. Please try again.',
      details: err.message,
    });
  }
});

// ── SAVE TRY-ON RESULT ──
// POST /api/tryon/save  (requires auth)
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { resultImage, productId, productName, productImage, category } = req.body;
    if (!resultImage) return res.status(400).json({ error: 'No result image provided' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.savedTryOns.unshift({ resultImage, productId, productName, productImage, category });
    // Keep only latest 20 try-ons per user
    if (user.savedTryOns.length > 20) user.savedTryOns = user.savedTryOns.slice(0, 20);
    await user.save();

    res.json({ success: true, message: 'Try-on saved to your profile!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET SAVED TRY-ONS  on that──
// GET /api/tryon/saved  (requires auth)
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
// DELETE /api/tryon/saved/:id  (requires auth)
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
