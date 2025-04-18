// auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

module.exports = router;
