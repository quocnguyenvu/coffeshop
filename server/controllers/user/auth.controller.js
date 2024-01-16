const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const sendEmail = require("../../utils/sendEmail");
const Response = require("../../helpers/response.helper");

const {
  response: { failMessage },
} = require("../../constants");

exports.login = async (req, res, next) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ error: "Số điện thoại không tồn tại" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Mật khẩu không đúng" });
    }

    const payload = {
      user,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Lỗi server" });
        }

        return res.json({ token });
      }
    );
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    confirm_password,
  } = req.body;

  try {
    if (!firstName || !lastName || !phoneNumber || !password || !email) {
      throw new Error(failMessage);
    }

    if (confirm_password !== password) {
      throw new Error("Mật khẩu không trùng khớp");
    }

    let user = await User.findOne(
      { email: email },
      { phoneNumber: phoneNumber }
    );

    if (user) {
      throw new Error("Số điện thoại hoặc email đã tồn tại");
    } else user = null;

    const salt = await bcrypt.genSalt(10);
    const generatedPass = await bcrypt.hash(password, salt);

    user = await User.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phoneNumber,
      password: generatedPass,
      email,
      role: "user",
      status: "activated",
      dateCreate: new Date(),
    });

    const message = `<p>Hello ${firstName} ${lastName},</p><p>Bạn đã đăng kí tài khoản thành công</p>`;
    await sendEmail({
      email: email,
      subject: "Success Register",
      message,
    });

    return Response.success(res, { message: "Tạo tài khoản thành công" });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const { user } = req;

    if (!user) throw new Error(failMessage);
    user._doc.id = user._id;

    return Response.success(res, { user });
  } catch (error) {
    return next(error);
  }
};
