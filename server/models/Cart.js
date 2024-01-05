const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  dateCreate: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Cart', CartSchema, 'carts');
