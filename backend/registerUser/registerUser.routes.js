const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { registerUser } = require("./registerUser.controller");

// ตั้งค่า multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = `profile_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /api/registerUser
router.post("/", upload.single("profilePicture"), registerUser);

module.exports = router;
