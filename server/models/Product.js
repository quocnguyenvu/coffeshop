const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  images: {
    type: Array,
    default: ['https://picsum.photos/200']
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  rate: {
    type: Number,
    required: true,
    default: 5
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  dateCreate: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Product', ProductSchema, 'products');
