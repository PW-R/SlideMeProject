const express = require("express");
const router = express.Router();
const multer = require("multer");
const { requireLogin } = require("./CreateStore.middleware");
const storeController = require("./CreateStore.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ ใช้ session-based auth
router.post(
  "/",
  requireLogin,
  upload.fields([
    { name: "images" },
    { name: "promptpay", maxCount: 1 },
  ]),
  storeController.createStore
);

router.get("/my-store", requireLogin, storeController.getMyStore);
router.post("/my-store/toggle-status", requireLogin, storeController.toggleStoreStatus);

module.exports = router;
