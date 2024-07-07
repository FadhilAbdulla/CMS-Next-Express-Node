const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  company: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
