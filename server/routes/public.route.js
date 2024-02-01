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

// @route   GET user/blog/:blogId
// @desc    Get One
// @access  Public
router.get("/blog/:blogId", blog.getDetail);

// @route   GET user/products
// @desc    Get All
// @access  Public
router.get("/products", product.getAll);

// @route   GET user/product/:productId
// @desc    Get One
// @access  Public
router.get("/product/:productId", product.getProduct);

module.exports = router;
