// coupon.routes.js
const express = require("express");
const router = express.Router();
const couponController = require("../coupon/coupon.controller");

router.get("/coupons", couponController.getCoupons);
router.post("/user-coupon", couponController.collectCoupon);
router.get("/user-coupon",couponController.getUserCoupon);
router.get("/discount/:user_id", couponController.getCouponDiscount);
router.delete("/coupon", couponController.deleteUserCoupon);

module.exports = router;