const express = require("express");
const router = express.Router();
const { getOrderHistory } = require("./OrderHistory.controller");

router.get("/", getOrderHistory); // Handles /api/order-history

module.exports = router;
