/**
 * @swagger
 * /register:
 *   post:
 *     summary: ลงทะเบียนผู้ใช้ใหม่
 *     description: API นี้ช่วยให้ผู้ใช้ใหม่สามารถลงทะเบียนได้โดยการกรอกหมายเลขโทรศัพท์ วันเกิด รหัสผ่าน และรูปโปรไฟล์
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: หมายเลขโทรศัพท์ของผู้ใช้
 *                 example: "1234567890"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: วันเกิดของผู้ใช้
 *                 example: "1990-01-01"
 *               password:
 *                 type: string
 *                 description: รหัสผ่านของผู้ใช้
 *                 example: "password123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: ไฟล์รูปโปรไฟล์ของผู้ใช้
 *     responses:
 *       201:
 *         description: ผู้ใช้ลงทะเบียนสำเร็จ
 *       400:
 *         description: ข้อความผิดพลาดจากคำขอที่ไม่สมบูรณ์ ขาดข้อมูลที่จำเป็น
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์ภายใน
 *     tags:
 *       - Authentication
 */



const pool = require("../db");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const {  phone, birthday, password } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    if ( !phone || !birthday || !password || !profilePicture) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO Account_Info ( Phone_Number, Birthday, Password, Profile_Img)
      VALUES ( ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      phone,
      birthday,
      hashedPassword,
      `/uploads/${profilePicture}`,
    ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
