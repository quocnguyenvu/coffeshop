const Review = require('../models/Review');

const Response = require('../helpers/response.helper');
const remove_Id = require('../utils/remove_Id');
const constant = require('../constants/index');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');

const Product = require('../models/Product');
const Bill = require('../models/bill');
const BillDetail = require('../models/billDetail');

// Kiểm tra người dùng có từng đặt sản phẩm chưa
const productIsContainInBill = async (userId, productId) => {
  try {
    const bills = await Bill.find({ userId, status: 'Đã giao hàng' });
    for (const bill of bills) {
      const billDetail = await BillDetail.findOne({
        billId: bill._id,
        productId,
      });
      if (billDetail) return true;
    }

    return false;
  } catch (error) {
    return next(error);
  }
};

// Tìm kiếm bằng title, description, productName, userName
exports.getAll = async (req, res, next) => {
  let {
    query: { _page, _limit, q },
  } = req;

  try {
    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    let reviews = await Review.find()
      .sort({ dateCreate: -1 })
      .populate('userId')
      .populate('productId');
    let total = await Review.find().count();
    if (q) {
      reviews = reviews.filter((item, index) => {
        const currentIndex = item.title.toLowerCase().indexOf(q.toLowerCase());
        const currentIndex1 = item.description.toLowerCase().indexOf(q.toLowerCase());
        const currentIndex2 = item.userId.fullName.toLowerCase().indexOf(q.toLowerCase());
        const currentIndex3 = item.productId.name.toLowerCase().indexOf(q.toLowerCase());

        return currentIndex > -1 || currentIndex1 > -1 || currentIndex2 > -1 || currentIndex3 > -1;
      });

      total = reviews.length;
    }

    return Response.success(res, {
      reviews: remove_Id(reviews.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit)),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getByProduct = async (req, res, next) => {
  let {
    params: { productId },
    query: { _page, _limit },
  } = req;

  try {
    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    if (!productId) throw new Error(failMessage);
    const product = await Product.findById(productId);
    if (!product) throw new Error(failMessage);

    const total = await Review.find({ productId }).count();
    let reviews = [];
    reviews = await Review.find({ productId })
      .sort({ dateCreate: 1 })
      .populate('userId')
      .skip((_page - 1) * _limit)
      .limit(_limit);
    // if (reviews.length === 0 || !total) throw new Error(failMessage);

    return Response.success(res, { reviews: remove_Id(reviews), total });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  let {
    params: { productId },
    body: { rate, title, description, dateCreate },
    user,
  } = req;

  try {
    rate = parseInt(rate) || 5;

    if (!productId || !title || !description || !user || !dateCreate) throw new Error(failMessage);

    const product = await Product.findById(productId);
    if (!product) throw new Error(failMessage);

    if (!(await productIsContainInBill(user._id, product._id)))
      throw new Error('Bạn không có quyền review sản phẩm khi chưa mua sản phẩm');

    let review = await Review.create({
      rate,
      title,
      description,
      userId: user._id,
      productId,
      dateCreate: new Date(dateCreate),
    });

    // Cập nhật lại đánh giá cho sản phẩm
    let total = 0;
    const reviews = await Review.find({ productId });
    if (!reviews) throw new Error(failMessage);
    for (let review of reviews) total += review.rate;
    await Product.findByIdAndUpdate(productId, {
      rate: total / reviews.length,
    });

    review = await Review.findById(review._id).populate('userId');
    review._doc.id = review._id;

    return Response.success(res, { message: createSuccessMessage, review });
  } catch (error) {
    return next(error);
  }
};

// Chỉ có thể chính chủ update comment
exports.update = async (req, res, next) => {
  let {
    params: { reviewId },
    body: { rate, title, description },
    user,
  } = req;

  try {
    if (!reviewId || !user) throw new Error(failMessage);
    let review = await Review.findById(reviewId);
    if (!review) throw new Error(failMessage);
    if (review.userId.toString() !== user._id.toString()) throw new Error(failMessage);

    let obj = {};
    if (title) obj = { title };
    if (description) obj = { ...obj, description };
    if (rate) {
      rate = parseInt(rate);

      await Review.findByIdAndUpdate(reviewId, { ...obj, rate });

      // Cập nhật lại đánh giá cho sản phẩm
      let total = 0;
      const reviews = await Review.find({ productId: review.productId });
      if (!reviews) throw new Error(failMessage);
      for (let review of reviews) total += review.rate;
      await Product.findByIdAndUpdate(review.productId, {
        rate: total / reviews.length,
      });
    } else await Review.findByIdAndUpdate(reviewId, { ...obj });
    review = await Review.findById(reviewId).populate('productId');
    review._doc.id = review._id;

    return Response.success(res, { message: updateSuccessMessage, review });
  } catch (error) {
    return next(error);
  }
};

// Chỉ có thể chính chủ xóa comment - Hoặc Admin
exports.delete = async (req, res, next) => {
  const {
    params: { reviewId },
    user,
  } = req;

  try {
    if (!reviewId) throw new Error(failMessage);

    let review = await Review.findById(reviewId);
    if (!review) throw new Error(failMessage);
    // Chưa bỏ auth admin
    if (user && user.role === 'user' && review.userId.toString() !== user._id.toString())
      throw new Error(failMessage);

    await Review.findByIdAndDelete(reviewId);

    // Cập nhật lại đánh giá cho sản phẩm
    let total = 0;
    const reviews = await Review.find({ productId: review.productId });
    if (!reviews) throw new Error(failMessage);
    for (let review of reviews) total += review.rate;
    await Product.findByIdAndUpdate(review.productId, {
      rate: total / reviews.length,
    });

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
