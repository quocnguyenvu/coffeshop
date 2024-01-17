const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'public/uploads/categories' });

// Controllers
const {
  getAll,
  getDetail,
  create,
  update,
  delete: currentDelete,
} = require('../../controllers/category.controller');

// @route   GET api/category
// @desc    Get All
// @access  Private
router.get('/', getAll);

// @route   GET api/category/:categoryId
// @desc    Get Detail
// @access  Private
router.get('/:categoryId', getDetail);

// @route   POST api/category/create
// @desc    Create Category
// @access  Private
router.post('/create', create);

// @route   POST api/category/:categoryId
// @desc    Update Category
// @access  Private
router.patch('/:categoryId', update);

// @route   POST api/category/:categoryId
// @desc    Delete Category
// @access  Private
router.delete('/:categoryId', currentDelete);

module.exports = router;
