const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const handleError = require('../helpers/handleError.helper');

// Category
router.use('/Category', require('./admin/category.route'));
router.use(handleError);

// Product
router.use('/products', require('./admin/product.route'));
router.use(handleError);

// Bill
router.use('/bill', require('./admin/bill.route'));
router.use(handleError);

// Bill Detail
router.use('/billDetail', require('./admin/billDetail.route'));
router.use(handleError);

// Middlewares
router.use(protect);

// User
router.use('/user', require('./admin/user.route'));
router.use(handleError);

// Auth
router.use('/auth', require('./user/auth.route'));
router.use(handleError);

router.get('/', (req, res) => {
  res.send('Admin');
});

module.exports = router;
