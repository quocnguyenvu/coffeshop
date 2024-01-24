const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
