const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },

  customerName: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },



  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: 'Đợi xác nhận',
    required: true
  },

  payment: {
    type: String,
    required: true,
    default: 'Trực tiếp',
  },

  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },

  dateCreate: {
    type: Date,
    default: Date.now()
  },

  dateUpdate: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Bill', BillSchema, 'bills');
