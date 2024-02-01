const express = require("express");
const router = express.Router();
const { getAll, changeStatus } = require("../../controllers/order.controller");

// @route   GET api/order
// @desc    GET All Order
// @access  Private
router.get("/", getAll);

// @route   PUT api/order/:orderId/change-status
// @desc    Change status order
// @access  Private
router.put("/:orderId/change-status", changeStatus);

module.exports = router;
