const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  platenumber: { type: String, unique: true, required: true },
  brand: { type: String, required: true },
  state: { type: String, required: true },
});

const Car = mongoose.model('car', carSchema);

module.exports = Car;
