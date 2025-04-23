const express = require("express");
const router = express.Router();
const reviewController = require("./review.controller");

// Route: GET /api/review/:orderId/complete
router.get("/:orderId/complete", reviewController.getCompleteInfo);

module.exports = router;
