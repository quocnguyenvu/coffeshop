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
