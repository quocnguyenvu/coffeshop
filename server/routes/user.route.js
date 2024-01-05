const express = require('express');

const router = express.Router();

const { protect } = require('../middlewares/user/auth');

const handleError = require('../helpers/handleError.helper');

// Controllers
const {
  changeNewsForProducts,
  changePriceForProducts,
  addTagToProducts,
  changeImageToProduct,
} = require('../controllers/user/addDb.controller');

// UnProtected
// router.get(
//   "/",
//   require("../controllers/user/addDb.controller").addTotalToProduct
// );

// Auth
router.use('/auth', require('./user/auth.route'));
router.use(handleError);

// Products
router.use('/products', require('./user/product.route'));
router.use(handleError);

// Categories
router.use('/Category', require('./user/category.route'));
router.use(handleError);

// Change newPrice to Price for Products
router.get('/changeNewsForProducts', changeNewsForProducts);
router.use(handleError);
// Tags
router.use('/tags', require('./user/tag.route'));
router.use(handleError);

// Change newPrice to Price for Products
router.get('/updatePrice', changeImageToProduct);

// Reviews
router.use('/review', require('./user/review.route'));
router.use(handleError);

// DiscountCodes
router.use('/discountCode', require('./user/discountCode.route'));
router.use(handleError);

// Protected
router.use(protect);

// Carts
router.use('/cart', require('./user/cart.route'));
router.use(handleError);

// Cart Details
router.use('/cartDetail', require('./user/cartDetail.route'));
router.use(handleError);

// Bills
router.use('/bill', require('./user/bill.route'));
router.use(handleError);

// DiscountCodeDetails
router.use('/discountCodeDetail', require('./user/discountCodeDetail.route'));
router.use(handleError);

module.exports = router;
