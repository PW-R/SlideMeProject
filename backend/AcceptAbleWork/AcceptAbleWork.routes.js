const express = require("express");
const router = express.Router();
const { getAcceptableWork } = require("./AcceptAbleWork.controller");

router.get("/acceptable-work", getAcceptableWork);

module.exports = router;
