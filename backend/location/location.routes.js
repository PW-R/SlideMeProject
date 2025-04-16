//routes
const express = require('express');
const router = express.Router();
const locationController = require('../location/loaction.controller');
const locationMiddleware = require('../location/location.middleware');

// Route to get the start and end locations
router.get('/locations', locationMiddleware.validateLocationQuery, locationController.getLocations);

module.exports = router;
