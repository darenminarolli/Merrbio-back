const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true, default: 1 },
  status: { type: String, enum: ['rejected','pending', 'accepted'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
