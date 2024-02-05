const Order = require("../models/Order");
const Response = require("../helpers/response.helper");

exports.create = async (req, res, next) => {
  try {
    const {
      body: {
        customerName,
        phoneNumber,
        address,
        email,
        amount,
        paymentMethod,
        shipMethod,
        products,
        note,
      },
    } = req;

    if (
      !customerName ||
      !phoneNumber ||
      !address ||
      !amount ||
      !paymentMethod ||
      !shipMethod ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      throw new Error("Invalid order data");
    }

    const newOrder = await Order.create({
      customerName,
      phoneNumber,
      address,
      email,
      amount,
      paymentMethod,
      shipMethod,
      products,
      note,
    });

    return Response.success(res, {
      message: "Created order successfully!",
      order: newOrder,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    let query = {};
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortMethod = "desc",
      customerName,
      phoneNumber,
      status,
    } = req.query;

    if (customerName) {
      query.customerName = { $regex: new RegExp(customerName, "i") };
    }

    if (phoneNumber) {
      query.phoneNumber = { $regex: new RegExp(phoneNumber, "i") };
    }

    if (status) {
      query.status = status;
    }

    const sortOptions = { [sortBy]: sortMethod };

    const orders = await Order.find(query)
      .populate("products.productId")
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const count = await Order.countDocuments(query);

    return Response.success(res, {
      message: "Get all orders successfully!",
      orders,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    return next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    const {
      params: { orderId },
      body: { status },
    } = req;

    if (!orderId || !status) {
      throw new Error("Invalid data");
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found!");
    }

    order.status = status;
    order.dateUpdate = Date.now();

    await order.save();

    return Response.success(res, {
      message: "Change order status successfully!",
      order,
    });
  } catch (error) {
    return next(error);
  }
};
