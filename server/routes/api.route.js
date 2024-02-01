const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth");

const { login } = require("../controllers/user/auth.controller");

// @route   POST api/login
// @desc    Đăng nhập
// @access  Public
router.post("/login", login);

// Middlewares
router.use(protect);

// Category
router.use("/category", require("./admin/category.route"));

// Blog
router.use("/blog", require("./admin/blog.route"));

// Product
router.use("/product", require("./admin/product.route"));

// Order
router.use("/order", require("./admin/order.route"));

// Bill Detail
router.use("/bill-detail", require("./admin/billDetail.route"));

module.exports = router;
