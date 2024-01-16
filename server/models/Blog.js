const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },

  title: {
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

  content: {
    type: String
  },

  dateCreate: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Blogs', BlogsSchema, 'blogs');
