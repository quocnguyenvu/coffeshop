const Category = require('../../models/Category');
const Product = require('../../models/Product');

const Response = require('../../helpers/response.helper');
const readFile = require('../../utils/readFile');

exports.addCategories = async (req, res, next) => {
  try {
    const data = await readFile('./db.json');
    if (data) {
      const { Category: categories } = JSON.parse(data);

      for (let category of categories) {
        let currentCategory = await Category.findOne({ name: category.name });

        if (!currentCategory) {
          delete category.id;

          await Category.create({
            ...category,
          });
        }
      }
      Response.success(res, { message: 'Thanh cong' });
    }
  } catch (error) {
    return next(error);
  }
};

exports.addProducts = async (req, res) => {
  try {
    const data = await readFile('./db.json');

    if (data) {
      const { products, Category: categories } = JSON.parse(data);

      for (let product of products) {
        const currentCategory = await Category.findOne({
          name: categories[product.categoryId - 1].name,
        });

        if (currentCategory) {
          delete product.id;
          delete product.tabId;

          await Product.create({
            ...product,
            categoryId: currentCategory.id,
          });
        }
      }

      Response.success(res, { message: 'Thanh cong' });
    }
  } catch (error) {
    return next(error);
  }
};

exports.changePriceForProducts = async (req, res) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      await Product.findByIdAndUpdate(product.id, { $unset: { news: 1 } });
    }

    Response.success(res, { message: 'Cập nhật thành công' });
  } catch (error) {
    return console.log(error);
  }
};

exports.changeNewsForProducts = async (req, res, next) => {
  try {
    const data = await readFile('./db.json');

    if (data) {

      Response.success(res, {
        message: 'Thanh cong',
        currentProducts
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.changeImageToProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    for (let product of products) {
      await Product.findByIdAndUpdate(product._id, {
        $set: { imgs: product.img },
        $unset: { img: 1 },
      });
    }

    Response.success(res, {
      message: 'Thanh cong',
    });
  } catch (error) {
    return next(error);
  }
};

exports.addTotalToProduct = async (req, res, next) => {
  try {
    const products = await Product.find();

    for (let product of products) {
      await Product.findByIdAndUpdate(product._id, { total: 100 });
    }

    return Response.success(res, { message: 'Cập nhật thành công' });
  } catch (error) {
    return next(error);
  }
};
