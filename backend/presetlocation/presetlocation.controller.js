/**
 * @swagger
 * /api/preset-locations:
 *   post:
 *     summary: บันทึกตำแหน่งที่ตั้งที่กำหนดล่วงใหม่
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLocation:
 *                 type: string
 *                 description: ตำแหน่งเริ่มต้นของเส้นทางที่กำหนดล่วง
 *               endLocation:
 *                 type: string
 *                 description: ตำแหน่งสิ้นสุดของเส้นทางที่กำหนดล่วง
 *             required:
 *               - startLocation
 *               - endLocation
 *     responses:
 *       201:
 *         description: บันทึกตำแหน่งที่ตั้งที่กำหนดล่วงสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความยืนยันความสำเร็จ
 *       400:
 *         description: ขาดข้อมูลที่จำเป็น (startLocation หรือ endLocation)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความแสดงข้อผิดพลาดเกี่ยวกับข้อมูลที่ขาดหาย
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์ภายใน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความแสดงข้อผิดพลาดเกี่ยวกับเซิร์ฟเวอร์ภายใน
 */


// presetLocation.controller.js
const pool = require("../db");

exports.saveLocation = async (req, res) => {
  const { startLocation, endLocation } = req.body;

  if (!startLocation || !endLocation) {
    return res.status(400).json({ message: "Both Start Location and End Location are required." });
  }

  try {
    // SQL query to insert data into Preset_location table
    const sql = `
      INSERT INTO Preset_location (Start_Location, End_location)
      VALUES (?, ?)
    `;

    // Execute the query
    await pool.query(sql, [startLocation, endLocation]);

    // Send success response
    res.status(201).json({ message: "Location saved successfully!" });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
