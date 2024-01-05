const mongoose = require('mongoose');

const DiscountCodeSchema = new mongoose.Schema({
  codeName: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  // Số lượng mã giảm giá đã lấy
  takenTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  // Tính theo phần trăm
  sale: {
    type: Number,
    required: true,
    default: 0,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  dateCreate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dateExpire: {
    type: Date,
  },
});

module.exports = mongoose.model('DiscountCode', DiscountCodeSchema, 'discountCodes');
