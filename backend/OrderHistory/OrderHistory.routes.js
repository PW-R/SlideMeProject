//routes
const express = require('express');
const router = express.Router();
const  getOrderHistory  = require('./OrderHistory.controller');

router.get('/order-history', getOrderHistory);

module.exports = router;

