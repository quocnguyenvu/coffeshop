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
// @desc    Create Category
// @access  Private
router.post('/create',upload.single('thumbnail'), create);

module.exports = router;

