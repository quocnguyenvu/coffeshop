const mongoose = require('mongoose');

const BillDetailSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

module.exports = mongoose.model('BillDetail', BillDetailSchema, 'billDetails');
