const moment = require('moment');
const DiscountCode = require('../models/DiscountCode');

const Response = require('../helpers/response.helper');
const remove_Id = require('../utils/remove_Id');
const uploadImage = require('../utils/uploadImage');
const constant = require('../constants/index');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');
const DiscountCodeDetail = require('../models/DiscountCodeDetail');
const existCodeMessage = 'Mã code đã tồn tại';

exports.getAll = async (req, res, next) => {
  try {
    let {
      query: { _limit, _page, q },
    } = req;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    let total = await DiscountCode.find().count();
    let discountCodes = await DiscountCode.find().sort({ dateCreate: 1 });

    if (q) {
      discountCodes = discountCodes.filter((item) => {
        const index = item.codeName.toLowerCase().indexOf(q.toLowerCase());
        const index1 = item.title.toLowerCase().indexOf(q.toLowerCase());
        const index2 = item.description.toLowerCase().indexOf(q.toLowerCase());
        return index > -1 || index1 > -1 || index2 > -1;
      });
      total = discountCodes.length;
    }

    discountCodes = discountCodes.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit);

    return Response.success(res, {
      discountCodes: remove_Id(discountCodes),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const {
      params: { discountCodeId },
    } = req;

    if (!discountCodeId) throw new Error(failMessage);
    const discountCode = await DiscountCode.findById(discountCodeId);
    if (!discountCode) throw new Error(failMessage);
    discountCode._doc.id = discountCode._id;

    return Response.success(res, { discountCode });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    let { codeName, title, description, total, sale, amount, dateExpire, dateCreate } = req.body;

    if (!codeName || !title || !description || !total || isNaN(total) || !dateExpire)
      throw new Error(failMessage);

    let discountCode = await DiscountCode.findOne({ codeName });
    if (discountCode) throw new Error(existCodeMessage);

    if (dateCreate) {
      dateCreate = new Date(dateCreate);
      if (dateCreate < Date.now())
        throw new Error('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại');
    } else dateCreate = new Date();

    dateExpire = new Date(dateExpire);
    if (dateExpire < dateCreate) throw new Error('Ngày hết hạn không được nhỏ hơn ngày kết thúc');

    let obj = {
      codeName,
      title,
      description,
      total: parseInt(total),
      dateExpire,
      dateCreate,
    };

    if (sale && !isNaN(sale)) obj = { ...obj, sale: parseInt(sale) };
    if (amount && !isNaN(amount)) obj = { ...obj, amount: parseFloat(amount) };

    discountCode = await DiscountCode.create({ ...obj });
    discountCode._doc.id = discountCode._id;

    return Response.success(res, {
      message: createSuccessMessage,
      discountCode,
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      params: { discountCodeId },
      body: { codeName, title, description, total, sale, amount },
    } = req;

    if (!discountCodeId) throw new Error(failMessage);
    let discountCode = await DiscountCode.findById(discountCodeId);
    if (!discountCode) throw new Error(failMessage);

    let obj = {};

    if (codeName) {
      const currentDiscountCode = await DiscountCode.findOne({ codeName });
      if (currentDiscountCode) throw new Error(existCodeMessage);
      obj = { ...obj, codeName };
    }

    if (title) obj = { ...obj, title };

    if (description) obj = { ...obj, description };

    // Total cập nhật phải lớn hơn số lượng mã giảm giá đã được lấy
    if (!isNaN(total)) {
      if (parseInt(total) < discountCode.takenTotal)
        throw new Error(
          'Số lượng mã giảm giá được cập nhật phải lớn hơn số lượng mã giảm giá đã được lấy'
        );
      obj = { ...obj, total: parseInt(total) };
    }

    if (!isNaN(sale)) obj = { ...obj, sale: parseInt(sale) };

    if (!isNaN(amount)) obj = { ...obj, amount: parseFloat(amount) };

    await DiscountCode.findByIdAndUpdate(discountCode._id, { ...obj });
    discountCode = await DiscountCode.findById(discountCode._id);
    discountCode._doc.id = discountCode._id;

    return Response.success(res, {
      message: updateSuccessMessage,
      discountCode,
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { discountCodeId },
    } = req;

    if (!discountCodeId) throw new Error(failMessage);
    const discountCode = await DiscountCode.findById(discountCodeId);
    if (!discountCode) throw new Error(failMessage);

    const discountCodeDetails = await DiscountCodeDetail.find({
      discountCodeId,
    });
    for (let discountCodeDetail of discountCodeDetails)
      await DiscountCodeDetail.findByIdAndDelete(discountCodeDetail._id);
    await DiscountCode.findByIdAndDelete(discountCodeId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
