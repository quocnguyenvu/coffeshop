const express = require("express");
const router = express.Router();

const {
  update,
  delete: currentDelete,
} = require("../../controllers/billDetail.controller");

// @route   PATCH api/admin/billDetail/:billDetailId
// @desc    Update BillDetail
// @access  Private
router.patch("/:billDetailId", update);

// @route   DELETE api/admin/billDetail/:billDetailId
// @desc    Delete BillDetail
// @access  Private
router.delete("/:billDetailId", currentDelete);

module.exports = router;
