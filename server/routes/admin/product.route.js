const express = require("express");
const multer = require("multer");

const {
  getAll,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/product.controller");

const upload = multer({ dest: "public/uploads/products" });

const router = express.Router();

// @route   POST api/products
// @desc    Add Product
// @access  Private
router.post("/", upload.array("images"), getAll);

// @route   POST api/product/create
// @desc    Add Product
// @access  Private
router.post("/create", upload.array("images"), addProduct);

// @route   PATCH api/admin/products/:productId
// @desc    Update Product
// @access  Private
router.patch("/:productId", upload.array("imgs", 10), updateProduct);

// @route   DELETE api/admin/products/:productId
// @desc    Delete Product
// @access  Private
router.delete("/:productId", deleteProduct);

module.exports = router;
