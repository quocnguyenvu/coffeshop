const Bill = require('../models/bill');
const User = require('../models/User');
const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const BillDetail = require('../models/billDetail');
const Product = require('../models/Product');
const DiscountCode = require('../models/DiscountCode');
const DiscountCodeDetail = require('../models/DiscountCodeDetail');

const Response = require('../helpers/response.helper');
const constant = require('../constants/index');
const remove_Id = require('../utils/remove_Id');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');

// Search bằng tên người đặt - mã sản phẩm
exports.getAll = async (req, res, next) => {
  try {
    let {
      query: { _limit, _page, q, status },
    } = req;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    let obj = {};

    if (status && status !== 'null') obj = { status };

    let total = await Bill.find(obj).count();
    let bills = await Bill.find(obj).populate('userId').sort({ dateCreate: -1 });
    // .skip((_page - 1) * _limit)
    // .limit(_limit);

    if (q) {
      // Filter by Username
      let bills1 = bills.filter((item) => {
        const index = item._doc.userId._doc.fullName.toLowerCase().indexOf(q.toLowerCase());
        return index > -1;
      });
      let bills2 = bills.filter((item) => {
        const index = item.id.toLowerCase().indexOf(q.toLowerCase());
        return index > -1;
      });

      let totalBills = bills1.concat(bills2);

      bills = totalBills.filter((item, index) => {
        for (let i = index + 1; i < totalBills.length; i++) {
          if (item._doc._id === totalBills[i]._doc._id) return false;
        }
        return true;
      });
      total = bills.length;
    }

    bills = bills.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit);

    // Get BillDetails foreach Bill
    for (let bill of bills) {
      const billDetails = await BillDetail.find({ billId: bill._id }).populate('productId');
      if (!billDetails) throw new Error(failMessage);
      bill._doc.billDetails = remove_Id(billDetails);
    }

    Response.success(res, { bills: remove_Id(bills), total });
  } catch (error) {
    return next(error);
  }
};

// Lấy danh sách hóa đơn của một người dùng cụ thể
exports.getAllByUser = async (req, res, next) => {
  try {
    let {
      params: { userId },
      query: { _limit, _page, status, q },
      user,
    } = req;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    if (!userId && user) userId = user._id;
    if (!userId) throw new Error(failMessage);
    if (!user) user = await User.findById(userId);
    if (!user) throw new Error(failMessage);

    let obj = { userId };

    if (status && status !== 'null') obj = { ...obj, status };

    let total = await Bill.find({ ...obj }).count();
    let bills = await Bill.find({ ...obj })
      .populate('userId')
      .sort({ dateCreate: -1 });
    // .skip((_page - 1) * _limit)
    // .limit(_limit);

    if (q) {
      bills = bills.filter((item) => {
        const index = item.id.toLowerCase().indexOf(q.toLowerCase());
        return index > -1;
      });
      total = bills.length;
    }

    if (!bills) throw new Error(failMessage);
    bills = bills.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit);

    // Get BillDetails foreach Bill
    for (let bill of bills) {
      const billDetails = await BillDetail.find({ billId: bill._id }).populate('productId');
      if (!billDetails) throw new Error(failMessage);
      bill._doc.billDetails = remove_Id(billDetails);
    }

    Response.success(res, {
      bills: remove_Id(bills),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    let {
      query: { _limit, _page },
      params: { billId },
    } = req;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    if (!billId) throw new Error(failMessage);

    const bill = await Bill.findById(billId).populate('userId');
    if (!bill) throw new Error(failMessage);
    bill._doc.id = bill._id;

    const total = await BillDetail.find({ billId: bill._id }).count();
    const billDetails = await BillDetail.find({ billId: bill._id })
      .populate('productId')
      .skip((_page - 1) * _limit)
      .limit(_limit);

    return Response.success(res, {
      bill,
      billDetails: remove_Id(billDetails),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

// Cập nhật lại code nếu thanh toán bằng thẻ ngân hàng...
// Áp thêm mã giảm giá
exports.create = async (req, res, next) => {
  try {
    const {
      // body: { name, address, phoneNumber, shipPayment, VAT, discountCodeId },
      body: { name, address, phoneNumber, total, codeName },
      user,
    } = req;

    if (
      !user ||
      // (!shipPayment && !isNaN(shipPayment)) ||
      !name ||
      !address ||
      !phoneNumber ||
      !total ||
      isNaN(total)
    )
      throw new Error(failMessage);

    // shipPayment = parseInt(shipPayment);
    // VAT = !VAT || isNaN(VAT) ? 10 : parseInt(VAT);

    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) throw new Error(failMessage);

    const cartDetails = await CartDetail.find({ cartId: cart._id });
    if (!cartDetails) throw new Error(failMessage);

    let bill = await Bill.create({
      userId: user._id,
      // payment,
      name,
      address,
      phoneNumber,
      total,
      dateCreate: new Date(),
      // total: parseFloat(currentTotal),
    });
    // let total = 0;
    for (let cartDetail of cartDetails) {
      const product = await Product.findById(cartDetail.productId);
      if (!product) throw new Error(failMessage);
      // total += product.price * cartDetail.quantity;

      await BillDetail.create({
        quantity: cartDetail.quantity,
        billId: bill._id,
        productId: product._id,
      });

      await CartDetail.findByIdAndDelete(cartDetail._id);
    }
    await Cart.findByIdAndDelete(cart._id);

    if (codeName) {
      const discountCode = await DiscountCode.findOne({ codeName });
      if (!discountCode) throw new Error(failMessage);

      const discountCodeDetail = await DiscountCodeDetail.findOne({
        discountCodeId: discountCode._id,
        userId: user._id,
      });
      if (discountCodeDetail) {
        if (discountCodeDetail > 1)
          await DiscountCodeDetail.findByIdAndUpdate(discountCodeDetail._id, {
            $inc: { total: -1 },
          });
        else await DiscountCodeDetail.findByIdAndDelete(discountCodeDetail._id);
      } else {
        if (
          discountCode.total <= 0 ||
          !(discountCode.dateCreate <= Date.now() <= discountCode.dateExpire)
        )
          throw new Error('Xin lôi bạn không thê áp mã giảm giá này');
      }
    }

    // total += total * VAT * 0.01;
    // bill = await Bill.findByIdAndUpdate(bill._id, {
    //   total: total + shipPayment,
    // });
    // bill = await Bill.findByIdAndUpdate(bill._id, {
    //   total: parseInt(total),
    // });
    bill = await Bill.findById(bill._id);
    bill._doc.id = bill._id;

    return Response.success(res, { message: createSuccessMessage, bill });
  } catch (error) {
    return next(error);
  }
};

exports.updateBillDetail = async (req, res, next) => {
  try {
    const {
      params: { billId },
      body: { billDetails },
    } = req;

    if (!billId || !billDetails) throw new Error(failMessage);

    let bill = await Bill.findById(billId);
    if (!bill) throw new Error(failMessage);

    if (bill.status !== 'Đợi xác nhận')
      throw new Error('Chỉ có đơn hàng đang xác nhận mới có thể cập nhật lại');

    const oldBillDetails = await BillDetail.find({ billId: bill._id });
    for (let billDetail of oldBillDetails) await BillDetail.findByIdAndDelete(billDetail._id);

    let total = 0;
    for (let billDetail of billDetails) {
      const product = await Product.findById(billDetail.productId);
      if (!product) throw new Error(failMessage);
      total += product.price * billDetail.quantity;

      await BillDetail.create({
        quantity: billDetail.quantity,
        billId: bill._id,
        productId: product._id,
      });
    }
    bill = await Bill.findByIdAndUpdate(bill._id, {
      total,
      dateModified: Date.now(),
    });
    bill._doc.id = bill._id;

    return Response.success(res, { message: updateSuccessMessage, bill });
  } catch (error) {
    return next(error);
  }
};

// User chỉ có quyền hủy đơn hàng, Amin có quyền cập nhật các trạng thái khác
// - Admin có thể hủy đơn hàng -> người dùng hủy đơn hàng chính chủ
// Đợi xác nhận, Đã xác nhận, Đang vận chuyển, Đã giao hàng, Đã hủy
exports.updateStatus = async (req, res, next) => {
  try {
    const {
      params: { billId },
      body: { status, isCompleted },
      user,
    } = req;

    if (!billId) throw new Error(failMessage);

    let bill = await Bill.findById(billId);
    if (!bill) throw new Error(failMessage);

    if (user && user.role === 'user' && status !== 'Đã hủy')
      throw new Error('Người dùng chỉ có quyền hủy đơn hàng');

    if (bill.status === 'Đợi xác nhận' && !(status === 'Đã xác nhận' || status === 'Đã hủy'))
      throw new Error('Bạn chỉ có thể cập nhật trạng thái "Đã xác nhận" hoặc "Đã hủy"');

    if (bill.status === 'Đã xác nhận' && !(status === 'Đang vận chuyển' || status === 'Đã hủy'))
      throw new Error('Bạn chỉ có thể cập nhật trạng thái "Đang vận chuyển" hoặc "Đã hủy"');

    if (bill.status === 'Đang vận chuyển' && status !== 'Đã giao hàng')
      throw new Error('Bạn chỉ có thể cập nhật trạng thái "Đã giao hàng"');

    if (bill.status === 'Đã hủy' || bill.status === 'Đã giao hàng')
      throw new Error(
        'Đơn hàng đã hủy hoặc đã được giao thành công, bạn không thể cập nhật trạng thái cho nó'
      );

    if (isCompleted === 'true' || isCompleted === 'false') {
      if (bill.payment === 'Trực tiếp') {
        if (bill.status !== 'Đã giao hàng')
          throw new Error(
            'Bạn chỉ có thể thay đổi trạng thái khi đơn hàng đã được giao với hình thức thanh toán trực tiếp'
          );
        else {
          if (status === 'Đã hủy') await cancelBillDetails(bill._id);

          await Bill.findByIdAndUpdate(bill._id, {
            status,
            isCompleted: isCompleted === 'true',
            dateModified: Date.now(),
          });
        }
      }

      // Cho các hình thức thanh toán khác
      // if() {

      // }
    } else {
      if (status === 'Đã hủy') await cancelBillDetails(bill._id);

      await Bill.findByIdAndUpdate(bill._id, {
        status,
        dateModified: Date.now(),
      });
    }
    bill = await Bill.findById(billId);
    bill._doc.id = bill._id;

    return Response.success(res, { message: updateSuccessMessage, bill });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { billId },
    } = req;

    if (!billId) throw new Error(failMessage);

    const bill = await Bill.findById(billId);
    if (!bill || !bill.status) throw new Error(failMessage);

    if (!(bill.status === 'Đã hủy' || bill.status === 'Đã giao hàng'))
      throw new Error('Bạn không được phép xóa đơn hàng');

    const billDetails = await BillDetail.find({ billId: bill._id });
    for (let billDetail of billDetails) await BillDetail.findByIdAndDelete(billDetail._id);
    await Bill.findByIdAndDelete(bill._id);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};

const cancelBillDetails = async (billId) => {
  try {
    const billDetails = await BillDetail.find({ billId });
    for (let billDetail of billDetails)
      await Product.findByIdAndUpdate(billDetail.productId, {
        $inc: { total: billDetail.quantity },
      });
  } catch (error) {
    return console.log(error);
  }
};
