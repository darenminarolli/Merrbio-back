const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'farmer', 'admin'], default: 'client' },
  location: { type: String },
  farmName: { type: String },
  adminKey: { type: String }
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
