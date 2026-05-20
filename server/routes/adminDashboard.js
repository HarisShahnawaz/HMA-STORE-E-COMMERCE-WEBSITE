const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const ActivityLog = require('../models/ActivityLog');
const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/admin/dashboard-stats
// @desc    Get counts, total sales, activity logs, and orders
router.get('/', adminAuth, async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersCount = await Order.countDocuments();

    // Calculate total sales/revenue from orders
    const orders = await Order.find().sort({ createdAt: -1 });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Get latest activities
    const activities = await ActivityLog.find().sort({ createdAt: -1 }).limit(30);

    res.json({
      productsCount,
      usersCount,
      ordersCount,
      totalRevenue,
      orders,
      activities
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
