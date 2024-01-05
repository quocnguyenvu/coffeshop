const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  dateCreate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dateModified: {
    type: Date,
  },
  // Đợi xác nhận, Đã xác nhận, Đang vận chuyển, Đã giao hàng, Đã hủy
  status: {
    type: String,
    default: 'Đợi xác nhận',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Hình thức thanh toán: Trực tiếp, Thanh toán bằng thẻ ngân hàng,...
  payment: {
    type: String,
    required: true,
    default: 'Trực tiếp',
  },
  // Hóa đơn đã thanh toán hay chưa
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  // Thông tin người nhận
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Bill', BillSchema, 'bills');
