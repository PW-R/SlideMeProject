const express = require('express');
const { getMessages, postMessage } = require('./DriverMessage.controller');

const router = express.Router();

router.get('/driver-message', getMessages);
router.post('/driver-message', postMessage);

module.exports = router;
