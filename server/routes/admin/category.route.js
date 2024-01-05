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

// @route   GET api/admin/Category
// @desc    Get All
// @access  Private
router.get('/', getAll);

// @route   GET api/admin/Category/:categoryId
// @desc    Get Detail
// @access  Private
router.get('/:categoryId', getDetail);

// @route   POST api/admin/Category/create
// @desc    Create Category
// @access  Private
router.post('/', upload.single('img'), create);

// @route   POST api/admin/Category/update/:categoryId
// @desc    Update Category
// @access  Private
router.patch('/:categoryId', upload.single('img'), update);

// @route   POST api/admin/Category/:categoryId
// @desc    Delete Category
// @access  Private
router.delete('/:categoryId', currentDelete);

module.exports = router;
