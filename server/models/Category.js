const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema, "categories");
