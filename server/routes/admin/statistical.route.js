const express = require('express');
const router = express.Router();

const { getAll } = require('../../controllers/statistical.controller');

// @route   GET api/admin/statistical
// @desc    Get All
// @access  Private
router.get('/', getAll);

module.exports = router;
