const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const payload = {
      user,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2 days" },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Server error" });
        }

        return res.json({ token });
      }
    );
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.json({ message: 'Change password successfully!' });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
