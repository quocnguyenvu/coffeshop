const express = require("express");
const category = require("../controllers/category.controller");
const blog = require("../controllers/blog.controller");
const product = require("../controllers/product.controller");
const order = require("../controllers/order.controller");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

// @route   GET user/categories
// @desc    Get All
// @access  Public
router.get("/categories", category.getAll);

// @route   GET user/blogs
// @desc    Get All
// @access  Public
router.get("/blogs", blog.getAll);

// @route   GET user/blog/:blogId
// @desc    Get One
// @access  Public
router.get("/blog/:blogId", blog.getDetail);

// @route   GET user/products
// @desc    Get All
// @access  Public
router.get("/products", product.getAll);

// @route   GET user/product/:productId
// @desc    Get One
// @access  Public
router.get("/product/:productId", product.getProduct);

// @route   POST user/order
// @desc    Create
// @access  Public
router.post("/order", order.create);

// @route   POST user/send-mail
// @desc    Send mail
// @access  Public
router.post("/send-mail", (req, res) => {
  const { name, email, phone, message } = req.body;

  const content = `
  <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333;">Thông tin khách hàng</h1>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Name</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Email</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Phone</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Message</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${message}</td>
        </tr>
      </tbody>
    </table>
    <p style="font-weight: bold;">ĐẠT COFFEE SHOP</p>
  </div>
`;

  const mail = {
    from: name,
    email: process.env.SMTP_USER,
    subject: "Liên hệ từ khách hàng",
    message: content,
  };
  sendEmail(mail);

  const notificationMail = {
    email: email,
    subject: "Thông báo từ ĐẠT COFFEE SHOP",
    message: `
      <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Cảm ơn bạn đã liên hệ với chúng tôi</h1>
        <p>Chúng tôi sẽ sớm phản hồi lại bạn</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
        <p style="font-weight: bold;">ĐẠT COFFEE SHOP</p>
      </div>
    `,
  };
  sendEmail(notificationMail);
  res.json({ message: "Mail sent" });
});

module.exports = router;
