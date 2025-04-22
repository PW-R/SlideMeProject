// presetLocation.routes.js
const express = require("express");
const router = express.Router();
const { saveLocation } = require("./presetlocation.controller.js");

// Route to save location data
router.post("/", saveLocation);

module.exports = router;
