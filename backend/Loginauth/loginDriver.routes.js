const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("./loginDriver.controller");

// ✅ ตั้งค่าการอัปโหลดไฟล์ด้วย multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔐 Login
router.post("/login-driver", controller.loginDriver);
// 🔓 Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "ไม่สามารถออกจากระบบได้" });
    }
    res.clearCookie("connect.sid"); // ชื่อ default ของ session cookie
    res.json({ message: "ออกจากระบบเรียบร้อยแล้ว" });
  });
});


// 📝 Register Driver พร้อมอัปโหลดรูป
router.post(
  "/register-driver",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
  ]),
  controller.registerDriver
);

module.exports = router;
