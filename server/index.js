const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

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

// ── ADMIN ROUTES (order matters: products before auth) ──
app.use('/api/admin/products', adminProductsRoute);
app.use('/api/admin', adminAuthRoute)

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

app.get("/", (req, res) => res.send("API is running"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ HMA-Store connected to MongoDB Atlas!"))
  .catch((err) => console.log("❌ Connection Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));