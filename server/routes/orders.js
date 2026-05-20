const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const ActivityLog = require('../models/ActivityLog');
const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order (supports guest and logged-in users)
router.post('/', async (req, res) => {
  try {
    const {
      formData,
      items,
      paymentMethod,
      cartTotal,
      discountAmount,
      finalShipping,
      finalTotal
    } = req.body;

    if (!formData || !items || !paymentMethod || cartTotal === undefined || finalTotal === undefined) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    // Optional user authentication association
    let userId = null;
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.warn('Optional JWT verification failed for order:', err.message);
      }
    }

    // Create Order
    const newOrder = new Order({
      user: userId,
      userEmail: formData.email || req.body.userEmail || (userId ? 'registered-user' : 'guest@hmastore.com'), // fallback if not supplied
      userName: formData.fullName,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      province: formData.province,
      paymentMethod,
      items,
      subtotal: cartTotal,
      discount: discountAmount || 0,
      shippingFee: finalShipping || 0,
      total: finalTotal
    });

    // Make sure we have email details for activity log & database mapping
    // If guest, we use their email from formData (if supplied, let's make sure client sends it)
    const orderEmail = formData.email || (userId ? 'registered-user' : 'guest@hmastore.com');

    await newOrder.save();

    // Log Activity
    const newLog = new ActivityLog({
      action: 'order',
      userEmail: orderEmail,
      userName: formData.fullName,
      details: `Placed order of Rs. ${finalTotal.toLocaleString()} (${items.length} items)`
    });
    await newLog.save();

    res.status(201).json(newOrder);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
