const dns = require('dns');

// Force Node to use native OS lookup instead of c-ares, bypassing ISP SRV blocks
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setDefaultResultOrder('ipv4first'); // Tells node to prioritize standard IPv4 paths
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  } catch (err) {
    console.warn("⚠️ DNS: Failed to set custom DNS configurations:", err.message);
  }
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/Product');
const adminAuthRoute = require('./routes/adminAuth');
const adminProductsRoute = require('./routes/adminProducts');
const assistantRoute = require('./routes/assistant');
const authRoute = require('./routes/auth');
const ordersRoute = require('./routes/orders');
const adminDashboardRoute = require('./routes/adminDashboard');
const paymentRoute = require('./routes/payment');
const tryonRoute = require('./routes/tryon');


const app = express();
app.use(cors());

app.use('/api/payment', paymentRoute); 

// Increased limit for base64 image uploads (Virtual Try-On)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serverless-friendly MongoDB connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

// Ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ── ADMIN ROUTES ──
app.use('/api/admin/products', adminProductsRoute);
app.use('/api/admin', adminAuthRoute);
app.use('/api/admin/dashboard-stats', adminDashboardRoute);


app.use('/api/assistant', assistantRoute);


app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/tryon', tryonRoute);


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

    // Perform partial substring match (regex) on name or category for real-time autocomplete
    const results = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    }).limit(6);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("API is running"));



// Only listen locally — Vercel handles this automatically in production
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;

