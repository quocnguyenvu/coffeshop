const express = require("express");
const {
  getAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/product.controller");

const router = express.Router();

// @route   GET api/product
// @desc    Get All Products
// @access  Private
router.get("/", getAll);

// @route   GET api/product/:productId
// @desc    Get Detail Product
// @access  Private
router.get("/:productId", getProduct);

// @route   POST api/product/create
// @desc    Add Product
// @access  Private
router.post("/create", addProduct);

// @route   PUT api/product/:productId
// @desc    Update Product
// @access  Private
router.put("/:productId", updateProduct);

// @route   DELETE api/admin/products/:productId
// @desc    Delete Product
// @access  Private
router.delete("/:productId", deleteProduct);

module.exports = router;
