const Category = require('../models/Category');

const Response = require('../helpers/response.helper');
const remove_Id = require('../utils/remove_Id');
const uploadImage = require('../utils/uploadImage');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');
const Product = require('../models/Product');

exports.getAll = async (req, res, next) => {
  try {
    let categories = await Category.find();
    if (!categories) throw new Error(failMessage);
    const count = await Category.find().count();

    for (let category of categories) {
      const total = await Product.find({ categoryId: category._id }).count();
      category._doc.totalProducts = total;
    }

    return Response.success(res, {
      categories: remove_Id(categories),
      total: count,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const {
      params: { categoryId },
    } = req;

    if (!categoryId) throw new Error(failMessage);
    const category = await Category.findById(categoryId);
    if (!category) throw new Error(failMessage);
    // Add ID
    category._doc.id = category._id;
    return Response.success(res, { category });
  } catch (error) {
    return next(error);
  }
};

// Need Test API
exports.create = async (req, res, next) => {
  try {
    const {
      file,
      body: { name, description },
    } = req;
    let category;

    if (!name || !description) throw new Error(failMessage);

    if (file) {
      const result = await uploadImage(file);

      category = await Category.create({
        name,
        description,
        img: result.url,
      });
    } else {
      category = await Category.create({
        name,
        description,
      });
    }

    // Add ID
    category._doc.id = category._id;

    return Response.success(res, { message: createSuccessMessage, category });
  } catch (error) {
    return next(error);
  }
};

// Need Test API
exports.update = async (req, res, next) => {
  try {
    const {
      file,
      params: { categoryId },
      body: { name, description },
    } = req;

    let category;

    if (!categoryId || !name || !description) throw new Error(failMessage);

    if (file) {
      const result = await uploadImage(file);

      category = await Category.findByIdAndUpdate(categoryId, {
        name,
        description,
        img: result.url,
      });
    } else
      category = await Category.findByIdAndUpdate(categoryId, {
        name,
        description,
      });

    // Add ID
    category._doc.id = category._id;

    return Response.success(res, { message: updateSuccessMessage, category });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { categoryId },
    } = req;

    if (!categoryId) throw new Error(failMessage);

    const category = await Category.findById(categoryId);

    if (!category) throw new Error(failMessage);

    await Category.findByIdAndDelete(categoryId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
