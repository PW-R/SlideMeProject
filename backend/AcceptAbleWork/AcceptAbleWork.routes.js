const express = require("express");
const router = express.Router();
const { getAcceptableWork  } = require("./AcceptAbleWork.controller");

router.get("/", getAcceptableWork);



module.exports = router;
