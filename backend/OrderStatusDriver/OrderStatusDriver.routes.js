const express = require("express");
const router = express.Router();
const orderStatusController = require("./OrderStatusDriver.controller");

router.get("/order-status-driver", orderStatusController.getOrderStatuses);
router.get("/order-status-driver/:id", orderStatusController.getOrderStatusById);

module.exports = router;
