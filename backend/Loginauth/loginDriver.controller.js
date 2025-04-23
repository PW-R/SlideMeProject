/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for handling driver login and registration
 */

/**
 * @swagger
 * /authentication/driver/login:
 *   post:
 *     summary: เข้าสู่ระบบ (Driver)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: driver01
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "เข้าสู่ระบบสำเร็จ"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "driver01"
 *                     role:
 *                       type: string
 *                       example: "driver"
 *                     storeId:
 *                       type: integer
 *                       nullable: true
 *                       example: 101
 *                     isApproved:
 *                       type: boolean
 *                       example: true
 *                     hasJoinRequest:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: ข้อมูลไม่ครบ
 *       401:
 *         description: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /authentication/driver/register:
 *   post:
 *     summary: ลงทะเบียนคนขับใหม่
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: driver01
 *               password:
 *                 type: string
 *                 example: 123456
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               phone:
 *                 type: string
 *                 example: "0812345678"
 *               licenseImage:
 *                 type: string
 *                 format: binary
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: สมัครสมาชิกเรียบร้อยแล้ว
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "สมัครสมาชิกเรียบร้อยแล้ว"
 *       400:
 *         description: ข้อมูลไม่ครบหรือชื่อผู้ใช้นี้มีอยู่แล้ว
 *       500:
 *         description: เกิดข้อผิดพลาดจาก server
 */


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