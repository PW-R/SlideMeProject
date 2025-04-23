const express = require("express");
const router = express.Router();
const upload = require("./CompleteOrder.middleware");
const { completeOrder } = require("./CompleteOrder.controller");

router.put("/api/complete-order/:OrderDetail_ID", upload.single("CompletePhoto"), completeOrder);

module.exports = router;
