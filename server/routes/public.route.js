const express = require("express");
const category = require("../controllers/category.controller");
const blog = require("../controllers/blog.controller");
const product = require("../controllers/product.controller");
const router = express.Router();

// @route   GET user/categories
// @desc    Get All
// @access  Public
router.get("/categories", category.getAll);

// @route   GET user/blogs
// @desc    Get All
// @access  Public
router.get("/blogs", blog.getAll);

// @route   GET user/products
// @desc    Get All
// @access  Public
router.get("/products", product.getAll);

module.exports = router;
