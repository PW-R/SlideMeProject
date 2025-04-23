// InputOrder.routes.js
const express = require("express");
const router = express.Router();
const InputOrderController = require("./InputOrder.controller");

// InputOrder
router.post("/", InputOrderController.InputOrder);
router.get("/order/:orderId", InputOrderController.getOrderById);

module.exports = router;
