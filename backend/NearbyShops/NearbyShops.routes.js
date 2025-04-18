// NearbyShops.routes.js

const express = require("express");
const router = express.Router();
const { NearbyShops } = require('./NearbyShops.controller'); // ✅ ดึงฟังก์ชันโดยใช้ destructuring

router.get('/:orderId', NearbyShops); // ✅ แบบนี้ถูก

module.exports = router;
