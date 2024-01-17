const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { login } = require('../controllers/user/auth.controller');

// @route   POST api/user/login
// @desc    Đăng nhập
// @access  Public
router.post('/login', login);

// Category
router.use('/category', require('./admin/category.route'));

// Product
router.use('/products', require('./admin/product.route'));

// Bill
router.use('/bill', require('./admin/bill.route'));

// Bill Detail
router.use('/bill-detail', require('./admin/billDetail.route'));

// Middlewares
router.use(protect);

router.get('/', (req, res) => {
   res.send('Admin');
});

module.exports = router;
