const express = require('express');
const router = express.Router();

// Controllers
const {
  getAll,
  getDetail,
  create,
  update,
  delete: currentDelete,
} = require('../../controllers/tag.controller');

// @route   GET api/admin/tags
// @desc    Get All
// @access  Public
router.get('/', getAll);

// @route   GET api/user/tags/:tagId
// @desc    Get Detail
// @access  Public
router.get('/:tagId', getDetail);

// @route   POST api/admin/tags
// @desc    Create Tag
// @access  Public
router.post('/', create);

// @route   PATCH api/admin/tags/:tagId
// @desc    Update Tag
// @access  Public
router.patch('/:tagId', update);

// @route   DELETE api/admin/tags/:tagId
// @desc    DELETE Tag
// @access  Public
router.delete('/:tagId', currentDelete);

module.exports = router;
