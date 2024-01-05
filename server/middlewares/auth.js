const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Response = require('../helpers/response.helper');

exports.protect = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;

  try {
    if (!token) throw new Error('Không tìm thấy token');
    const decode = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    const user = await User.findById(decode.user.id);
    if (!user || user.role !== 'admin') throw new Error('Token không hợp lệ');
    req.admin = user;

    return next();
  } catch (error) {
    console.log(error);
    return Response.error(res, { message: error.message });
  }
};
