const Category = require("../models/Category");
const Product = require("../models/Product");
const Response = require("../helpers/response.helper");
const remove_Id = require("../utils/remove_Id");

exports.getAll = async (req, res, next) => {
  try {
    let categories = await Category.find();
    if (!categories) throw new Error("Get all categories failed!");
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

    if (!categoryId) throw new Error("No category ID");
    const category = await Category.findById(categoryId);
    if (!category) throw new Error("Get category failed!");

    category._doc.id = category._id;
    return Response.success(res, { category });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      body: { code, name, description },
    } = req;
    let category;

    if (!code || !name || !description) {
      throw new Error("Invalid category data");
    }

    category = await Category.create({
      code,
      name,
      description,
    });

    category._doc.id = category._id;

    return Response.success(res, {
      message: "Created category sucssesfully!",
      category,
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      params: { categoryId },
      body: { code, name, description },
    } = req;
    let category;

    if (!categoryId || !code || !name || !description)
      throw new Error("Invalid category data");

    category = await Category.findByIdAndUpdate(categoryId, {
      code,
      name,
      description,
    });

    category._doc.id = category._id;

    return Response.success(res, {
      message: "Updated category sucssesfully!",
      category,
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      params: { categoryId },
    } = req;

    if (!categoryId) throw new Error("No category ID");

    const category = await Category.findById(categoryId);
    if (!category) throw new Error("Get category failed!");

    await Category.findByIdAndDelete(categoryId);

    return Response.success(res, { message: "Deleted category sucssesfully!" });
  } catch (error) {
    return next(error);
  }
};
