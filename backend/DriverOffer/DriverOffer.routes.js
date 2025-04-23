// DriverOffer.routes
const express = require("express");
const router = express.Router();
const { createOffer } = require("./DriverOffer.controller");

router.post("/", createOffer); // ✅ 


module.exports = router;


