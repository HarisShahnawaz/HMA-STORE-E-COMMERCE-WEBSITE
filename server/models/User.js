const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  savedTryOns: [{
    resultImage: { type: String, required: true },
    productId:   { type: String },
    productName: { type: String },
    productImage:{ type: String },
    category:    { type: String },
    savedAt:     { type: Date, default: Date.now }
  }]
}, { timestamps: true, suppressReservedKeysWarning: true });

module.exports = mongoose.model('User', userSchema);
