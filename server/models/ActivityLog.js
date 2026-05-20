const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // 'signup', 'login', 'order'
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  details: { type: String }
}, { timestamps: true, suppressReservedKeysWarning: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
