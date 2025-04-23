const express = require("express");
const router = express.Router();
const JoinStoreController = require("./JoinStore.controller");
const { requireLogin } = require("../CreatesStore/CreateStore.middleware");




router.post("/search", requireLogin, JoinStoreController.searchStore);
router.post("/request", requireLogin, JoinStoreController.requestJoinStore);
router.get("/status", requireLogin, JoinStoreController.checkJoinStatus);
// ***------------ส่วนของคนขับขอเข้าร่วม--------------***
router.get("/requests", requireLogin, JoinStoreController.getJoinRequests);
router.post("/approve", requireLogin, JoinStoreController.approveJoinRequest);


module.exports = router;
