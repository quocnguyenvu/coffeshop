const express = require('express');

const router = express.Router();

router.use('/admin', require('./admin.route'));

module.exports = router;
