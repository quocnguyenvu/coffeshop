const CartDetail = require('../../models/CartDetail');
const Product = require('../../models/Product');

const Response = require('../../helpers/response.helper');
const constant = require('../../constants/index');
const remove_Id = require('../../utils/remove_Id');
const { _limitProduct } = require('../../constants');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../../constants');
const Cart = require('../../models/Cart');

// Thêm được tối đa 30 SP -> check nếu số lượng sản phẩm còn lại đủ để thêm vô
exports.create = async (req, res, next) => {
  let {
    body: { quantity, productId },
    user,
  } = req;
  try {
    if (!user || !quantity || isNaN(quantity) || !productId) throw new Error(failMessage);
    quantity = parseInt(quantity);

    const product = await Product.findById(productId);
    if (!product) throw new Error(failMessage);

    let warningMessage;
    if (quantity > _limitProduct) {
      warningMessage = 'Bạn chỉ thêm được tối đa 30 sản phẩm';
      quantity = _limitProduct;
    }
    if (quantity > product.total) throw new Error('Số sản phẩm còn lại trong kho không đủ.');

    let cart = await Cart.findOne({ userId: user._id });
    let cartDetail;

    if (!cart) {
      cart = await Cart.create({ userId: user._id });

      cartDetail = await CartDetail.create({
        quantity,
        productId,
        cartId: cart._id,
      });
    } else {
      cartDetail = await CartDetail.findOne({
        cartId: cart._id,
        productId: product._id,
      });

      if (!cartDetail) {
        cartDetail = await CartDetail.create({
          quantity,
          productId,
          cartId: cart._id,
        });
      } else {
        let total = cartDetail.quantity + quantity;
        if (cartDetail.quantity + quantity > 30) {
          warningMessage =
            'Số sản phẩm hiện tại bạn đang có và số sản phẩm thêm vào của bạn hiện vượt quá 30 SP cho phép';
          total = _limitProduct;
        }

        // Trả lại số sản phẩm cũ cho product
        await Product.findByIdAndUpdate(product._id, {
          $inc: { total: cartDetail.quantity },
        });

        cartDetail = await CartDetail.findByIdAndUpdate(cartDetail._id, {
          quantity: total,
        });
        quantity = total;
      }
    }
    // cartDetail = await CartDetail.findById(cartDetail._id).populate(
    //   "productId"
    // );
    // cartDetail._doc.id = cartDetail._id;
    await Product.findByIdAndUpdate(product._id, {
      $inc: { total: -quantity },
    });
    const cartDetails = await CartDetail.find({ cartId: cart._id }).populate('productId');
    if (!cartDetails) throw new Error(failMessage);

    let resObj = {
      message: createSuccessMessage,
      cartDetails: remove_Id(cartDetails),
    };
    if (warningMessage) resObj = { ...resObj, warningMessage };

    return Response.success(res, resObj);
  } catch (error) {
    return next(error);
  }
};

// Hiện đang có thể cập nhật lại cả Sản phẩm cho 1 CartDetail -> có thể có hoặc ko ProductId
exports.update = async (req, res, next) => {
  try {
    let {
      params: { cartDetailId },
      body: { quantity, productId },
    } = req;

    if (!cartDetailId || !quantity || isNaN(quantity)) throw new Error(failMessage);
    quantity = parseInt(quantity);

    let warningMessage;
    if (quantity > _limitProduct) {
      warningMessage = 'Bạn chỉ thêm được tối đa 30 sản phẩm';
      quantity = _limitProduct;
    }

    let cartDetail = await CartDetail.findById(cartDetailId).populate('productId');
    if (!cartDetail) throw new Error(failMessage);

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) throw new Error(failMessage);
      if (quantity > product.total) throw new Error('Số sản phẩm còn lại trong kho không đủ.');

      // Trả lại số lượng cho sản phẩm cũ
      await Product.findByIdAndUpdate(cartDetail.productId, {
        $inc: { total: cartDetail.quantity },
      });

      await CartDetail.findByIdAndUpdate(cartDetailId, {
        quantity,
        productId,
      });

      // Trừ vào sản phẩm mới
      await Product.findByIdAndUpdate(product._id, {
        $inc: { total: -quantity },
      });
    } else {
      if (quantity > cartDetail.productId.total)
        throw new Error('Số sản phẩm còn lại trong kho không đủ.');

      await Product.findByIdAndUpdate(cartDetail.productId, {
        $inc: { total: CartDetail.quantity - quantity },
      });

      await CartDetail.findByIdAndUpdate(cartDetailId, {
        quantity,
      });
    }

    cartDetail = await CartDetail.findById(cartDetailId).populate('productId');
    cartDetail._doc.id = cartDetail._id;

    let resObj = {
      message: updateSuccessMessage,
      cartDetail,
    };
    if (warningMessage) resObj = { ...resObj, warningMessage };

    return Response.success(res, resObj);
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { cartDetailId },
    } = req;

    if (!cartDetailId) throw new Error(failMessage);
    let cartDetail = await CartDetail.findById(cartDetailId);
    if (!cartDetail) throw new Error(failMessage);

    // Trả lại số lượng cho sản phẩm
    await Product.findByIdAndUpdate(cartDetail.productId, {
      $inc: { total: cartDetail.quantity },
    });
    await CartDetail.findByIdAndDelete(cartDetailId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
