const express = require('express');
const router = express.Router();

const {
  getAll,
  getDetail,
  create,
  update,
  delete: currentDelete,
} = require('../../controllers/discountCode.controller');

// @route   GET api/admin/discountCode?_limit=&_page=&q=
// @desc    Get All DiscountCode
// @access  Private
router.get('/', getAll);

// @route   GET api/admin/discountCode/:discountCodeId
// @desc    Get Detail DiscountCode
// @access  Private
router.get('/:discountCodeId', getDetail);

// @route   POST api/admin/discountCode
// @desc    Create DiscountCode
// @access  Private
router.post('/', create);

// @route   PATCH api/admin/discountCode/:discountCodeId
// @desc    Update DiscountCode
// @access  Private
router.patch('/:discountCodeId', update);

// @route   DELETE api/admin/discountCode/:discountCodeId
// @desc    Delete DiscountCode
// @access  Private
router.delete('/:discountCodeId', currentDelete);

module.exports = router;
