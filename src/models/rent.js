const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
  rentnumber: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  platenumber: { type: String, required: true },
  rentdate: { type: Date, required: true },
});

module.exports = mongoose.model('rent', rentSchema);
