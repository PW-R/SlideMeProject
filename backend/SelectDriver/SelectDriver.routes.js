// SelectDriver.routes.js
const express = require("express");
const router = express.Router();
const SelectDriverController = require("./SelectDriver.controller");

router.post("/SelectDriver/:orderId", SelectDriverController.SelectDriver);

module.exports = router;
