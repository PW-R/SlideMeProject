/**
 * @swagger
 * /api/user-settings:
 *   put:
 *     summary: อัปเดตการตั้งค่าผู้ใช้
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: ชื่อผู้ใช้ใหม่
 *               phone:
 *                 type: string
 *                 description: หมายเลขโทรศัพท์ใหม่
 *               password:
 *                 type: string
 *                 description: รหัสผ่านใหม่
 *               confirmPassword:
 *                 type: string
 *                 description: ยืนยันรหัสผ่านใหม่
 *     responses:
 *       200:
 *         description: อัปเดตการตั้งค่าผู้ใช้สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความยืนยันว่าอัปเดตสำเร็จ
 *       400:
 *         description: รหัสผ่านไม่ตรงกัน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความแจ้งเตือนว่ารหัสผ่านไม่ตรงกัน
 *       500:
 *         description: ข้อผิดพลาดจาก server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความแจ้งข้อผิดพลาดจาก server
 */

// Put.api/userSettings/userSettings.controller.js
const pool = require("../db");
exports.updateUserSettings = async (req, res) => {
  const { username, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userId = req.user.id; // Make sure you have JWT middleware to set this

    const sql = `
      UPDATE Account_Info 
      SET username = ?, Phone_Number = ?, Password = ?
      WHERE id = ?
    `;

    await pool.query(sql, [username, phone, password, userId]);

    res.status(200).json({ message: "User settings updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
