const express = require("express");
const router = express.Router();
const controller = require("./OrderStatusDriver.controller");

router.get("/order-status-driver", controller.getOrderStatuses);

// router.get("/api/order-status-driver/:id",orderStatusController.getOrderStatusById);

module.exports = router;
