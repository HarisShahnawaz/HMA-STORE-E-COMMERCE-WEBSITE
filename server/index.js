
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/Product');
const adminAuthRoute = require('./routes/adminAuth');
const adminProductsRoute = require('./routes/adminProducts');

const app = express();
app.use(cors());
app.use(express.json());

// ── ADMIN ROUTES ──
app.use('/api/admin/products', adminProductsRoute);
app.use('/api/admin', adminAuthRoute);

// ── PUBLIC ROUTES ──
app.get("/api/products", async (req, res) => {
  try {
    const { category, isNew, isSale, aiRecommended } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (isNew) filter.isNew = true;
    if (isSale) filter.isSale = true;
    if (aiRecommended) filter.aiRecommended = true;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── SEARCH ROUTE ──
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") return res.json([]);

    // Try MongoDB full-text search first
    const results = await Product.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } }) // best match first
      .limit(6);

    res.json(results);
  } catch (err) {
    // Fallback to regex if text index not ready
    try {
      const results = await Product.find({
        $or: [
          { name: { $regex: req.query.q, $options: "i" } },
          { category: { $regex: req.query.q, $options: "i" } },
        ],
      }).limit(6);
      res.json(results);
    } catch (fallbackErr) {
      res.status(500).json({ error: fallbackErr.message });
    }
  }
});

app.get("/", (req, res) => res.send("API is running"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ HMA-Store connected to MongoDB Atlas!"))
  .catch((err) => console.log("❌ Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));