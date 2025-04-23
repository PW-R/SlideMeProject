const express = require("express");
const router = express.Router();
const UserSettingsController = require("./userSettings.controller");

// PUT route to update user settings
router.put("/", UserSettingsController.updateUserSettings);

module.exports = router;
