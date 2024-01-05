const constant = require('../constants/index');
const remove_Id = require('../utils/remove_Id');

const Category = require('../models/Category');
const Product = require('../models/Product');
const Tag = require('../models/Tag');

const Response = require('../helpers/response.helper');
const uploadImage = require('../utils/uploadImage');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');

exports.getAll = async (req, res, next) => {
  let {
    _page,
    _limit,
    categoryId,
    price_gte,
    price_lte,
    tagId,
    _sort,
    _order,
    new: currentNew,
    hot,
    q,
  } = req.query;

  try {
    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    let products;
    let queryObj = {};

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) throw new Error(failMessage);
      queryObj = {
        categoryId,
      };
    }

    if (tagId) {
      const tag = await Tag.findById(tagId);
      if (!tag) throw new Error(failMessage);
      queryObj = {
        ...queryObj,
        tagId,
      };
    }

    if (price_gte >= 0 && price_lte >= 0) {
      queryObj = {
        ...queryObj,
        price: { $gt: price_gte, $lt: price_lte },
      };
    }

    if (currentNew && (currentNew === 'true' || currentNew === 'false')) {
      queryObj = {
        ...queryObj,
        'status.new': currentNew === 'true',
      };
    }

    if (hot && (hot === 'true' || hot === 'false')) {
      queryObj = {
        ...queryObj,
        'status.hot': hot === 'true',
      };
    }

    // if (q) {
    //   queryObj = {
    //     ...queryObj,
    //     $text: { $search: q },
    //   };
    // }

    let count = await Product.find({ ...queryObj }).count();

    if (_sort && _order)
      products = await Product.find({ ...queryObj })
        .populate(['categoryId', 'tagId'])
        .sort({
          [_sort]: _order === 'asc' ? 1 : -1,
        });
    // .skip((_page - 1) * _limit)
    // .limit(_limit);
    else products = await Product.find({ ...queryObj }).populate(['categoryId', 'tagId']);
    // .skip((_page - 1) * _limit)
    // .limit(_limit);

    if (q) {
      products = products.filter((item, index) => {
        const currentIndex = item._doc.name.toLowerCase().indexOf(q.toLowerCase());
        return currentIndex > -1;
      });
      count = products.length;
    }

    products = products.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit).map((item) => {
      item._doc.categoryId._doc.id = item._doc.categoryId._id;
      item._doc.tagId._doc.id = item._doc.tagId._id;
      return item;
    });

    return Response.success(res, {
      // Add propertype id for db
      products: remove_Id(products),
      totalProduct: count,
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

    const product = await Product.findById(productId).populate('categoryId tagId');
    if (!product) throw new Error(failMessage);

    // Add Id
    product._doc.id = product._id;
    product._doc.categoryId._doc.id = product._doc.categoryId._id;
    product._doc.tagId._doc.id = product._doc.tagId._id;

    return Response.success(res, { product });
  } catch (error) {
    return next(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const {
      files,
      body: {
        categoryId,
        name,
        // status,
        price,
        // sale,
        // rate,
        // size,
        total,
        unit,
        tagId,
        shortDes,
        des,
      },
    } = req;

    let product;

    if (
      !name ||
      !categoryId ||
      !unit ||
      // !status ||
      !price ||
      // !rate ||
      // !shortDes ||
      // !des ||
      // !sale ||
      !tagId
    )
      throw new Error(failMessage);

    const category = await Category.findById(categoryId);

    if (!category) throw new Error(failMessage);

    let obj = {
      categoryId: category._id,
      name,
      price: parseInt(price),
      unit,
      tagId,
    };

    if (des) obj = { ...obj, des };
    if (shortDes) obj = { ...obj, shortDes };
    if (total && !isNaN(total)) obj = { ...obj, total: parseInt(total) };

    if (files) {
      let resultUrls = [];
      for (let file of files) {
        const result = await uploadImage(file);
        resultUrls.push(result.url);
      }
      product = await Product.create({
        // categoryId: category._id,
        // name,
        // // status,
        // price: parseInt(price),
        // size,
        // // sale: parseInt(sale),
        // // rate: parseInt(rate),
        // tagId,
        // shortDes,
        // des,
        ...obj,
        imgs: resultUrls,
      });
    } else
      product = await Product.create({
        // categoryId: category._id,
        // name,
        // // status,
        // price: parseInt(price),
        // size,
        // // sale: parseInt(sale),
        // // rate: parseInt(rate),
        // tagId,
        // shortDes,
        // des,
        ...obj,
      });

    product = await Product.findById(product._id).populate('categoryId tagId');
    product._doc.id = product._id;
    product._doc.categoryId._doc.id = product._doc.categoryId._id;
    product._doc.tagId._doc.id = product._doc.tagId._id;

    return Response.success(res, { message: createSuccessMessage, product });
  } catch (error) {
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let {
      files,
      params: { productId },
      body: {
        categoryId,
        name,
        // status,
        isNew,
        isHot,
        price,
        sale,
        unit,
        // rate,
        tagId,
        shortDes,
        des,
        total,
      },
    } = req;

    isNew = isNew === 'true';
    isHot = isHot === 'true';

    if (
      !productId ||
      !categoryId ||
      !name ||
      !unit ||
      // !status ||
      !price ||
      // !rate ||
      !shortDes ||
      // !des ||
      !tagId
    )
      throw new Error(failMessage);

    let product = await Product.findById(productId);
    const category = await Category.findById(categoryId);

    if (!product || !category) throw new Error(failMessage);

    let obj = {
      categoryId: category._id,
      name,
      price: parseInt(price),
      sale: parseFloat(sale),
      unit,
      tagId,
      shortDes,
    };

    if (des) obj = { ...obj, des };
    // if (shortDes) obj = { ...obj, shortDes };
    if (isNew === 'true' || isNew === 'false') obj = { ...obj, 'status.new': isNew };
    if (isHot === 'true' || isHot === 'false') obj = { ...obj, 'status.hot': isHot };
    if (total && !isNaN(total)) obj = { ...obj, total: parseInt(total) };

    if (files) {
      let resultUrls = [];
      for (let file of files) {
        const result = await uploadImage(file);
        resultUrls.push(result.url);
      }
      product = await Product.findByIdAndUpdate(product._id, {
        // categoryId: category._id,
        // name,
        // // status,
        // status: {
        //   new: isNew,
        //   hot: isHot,
        // },
        // price: parseInt(price),
        // sale: parseFloat(sale),
        // // rate: parseInt(rate),
        // size,
        // tagId,
        // shortDes,
        // des,
        ...obj,
        imgs: resultUrls,
      });
    } else
      product = await Product.findByIdAndUpdate(product._id, {
        // categoryId: category._id,
        // name,
        // // status,
        // status: {
        //   new: isNew,
        //   hot: isHot,
        // },
        // price: parseInt(price),
        // sale: parseFloat(sale),
        // // rate: parseInt(rate),
        // size,
        // tagId,99999999999
        // shortDes,
        // des,
        ...obj,
      });

    product = await Product.findById(product._id).populate('categoryId tagId');
    product._doc.id = product._id;
    product._doc.categoryId._doc.id = product._doc.categoryId._id;
    product._doc.tagId._doc.id = product._doc.tagId._id;

    return Response.success(res, { message: updateSuccessMessage, product });
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
    if (!product) throw new Error(failMessage);
    await Product.findByIdAndDelete(productId);
    return Response.success(res, { message: 'Xóa thành công' });
  } catch (error) {
    return next(error);
  }
};
