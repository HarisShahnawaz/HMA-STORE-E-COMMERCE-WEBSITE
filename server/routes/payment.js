// server/routes/payment.js

const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeClient');
const Order = require('../models/Order');

// ─────────────────────────────────────────
// POST /api/payment/create-payment-intent
// ─────────────────────────────────────────
router.post('/create-payment-intent', express.json(), async (req, res) => {
  console.log('💳 Body received:', req.body);
  try {
    const { amount, currency = 'aud', orderId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        orderId: orderId?.toString() || '',
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

// ─────────────────────────────────────────
// POST /api/payment/webhook
// ─────────────────────────────────────────
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'paid',
          paymentIntentId: paymentIntent.id,
          paidAt: new Date(),
        });
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'failed',
        });
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;