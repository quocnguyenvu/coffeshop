const constant = require("../constants/index");
const remove_Id = require("../utils/remove_Id");

const Category = require("../models/Category");
const Product = require("../models/Product");

const Response = require("../helpers/response.helper");
const uploadImage = require("../utils/uploadImage");

const {
  response: {
    createSuccessMessage,
    updateSuccessMessage,
    deleteSuccessMessage,
    failMessage,
  },
} = require("../constants");

exports.getAll = async (req, res, next) => {
  try {
    let products = await Product.find().populate("categoryId");
    if (!products) throw new Error(failMessage);
    const count = await Product.find().count();

    return Response.success(res, {
      products: remove_Id(products),
      total: count,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findById(productId).populate("categoryId");
    console.log("🚀 ~ product:", product)
    if (!product) throw new Error(failMessage);

    return Response.success(res, { product });
  } catch (error) {
    return next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const {
      files,
      body: { code, name, price, description, categoryId },
    } = req;

    let product;

    if (!code || !name || !price || !description)
      throw new Error(failMessage);

    let category = null;
    if (categoryId && categoryId !== "null") {
      category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Invalid categoryId");
      }
    }

    let obj = {
      code,
      name,
      price: parseInt(price),
      description,
      categoryId: category ? category._id : null,
    };

    if (files) {
      let resultUrls = [];
      for (let file of files) {
        const result = await uploadImage(file);
        resultUrls.push(result.url);
      }
      product = await Product.create({
        ...obj,
        images: resultUrls,
      });
    } else {
      product = await Product.create({
        ...obj,
      });
    }

    product = await Product.findById(product._id).populate("categoryId");
    if (product._doc.categoryId) {
      product._doc.categoryId._doc.id = product._doc.categoryId._id;
    }

    return Response.success(res, { message: createSuccessMessage, product });
  } catch (error) {
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
      files,
      body: { code, name, price, description, categoryId },
    } = req;

    if (!code || !name || !price || !description)
      throw new Error(failMessage);

    let category = null;
    if (categoryId && categoryId !== "null") {
      category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Invalid categoryId");
      }
    }

    let obj = {
      code,
      name,
      price: parseInt(price),
      description,
      categoryId: category ? category._id : null,
    };

    let product = await Product.findById(productId);
    if (!product) throw new Error(failMessage);

    if (files) {
      let resultUrls = [];
      for (let file of files) {
        const result = await uploadImage(file);
        resultUrls.push(result.url);
      }
      obj.images = resultUrls;
    }

    await Product.findByIdAndUpdate(productId, obj);

    product = await Product.findById(productId).populate("categoryId");
    if (product._doc.categoryId) {
      product._doc.categoryId._doc.id = product._doc.categoryId._id;
    }

    return Response.success(res, { message: updateSuccessMessage, product });
  } catch (error) {
    return next(error);
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findById(productId);
    if (!product) throw new Error(failMessage);
    await Product.findByIdAndDelete(productId);
    return Response.success(res, { message: "Xóa thành công" });
  } catch (error) {
    return next(error);
  }
};
