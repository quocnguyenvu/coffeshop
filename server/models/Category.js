const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  img: {
    type: String,
    default: 'https://picsum.photos/200',
  },

  description: {
    type: String,
  },
});

module.exports = mongoose.model('Category', CategorySchema, 'categories');
