const express = require('express');
const router = express.Router();

const { getAll, delete: currentDelete } = require('../../controllers/review.controller');

// @route   GET api/admin/review
// @desc    Get All Review
// @access  Private
router.get('/', getAll);

// @route   DELETE api/admin/review/:reviewId
// @desc    Delete Review
// @access  Private
router.delete('/:reviewId', currentDelete);

module.exports = router;
