const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // 'new', 'hot', empty
  status: {
    type: Object,
    default: {
      new: true,
      hot: false,
    },
  },
  // Percent 0 - 100
  sale: {
    type: Number,
    default: 0,
  },
  des: {
    type: String,
  },
  shortDes: {
    type: String,
  },
  imgs: {
    type: Array,
    default: ['https://picsum.photos/200'],
  },
  price: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    default: 5,
  },
  // Tổng sản phẩm trong kho
  total: {
    type: Number,
    required: 0,
    default: 0,
  },
  // Đơn vị tính
  unit: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: true,
  },
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    // required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', ProductSchema, 'products');
