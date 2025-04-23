const express = require("express");
const router = express.Router();
const SelectDriverController = require("./SelectDriver.controller");

router.post("/:orderId", SelectDriverController.SelectDriver); // ✅ เปลี่ยนตรงนี้

module.exports = router;
