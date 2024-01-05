require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const path = require('path');
const cors = require('cors');

// Listen for requests
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');

// Kết nối database
connectDB();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Static folder
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(cors());

// Schemas
// const Bill = require("./models/bill");
// const User = require("./models/User"); --
const BillDetail = require('./models/billDetail');

// Routes
const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute);

app.get('/', async (req, res) => {
  try {
    // const bills = await Bill.find();
    // const users = await User.find();
    const billDetails = await BillDetail.find();
    return res.send(JSON.stringify(billDetails));
  } catch (error) {
    return console.log('ERR111: ', error);
  }
});

// app.get(
//   "/addCategories",
//   require("./controllers/user/addDb.controller").addProducts
// );

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
