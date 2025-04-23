// backend/routes/OfferStatus.routes.js
const express = require("express");
const router = express.Router();

const { updateOfferStatus } = require("./OfferStatus.controller");

router.put("/update-offer-status/:id", updateOfferStatus);

module.exports = router;
