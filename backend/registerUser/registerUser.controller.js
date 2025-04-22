/**
 * @swagger
 * /register:
 *   post:
 *     summary: ลงทะเบียนผู้ใช้ใหม่
 *     description: ลงทะเบียนผู้ใช้ใหม่ในระบบด้วยข้อมูลโทรศัพท์ วันเกิด รหัสผ่าน และรูปโปรไฟล์
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - birthday
 *               - password
 *               - profilePicture
 *             properties:
 *               phone:
 *                 type: string
 *                 description: หมายเลขโทรศัพท์ของผู้ใช้ (ต้องเป็นหมายเลขโทรศัพท์ที่ถูกต้อง)
 *                 example: "0981234567"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: วันเกิดของผู้ใช้ (รูปแบบ YYYY-MM-DD)
 *                 example: "1990-01-01"
 *               password:
 *                 type: string
 *                 description: รหัสผ่านของผู้ใช้ (จะถูกเข้ารหัสก่อนเก็บในฐานข้อมูล)
 *                 example: "StrongPassword123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: รูปโปรไฟล์ของผู้ใช้ (ไฟล์รูปภาพ)
 *                 example: "profile.jpg"
 *     responses:
 *       201:
 *         description: ลงทะเบียนผู้ใช้สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: ข้อมูลที่ส่งมาครบถ้วนหรือไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       400:
 *         description: ข้อมูลรูปโปรไฟล์ไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile picture must be an image file"
 *       422:
 *         description: หมายเลขโทรศัพท์ไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid phone number format"
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: ลงทะเบียนผู้ใช้ใหม่
 *     description: ลงทะเบียนผู้ใช้ใหม่ในระบบด้วยข้อมูลโทรศัพท์ วันเกิด รหัสผ่าน และรูปโปรไฟล์
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - birthday
 *               - password
 *               - profilePicture
 *             properties:
 *               phone:
 *                 type: string
 *                 description: หมายเลขโทรศัพท์ของผู้ใช้ (ต้องเป็นหมายเลขโทรศัพท์ที่ถูกต้อง)
 *                 example: "0981234567"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: วันเกิดของผู้ใช้ (รูปแบบ YYYY-MM-DD)
 *                 example: "1990-01-01"
 *               password:
 *                 type: string
 *                 description: รหัสผ่านของผู้ใช้ (จะถูกเข้ารหัสก่อนเก็บในฐานข้อมูล)
 *                 example: "StrongPassword123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: รูปโปรไฟล์ของผู้ใช้ (ไฟล์รูปภาพ)
 *                 example: "profile.jpg"
 *     responses:
 *       201:
 *         description: ลงทะเบียนผู้ใช้สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: ข้อมูลที่ส่งมาครบถ้วนหรือไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       400:
 *         description: ข้อมูลรูปโปรไฟล์ไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile picture must be an image file"
 *       422:
 *         description: หมายเลขโทรศัพท์ไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid phone number format"
 *       500:
 *         description: ข้อผิดพลาดของเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
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
