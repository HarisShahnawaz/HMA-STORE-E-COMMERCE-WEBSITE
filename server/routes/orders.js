const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const ActivityLog = require('../models/ActivityLog');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();

// ── CREATE NEW ORDER ──
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
      userEmail: formData.email || req.body.userEmail || (userId ? 'registered-user' : 'guest@hmastore.com'),
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

    const orderEmail = formData.email || (userId ? 'registered-user' : 'guest@hmastore.com');

    await newOrder.save();

    // Send Checkout Confirmation Email
    if (orderEmail && orderEmail !== 'registered-user' && orderEmail !== 'guest@hmastore.com') {
      const itemsHtml = items.map(item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name || item.title} (x${item.quantity})</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `).join('');

      sendEmail({
        to: orderEmail,
        subject: `HMA Store - Order Confirmation #${newOrder._id.toString().substring(18).toUpperCase()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #333; text-align: center;">Order Confirmed!</h2>
            <p>Thank you for shopping with us, ${formData.fullName}. Your order has been placed successfully and is being processed.</p>
            
            <h3 style="border-bottom: 2px solid #000; padding-bottom: 8px; margin-top: 30px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f9f9f9;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-top: 2px solid #eee;">Subtotal</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; border-top: 2px solid #eee;">Rs. ${cartTotal.toLocaleString()}</td>
                </tr>
                ${discountAmount ? `
                <tr>
                  <td style="padding: 10px; color: #d9534f;">Discount</td>
                  <td style="padding: 10px; text-align: right; color: #d9534f;">- Rs. ${discountAmount.toLocaleString()}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 10px; border-bottom: 2px solid #eee;">Shipping Fee</td>
                  <td style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Rs. ${finalShipping.toLocaleString()}</td>
                </tr>
                <tr style="font-size: 18px; font-weight: bold;">
                  <td style="padding: 10px;">Total Paid</td>
                  <td style="padding: 10px; text-align: right;">Rs. ${finalTotal.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <h3 style="border-bottom: 2px solid #000; padding-bottom: 8px; margin-top: 30px;">Shipping Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${formData.fullName}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${formData.phone}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${formData.street}, ${formData.city}, ${formData.province}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod}</p>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">We will notify you once your order is dispatched.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center;">HMA Store | Pakistan's Premium Fashion E-Commerce</p>
          </div>
        `
      }).catch(emailErr => {
        console.error('Failed to send order confirmation email:', emailErr.message);
      });
    }

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

// ── FETCH ORDER HISTORY ──
// @route   GET /api/orders/my-history
// @desc    Fetch order history for the logged-in customer (Sorted by newest first)
router.get('/my-history', async (req, res) => {
  try {
    // 1. Grab the token from authorization headers
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
    }

    const token = authHeader.split(' ')[1];
    
    // 2. Decode the token to identify who is looking at their history
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id || decoded._id;
    } catch (tokenErr) {
      return res.status(401).json({ error: 'Invalid or expired user session token.' });
    }

    // 3. Find matching customer profiles down in your database cluster
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);

  } catch (err) {
    console.error('History Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve shopping history profile records' });
  }
});

module.exports = router;