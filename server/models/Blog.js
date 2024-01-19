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

  thumbnail: {
    type: String,
    default: 'https://picsum.photos/200'
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

module.exports = mongoose.model('Blog', BlogsSchema, 'blogs');
