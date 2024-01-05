const express = require('express');

const router = express.Router();

router.use('/user', require('./user.route'));

router.use('/admin', require('./admin.route'));

module.exports = router;
