const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Response = require('../helpers/response.helper');
const remove_Id = require('../utils/remove_Id');
const constant = require('../constants/index');
const sendEmail = require('../utils/sendEmail');

const User = require('../models/User');
const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Bill = require('../models/bill');
const BillDetail = require('../models/billDetail');
const Token = require('../models/Token');

const uploadImage = require('../utils/uploadImage');
const { protect } = require('../middlewares/admin/auth');

const {
  response: { createSuccessMessage, updateSuccessMessage, deleteSuccessMessage, failMessage },
} = require('../constants');

// Find Users
exports.getAll = async (req, res, next) => {
  let {
    query: { _limit, _page, q },
    admin,
  } = req;

  try {
    if (!admin) throw new Error(failMessage);

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || constant._limit;

    let total = await User.find({ _id: { $ne: admin._id } }).count();
    let users = await User.find(
      { _id: { $ne: admin._id } },
      {
        password: 0,
      }
    );

    if (q) {
      users = users.filter((item) => {
        const index = item._doc.fullName.toLowerCase().indexOf(q.toLowerCase());
        return index > -1;
      });
      total = users.length;
    }

    return Response.success(res, {
      users: remove_Id(users.slice((_page - 1) * _limit, (_page - 1) * _limit + _limit)),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getDetail = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) throw new Error(failMessage);
    const user = await User.findById(userId, {
      firstName: 1,
      lastName: 1,
      fullName: 1,
      phoneNumber: 1,
      address: 1,
      birthday: 1,
      avatar: 1,
      gender: 1,
      email: 1,
      role: 1,
    });
    if (!user) throw new Error(failMessage);
    user._doc.id = user._id;

    return Response.success(res, { user });
  } catch (error) {
    return next(error);
  }
};

// Update User Information
exports.update = async (req, res, next) => {
  let {
    file,
    body: { firstName, lastName, address, birthday, gender, email },
    user,
  } = req;
  try {
    if (
      !user
      // !firstName &&
      // !lastName
      // phoneNumber &&
      // address &&
      // birthday &&
      // !(gender === "true" || gender === "false")
    )
      throw new Error(failMessage);

    let obj = {
      // firstName,
      // lastName,
    };

    let currentFirstName = '';
    if (firstName) {
      obj = { ...obj, firstName, fullName: `${firstName} ${user.lastName}` };
      currentFirstName = firstName;
    }
    if (lastName)
      obj = {
        ...obj,
        lastName,
        fullName: `${currentFirstName || user.firstName} ${lastName}`,
      };

    // if (phoneNumber) obj = { ...obj, phoneNumber };
    if (email) {
      const currentUser = await User.findOne({ email });
      if (currentUser) throw new Error('Email đã có người sử dụng');
      obj = { ...obj, email };
    }
    if (address) obj = { ...obj, address };
    if (birthday) obj = { ...obj, birthday: new Date(birthday) };
    if (gender === 'true' || gender === 'false') obj = { ...obj, gender: gender === 'true' };

    if (file) {
      const result = await uploadImage(file);
      obj = { ...obj, avatar: result.url };
    }

    await User.findByIdAndUpdate(user._id, { ...obj });
    user = await User.findById(user._id, { password: 0 });
    user._doc.id = user._id;

    return Response.success(res, { message: updateSuccessMessage, user });
  } catch (error) {
    return next(error);
  }
};

// Update Password - Send Code To Gmail
exports.updatePassword = async (req, res, next) => {
  const {
    body: { password, newPassword },
    user,
  } = req;
  try {
    if (!user || !password || !newPassword) throw new Error(failMessage);

    if (!user.email) throw new Error('Bạn cần phải có email để xác nhận thay đổi mật khẩu');

    await Token.findOneAndDelete({ userId: user._id });

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error('Bạn nhập sai mật khẩu');

    const salt = await bcrypt.genSalt(10);
    const generatedPass = await bcrypt.hash(newPassword, salt);

    // Tạo 1 token -> lưu lại -> gởi email + token -> email gởi lại token hợp lệ -> verified user
    // Ngày hết hạn -> 24h
    const token = crypto.randomBytes(16).toString('hex');
    await Token.create({
      userId: user._id,
      newPassword: generatedPass,
      token,
      tokenExpire: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send email
    const tokenUrl = `<a href="${req.protocol}://${req.get(
      'host'
    )}/api/user/auth/confirmation/${token}">${req.protocol}://${req.get(
      'host'
    )}/api/user/auth/confirmation/${token}</a>`;

    const message = `<p>Hello ${user.fullName},</p><p>Bạn cần truy cập vào link sau để xác nhận thay đổi mật khẩu:</p><p>${tokenUrl}</p>`;
    await sendEmail({
      email: user.email,
      subject: 'Change Password Token',
      message,
    });

    return Response.success(res, {
      message: 'Vui lòng check mail để xác nhận thay đổi mật khẩu',
    });
  } catch (error) {
    return next(error);
  }
};

exports.updatePasswordConfirm = async (req, res, next) => {
  const {
    params: { token },
  } = req;

  try {
    if (!token) throw new Error(failMessage);

    const currentToken = await Token.findOne({ token });
    if (!currentToken || Date.now() > currentToken.tokenExpire) throw new Error(failMessage);

    const user = await User.findByIdAndUpdate(currentToken.userId, {
      password: currentToken.newPassword,
    });
    if (!user) throw new Error(failMessage);
    user._doc.id = user._id;

    await Token.findByIdAndDelete(currentToken._id);
    // return Response.success(res, { user, message: updateSuccessMessage });
    // Send email
    const tokenUrl = `<p>Bạn đã đổi mật khẩu thành công, vui lòng bấm vào <a href="http://localhost:3000">đây</a> để quay lại trang chủ</p>`;
    return res.send(tokenUrl);
  } catch (error) {
    return next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  const {
    params: { userId },
    body: { status, role },
  } = req;

  try {
    if (!userId) throw new Error(failMessage);

    let user = await User.findById(userId);
    if (!user) throw new Error(failMessage);

    if (status && (status === 'blocked' || status === 'activated')) {
      if (user.status && user.status === status)
        throw new Error('Bạn đang cập nhật lại trạng thái hiện tại');
      else await User.findByIdAndUpdate(userId, { status });
    }

    if (role && (role === 'admin' || role === 'user')) {
      if (user.role && user.role === role) throw new Error('Bạn đang cập nhật lại quyền hiện tại');
      else await User.findByIdAndUpdate(userId, { role });
    }

    user = await User.findById(userId, { password: 0 });
    user._doc.id = user._id;

    return Response.success(res, { message: updateSuccessMessage, user });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) throw new Error(failMessage);
    const user = await User.findById(userId);
    if (!user) throw new Error(failMessage);

    // Xóa tất cả liên quan tới User trong CSDL

    // - Giỏ hàng - Chi tiết giỏ hàng
    const cart = await Cart.findOne({ userId: user._id });
    if (cart) {
      const cartDetails = await CartDetail.find({ cartId: cart._id });
      for (let cartDetail of cartDetails) await CartDetail.findByIdAndDelete(cartDetail._id);
      await Cart.findByIdAndDelete(cart._id);
    }

    // - Hóa đơn - Chi tiết hóa đơn
    const bills = await Bill.find({ userId: user._id });
    if (bills) {
      for (let bill of bills) {
        const billDetails = await BillDetail.find({ billId: bill._id });
        for (let billDetail of billDetails) await BillDetail.findByIdAndDelete(billDetail._id);
        await Bill.findByIdAndDelete(bill._id);
      }
    }

    // - Bình Luận - Đánh giá

    // - Mã giảm giá

    await User.findByIdAndDelete(userId);

    return Response.success(res, { message: deleteSuccessMessage });
  } catch (error) {
    return next(error);
  }
};
