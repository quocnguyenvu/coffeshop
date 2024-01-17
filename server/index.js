require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors());

const BillDetail = require('./models/billDetail');

const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute);

app.get('/', async (req, res) => {
  try {
    const billDetails = await BillDetail.find();
    return res.send(JSON.stringify(billDetails));
  } catch (error) {
    return console.log('ERR111: ', error);
  }
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
