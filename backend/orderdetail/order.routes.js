
const express = require("express");
const router = express.Router();
const orderdetailcontroller = require("../orderdetail/order.controller");

router.put("/order", orderdetailcontroller.updateStatus);
router.get("/order", orderdetailcontroller.getOrder); 
router.get("/qr", orderdetailcontroller.getQRCode);


module.exports = router;