const mongoose = require("mongoose");

const db = process.env.mongoUrlLocal
  ? process.env.mongoUrlLocal
  : process.env.mongoUrl;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Database...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
