const Tag = require('../models/Tag');

const Response = require('../helpers/response.helper');
const constant = require('../constants/index');
const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');
const remove_Id = require('../utils/remove_Id');

exports.getAll = async (req, res, next) => {
  try {
    let {
      query: { _limit, _page },
    } = req;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    const total = await Tag.find().count();

    const tags = await Tag.find()
      .skip((_page - 1) * _limit)
      .limit(_limit);
    if (!tags) throw new Error(failMessage);

    Response.success(res, { tags: remove_Id(tags), total });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const {
      params: { tagId },
    } = req;

    if (!tagId) throw new Error(failMessage);
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error(failMessage);
    tag._doc.id = tag._id;

    return Response.success(res, { tag });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      body: { name },
    } = req;

    if (!name) throw new Error(failMessage);
    let tag = await Tag.findOne({ name });
    if (tag) throw new Error('Tên đã tồn tại');
    tag = await Tag.create({ name });
    tag._doc.id = tag._id;

    return Response.success(res, { message: createSuccessMessage, tag });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      params: { tagId },
      body: { name },
    } = req;

    if (!name || !tagId) throw new Error(failMessage);
    let tag = await Tag.findOne({ name });
    if (tag) throw new Error('Tên đã tồn tại');
    tag = undefined;

    tag = await Tag.findById(tagId);
    if (!tag) throw new Error(failMessage);
    await Tag.findByIdAndUpdate(tagId, { name });

    tag = await Tag.findById(tagId);
    tag._doc.id = tag._id;

    return Response.success(res, { message: updateSuccessMessage, tag });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { tagId },
    } = req;

    if (!tagId) throw new Error(failMessage);
    tag = await Tag.findById(tagId);
    if (!tag) throw new Error(failMessage);
    await Tag.findByIdAndDelete(tagId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
