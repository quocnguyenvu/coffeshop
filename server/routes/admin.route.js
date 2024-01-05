const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/admin/auth');

const handleError = require('../helpers/handleError.helper');

// Review
router.use('/review', require('./admin/review.route'));
router.use(handleError);

// Category
router.use('/Category', require('./admin/category.route'));
router.use(handleError);

// Product
router.use('/products', require('./admin/product.route'));
router.use(handleError);

// Tags
router.use('/tags', require('./admin/tag.route'));
router.use(handleError);

// Bill
router.use('/bill', require('./admin/bill.route'));
router.use(handleError);

// Bill Detail
router.use('/billDetail', require('./admin/billDetail.route'));
router.use(handleError);

// DiscountCodes
router.use('/discountCode', require('./admin/discountCode.route'));
router.use(handleError);

// DiscountCodes
router.use('/statistical', require('./admin/statistical.route'));
router.use(handleError);

// Middlewares
router.use(protect);

// User
router.use('/user', require('./admin/user.route'));
router.use(handleError);

router.get('/', (req, res) => {
  res.send('Admin');
});

module.exports = router;
