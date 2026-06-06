const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true }
    }
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, required: true },
  total: { type: Number, required: true },

  // ── Stripe Payment Fields ──────────────────────
  paymentIntentId: { type: String, default: null },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paidAt: { type: Date, default: null },
  // ───────────────────────────────────────────────

}, { timestamps: true, suppressReservedKeysWarning: true });


module.exports = mongoose.model('Order', orderSchema);