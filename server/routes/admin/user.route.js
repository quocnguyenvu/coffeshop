const express = require('express');
const router = express.Router();

// Controllers
const {
  getAll,
  getDetail,
  updateStatus,
  delete: currentDelete,
} = require('../../controllers/user.controller');

// @route   GET api/admin/user?q=&_limit=&_page=
// @desc    Get All
// @access  Private
router.get('/', getAll);

// @route   GET api/admin/user/:userId
// @desc    Get Detail
// @access  Private
router.get('/:userId', getDetail);

// @route   PATCH api/admin/user/:userId
// @desc    Update Status
// @access  Private
router.patch('/:userId', updateStatus);

// @route   DELETE api/admin/user/:userId
// @desc    Delete
// @access  Private
router.delete('/:userId', currentDelete);

module.exports = router;
