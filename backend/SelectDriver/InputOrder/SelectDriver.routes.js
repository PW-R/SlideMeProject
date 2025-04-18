// SelectDriver.routes.js
const express = require("express");
const router = express.Router();
const SelectDriverController = require("./SelectDriver.controller");

// Register route
router.post("/register", SelectDriverController.register);

// Login route
router.post("/login", SelectDriverController.login);

module.exports = router;
