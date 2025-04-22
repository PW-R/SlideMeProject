const pool = require("../db");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

//----------------------Login Driver-------------------------
exports.loginDriver = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Account_Info WHERE username = ? AND `Password` = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }

    const user = rows[0];
    let storeId = null;
    let isApproved = false;
    let hasJoinRequest = false;

    if (user.role === "manager") {
      const [[shop]] = await pool.query(
        `SELECT Shop_ID FROM Shop_Info WHERE ShopManagerID = ?`,
        [user.Account_ID]
      );
      if (shop) storeId = shop.Shop_ID;
    }

    if (user.role === "driver") {
      const [results] = await pool.query(
        `SELECT Shop_ID, Is_Approved FROM Driver_info WHERE Driver_Name = ?`,
        [username]
      );

      if (results.length > 0) {
        const joined = results[0];
        storeId = joined.Shop_ID;
        isApproved = joined.Is_Approved === "approved";
        hasJoinRequest = true;
      }
    }

    // ✅ บันทึก session
    req.session.user = {
      id: user.Account_ID,
      username: user.username,
      role: user.role,
      storeId,
      isApproved,
      hasJoinRequest
    };

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: req.session.user
    });

  } catch (err) {
    console.error("❌ login error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

// ----------------------register Driver-------------------
exports.registerDriver = async (req, res) => {
  const { username, password, birthdate, phone } = req.body;
  const licenseImage = req.files?.licenseImage?.[0];
  const profileImage = req.files?.profileImage?.[0];

  if (!username || !password || !birthdate || !licenseImage || !phone) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
  }

  try {
    // 🔍 เช็คชื่อซ้ำ
    const [exists] = await pool.query(
      "SELECT * FROM Account_Info WHERE username = ?",
      [username]
    );
    if (exists.length > 0) {
      return res.status(400).json({ message: "ชื่อผู้ใช้นี้มีอยู่แล้ว" });
    }

    // 🧑‍🦱 บันทึกรูปโปรไฟล์ (ถ้ามี)
    let profilePath = null;
    if (profileImage) {
      const profileName = `profile_${Date.now()}.png`;
      const profileFullPath = path.join(__dirname, "../uploads/", profileName);
      fs.writeFileSync(profileFullPath, profileImage.buffer);
      profilePath = `/uploads/${profileName}`;
    }

    // ✅ เพิ่มลง Account_Info
    const [accountResult] = await pool.query(
      `INSERT INTO Account_Info 
       (username, Phone_Number, Password, Birthday, role, Profile_Img) 
       VALUES (?, ?, ?, ?, 'driver', ?)`,
      [username, phone, password, birthdate, profilePath]
    );

    const accountId = accountResult.insertId;

    // 📁 เก็บใบขับขี่
    const licenseName = `license_${accountId}_${Date.now()}.png`;
    const licensePath = path.join(__dirname, "../uploads/", licenseName);
    fs.writeFileSync(licensePath, licenseImage.buffer);

   

    res.status(201).json({ message: "สมัครสมาชิกเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจาก server" });
  }
};