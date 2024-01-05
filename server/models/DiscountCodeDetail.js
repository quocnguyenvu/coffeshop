const mongoose = require('mongoose');

const DiscountCodeDetail = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    default: 1,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  discountCodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscountCode',
    required: true,
  },
  dateCreate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('DiscountCodeDetail', DiscountCodeDetail, 'discountCodeDetails');
