const express = require('express');
const router = express.Router();

// Controllers
const {
  getAll,
  getAllByUser,
  getDetail,
  updateBillDetail,
  updateStatus,
  delete: currentDelete,
} = require('../../controllers/bill.controller');

// @route   GET api/admin/bill?_limit=&_page=
// @desc    GET All Bill
// @access  Private
router.get('/', getAll);

// @route   GET api/admin/bill/getByUser/:userId?_limit=&_page=
// @desc    GET Bill By User
// @access  Private
router.get('/getByUser/:userId', getAllByUser);

// @route   GET api/admin/bill/:billId?_limit=&_page=
// @desc    GET Bill Detail
// @access  Private
router.get('/:billId', getDetail);

// // @route   PATCH api/admin/bill/:billId
// // @desc    Update Bill
// // @access  Private
// router.patch("/:billId", updateBillDetail);

// @route   PATCH api/admin/bill/updateStatus/:billId
// @desc    Update Bill Status
// @access  Private
router.patch('/updateStatus/:billId', updateStatus);

// @route   DELETE api/admin/bill/:billId
// @desc    Update Bill
// @access  Private
router.delete('/:billId', currentDelete);

module.exports = router;
