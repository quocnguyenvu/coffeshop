const moment = require('moment');

const Bill = require('../models/bill');
const Product = require('../models/Product');

const Response = require('../helpers/response.helper');
const User = require('../models/User');
const BillDetail = require('../models/billDetail');

exports.getAll = async (req, res, next) => {
  try {
    let bills;
    let users;
    let products;

    bills = await Bill.aggregate([
      {
        $match: { dateModified: { $ne: null } },
      },
      {
        $group: {
          _id: {
            year: { $year: '$dateModified' },
            month: { $month: '$dateModified' },
            day: { $dayOfMonth: '$dateModified' },
          },
          bills: { $sum: '$total' },
        },
      },
    ]);

    products = await Bill.aggregate([
      {
        $match: { dateCreate: { $ne: null } },
      },
      {
        $group: {
          _id: {
            year: { $year: '$dateCreate' },
            month: { $month: '$dateCreate' },
            day: { $dayOfMonth: '$dateCreate' },
          },
          products: { $sum: 1 },
        },
      },
    ]);

    for (let currentBill of products) {
      const currentDate = moment(
        `${currentBill._id.day}/${currentBill._id.month}/${currentBill._id.year}`,
        'DD/MM/YYYY'
      );
      const totalBills = await Bill.find({
        $and: [
          {
            dateCreate: {
              $gte: new Date(currentDate.startOf('day').toISOString()),
            },
          },
          {
            dateCreate: {
              $lte: new Date(currentDate.endOf('day').toISOString()),
            },
          },
        ],
      });

      let total = 0;
      for (let totalBill of totalBills) {
        const detailBills = await BillDetail.find({ billId: totalBill._id });
        total += detailBills.reduce((item1, item2) => item1 + item2.quantity, 0);
      }
      currentBill.products = total;
    }

    // console.log("CURRENT BILL: ", currentBills);

    users = await User.aggregate([
      {
        $match: { dateCreate: { $ne: null } },
      },
      {
        $group: {
          _id: {
            year: { $year: '$dateCreate' },
            month: { $month: '$dateCreate' },
            day: { $dayOfMonth: '$dateCreate' },
          },
          users: { $sum: 1 },
        },
      },
    ]);

    return Response.success(res, {
      bills: changeToDate(bills).sort(
        (item1, item2) => moment(item1.date, 'DD/MM/YYYY') - moment(item2.date, 'DD/MM/YYYY')
      ),
      users: changeToDate(users).sort(
        (item1, item2) => moment(item1.date, 'DD/MM/YYYY') - moment(item2.date, 'DD/MM/YYYY')
      ),
      products: changeToDate(products).sort(
        (item1, item2) => moment(item1.date, 'DD/MM/YYYY') - moment(item2.date, 'DD/MM/YYYY')
      ),
      totalBills: await Bill.find().count(),
      totalProducts: await Product.find().count(),
      totalUsers: await User.find().count(),
    });
  } catch (error) {
    return next(error);
  }
};

function changeToDate(arr) {
  return arr.map((item) => {
    item.date = `${item._id.day}/${item._id.month}/${item._id.year}`;
    delete item._id;
    return item;
  });
}
