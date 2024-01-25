const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },

  customerName: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Đợi xác nhận",
    required: true,
  },

  payment: {
    type: String,
    required: true,
    default: "Trực tiếp",
  },

  note: {
    type: String,
  },

  dateCreate: {
    type: Date,
    default: Date.now(),
  },

  dateUpdate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema, "order");
