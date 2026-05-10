const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  image: { type: String, required: true },
  category: { type: String, required: true },
  isNew: { type: Boolean, default: false },
  aiRecommended: { type: Boolean, default: false },
  isSale: { type: Boolean, default: false }
}, { timestamps: true, suppressReservedKeysWarning: true });

module.exports = mongoose.model('Product', productSchema);