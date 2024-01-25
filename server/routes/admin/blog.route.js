const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'public/uploads/blogs' });

// Controllers
const {
  getAll,
  getDetail,
  create,
  update,
  delete: currentDelete,
} = require('../../controllers/blog.controller');

// @route   POST api/blog/create
// @desc    Create Blog
// @access  Private
router.post('/create', create);

// @route   GET api/blog
// @desc    Get All Blogs
// @access  Private
router.get('/', getAll);

// @route   GET api/blog/:blogId
// @desc    Get Detail
// @access  Private
router.get('/:blogId', getDetail);

// @route   PUT api/blog/:blogId
// @desc    Update Blog
// @access  Private
router.put('/:blogId', update);

// @route   DELETE api/blog/:blogId
// @desc    Delete Blog
// @access  Private
router.delete('/:blogId', currentDelete);


module.exports = router;

