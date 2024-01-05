const BillDetail = require('../models/billDetail');

const Response = require('../helpers/response.helper');
const constant = require('../constants/index');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');
const Bill = require('../models/bill');
const Product = require('../models/Product');

exports.update = async (req, res, next) => {
  try {
    const {
      params: { billDetailId },
      body: { quantity, productId },
    } = req;

    if (!billDetailId || !quantity || !productId) throw new Error(failMessage);

    let billDetail = await BillDetail.findById(billDetailId);
    if (!billDetail) throw new Error(failMessage);

    const bill = await Bill.findById(billDetail.billId);
    if (!bill) throw new Error(failMessage);
    if (bill.status !== 'Đợi xác nhận')
      throw new Error('Bạn chỉ có thể thay đổi hóa đơn khi đơn hàng đang đợi xác nhận');

    const product = await Product.findById(productId);
    if (!product) throw new Error(failMessage);

    billDetail = await BillDetail.findByIdAndUpdate(billDetailId, {
      quantity: parseInt(quantity),
      productId,
    });
    billDetail = await BillDetail.findById(billDetail._id).populate('productId');
    billDetail._doc.id = billDetail._id;

    return Response.success(res, { message: updateSuccessMessage, billDetail });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { billDetailId },
    } = req;

    if (!billDetailId) throw new Error(failMessage);

    const billDetail = await BillDetail.findById(billDetailId);
    if (!billDetail) throw new Error(failMessage);

    await BillDetail.findByIdAndDelete(billDetailId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
