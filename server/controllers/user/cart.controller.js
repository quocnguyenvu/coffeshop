const Cart = require('../../models/Cart');
const CartDetail = require('../../models/CartDetail');
const Product = require('../../models/Product');

const Response = require('../../helpers/response.helper');
const constant = require('../../constants/index');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../../constants');

// Bỏ API tạo giỏ hàng -> tích hợp vô trong lúc gọi sản phẩm của giỏ hàng luôn
exports.getAll = async (req, res, next) => {
  try {
    let {
      query: { _limit, _page },
      user,
    } = req;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    if (!user) throw new Error(failMessage);
    let cart = await Cart.findOne({ userId: user._id });
    let total = 0;
    let cartDetails = [];
    if (!cart) {
      cart = await Cart.create({ userId: user._id });
    } else {
      total = await CartDetail.find({ cartId: cart._id }).count();
      cartDetails = await CartDetail.find({ cartId: cart._id })
        .populate('productId')
        .skip((_page - 1) * _limit)
        .limit(_limit);
    }

    return Response.success(res, { cart, cartDetails, total });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      user,
      // body: { cartData },
    } = req;

    // let cart;

    // if (!cartData || !Array.isArray(cartData)) throw new Error(failMessage);

    // cart = await Cart.create({});
    // for (let cartItem of cartData) {
    //   const product = await Product.findById(cartItem.productId);
    //   if (!product) throw new Error(failMessage);
    //   if (!cartItem.quantity) throw new Error(failMessage);
    //   await CartDetail.create({
    //     quantity: parseInt(cartItem.quantity),
    //     cartId: cart._id,
    //     productId: product._id,
    //   });
    // }

    if (!user) throw new Error(failMessage);
    const cart = await Cart.create({ userId: user._id });
    cart._doc.id = cart._id;

    return Response.success(res, { message: createSuccessMessage, cart });
  } catch (error) {
    return next(error);
  }
};

// Update từng sản phẩm
exports.update = async (req, res, next) => {
  try {
    const {
      params: { cartId },
      body: { cartData },
    } = req;

    let cart;

    if (!cartId || !cartData || !Array.isArray(cartData)) throw new Error(failMessage);

    cart = await Cart.findById(cartId);
    if (!cart) throw new Error(failMessage);

    const cartDetails = await CartDetail.find({ cartId });
    for (let cartDetail of cartDetails) await CartDetail.findByIdAndDelete(cartDetail._id);

    for (let cartItem of cartData) {
      const product = await Product.findById(cartItem.productId);
      if (!product) throw new Error(failMessage);
      if (!cartItem.quantity) throw new Error(failMessage);
      await CartDetail.create({
        quantity: parseInt(cartItem.quantity),
        cartId: cart._id,
        productId: product._id,
      });
    }

    return Response.success(res, { message: updateSuccessMessage, cart });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { cartId },
    } = req;

    if (!cartId) throw new Error(failMessage);

    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error(failMessage);

    const cartDetails = await CartDetail.find({ cartId });

    for (let cartDetail of cartDetails) await CartDetail.findByIdAndDelete(cartDetail._id);
    await Cart.findByIdAndDelete(cartId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
