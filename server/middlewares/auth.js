const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Response = require('../helpers/response.helper');

exports.protect = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;

  try {
    if (!token) throw new Error('Invalid token');

    const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.user._id);
    if (!user) throw new Error('User not found with ID: ' + decodedToken.user._id);

    req.userId = user._id;
    return next();
  } catch (error) {
    console.error('Protect middleware error:', error);
    return Response.error(res, { message: error.message });
  }
};
