const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
    default: "cod",
  },
  shipMethod: {
    type: String,
    required: true,
    default: "save",
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

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
