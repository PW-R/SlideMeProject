const express = require("express");
const router = express.Router();
const { loginUser } = require("./loginUser.controller");

router.post("/", loginUser);



module.exports = router;
