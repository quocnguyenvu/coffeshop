const remove_Id = require("../utils/remove_Id");
const Response = require("../helpers/response.helper");
const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getAll = async (req, res, next) => {
  try {
    let query = {};
    const {
      name,
      category,
      minPrice,
      maxPrice,
      sortMethod,
      sortOrder,
      limit,
      ids,
    } = req.query;

    if (ids) {
      query._id = { $in: ids };
    }

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (category) {
      query.categoryId = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) {
        query.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        query.price.$lte = maxPrice;
      }
    }

    let sortCriteria = {};
    if (sortMethod === "name") {
      sortCriteria = { name: sortOrder === "desc" ? -1 : 1 };
    } else if (sortMethod === "price") {
      sortCriteria = { price: sortOrder === "desc" ? -1 : 1 };
    } else if (sortMethod === "category") {
      sortCriteria = { categoryId: sortOrder === "desc" ? -1 : 1 };
    }

    let productsQuery = Product.find(query)
      .populate("categoryId")
      .sort(sortCriteria);
    if (limit) {
      const limitValue = parseInt(limit);
      productsQuery = productsQuery.limit(limitValue);
    }

    let products = await productsQuery;

    if (!products) throw new Error("Get all products failed!");

    const count = await Product.find(query).count();

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
    if (!product) throw new Error("Get product failed!");

    return Response.success(res, { product });
  } catch (error) {
    return next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const {
      body: { code, name, price, description, categoryId, images },
    } = req;

    let product;

    if (!code || !name || !price || !description || images.length === 0)
      throw new Error("Invalid product data");

    let category = null;
    if (categoryId && categoryId !== "null") {
      category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Invalid categoryId");
      }
    }

    product = await Product.create({
      code,
      name,
      price: parseInt(price),
      description,
      categoryId: category ? category._id : null,
      images,
    });

    product = await Product.findById(product._id).populate("categoryId");
    if (product._doc.categoryId) {
      product._doc.categoryId._doc.id = product._doc.categoryId._id;
    }

    return Response.success(res, {
      message: "Created product successfully!",
      product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
      body: { code, name, price, description, categoryId, images },
    } = req;

    if (!code || !name || !price || !description || images.length === 0)
      throw new Error("Invalid product data");

    let category = null;
    if (categoryId && categoryId !== "null") {
      category = await Category.findById(categoryId);
      if (!category) {
        throw new Error("Invalid categoryId");
      }
    }

    let product = await Product.findById(productId);
    if (!product) throw new Error("Get product failed!");

    await Product.findByIdAndUpdate(productId, {
      code,
      name,
      price: parseInt(price),
      description,
      categoryId: category ? category._id : null,
      images,
    });

    product = await Product.findById(productId).populate("categoryId");
    if (product._doc.categoryId) {
      product._doc.categoryId._doc.id = product._doc.categoryId._id;
    }

    return Response.success(res, {
      message: "Updated product successfully!",
      product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findById(productId);
    if (!product) throw new Error("Get product failed!");
    await Product.findByIdAndDelete(productId);
    return Response.success(res, { message: "Delete product successfully!" });
  } catch (error) {
    return next(error);
  }
};
