require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const apiRoute = require("./routes/api.route");

const publicRoute = require("./routes/public.route");
const User = require("./models/User");

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cors());

app.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode.exp < Date.now() / 1000) {
        return res.json({ isAuthenticated: false, error: "Token hết hạn" });
      }

      const user = await User.findById(decode.user._id);
      if (!user) {
        return res.json({ isAuthenticated: false, error: "User không tồn tại" });
      }

      return res.json({ isAuthenticated: true });
    }
  } catch (error) {
    return res.json({ isAuthenticated: false, error: "Invalid or expired token" });
  }
});

app.use("/api", apiRoute);
app.use("/user", publicRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
