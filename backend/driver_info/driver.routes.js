const express = require("express");
const router = express.Router();
const drivercontroller = require("../driver_info/driver.controller");

router.get("/driver", drivercontroller.getDriverinfo); 

module.exports = router;