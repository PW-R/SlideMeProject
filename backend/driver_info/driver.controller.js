/**
 * @swagger
 * /api/driver-info:
 *   get:
 *     summary: ดึงข้อมูลคนขับจาก Driver_ID
 *     tags:
 *       - Driver
 *     parameters:
 *       - in: query
 *         name: driverID
 *         required: true
 *         schema:
 *           type: integer
 *         description: รหัสของคนขับ
 *     responses:
 *       200:
 *         description: ข้อมูลของคนขับที่ค้นหาได้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Driver_ID:
 *                   type: integer
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 phone_number:
 *                   type: string
 *                 email:
 *                   type: string
 *                 ...:
 *                   description: ฟิลด์อื่น ๆ ตามในตาราง driver_info
 *       400:
 *         description: ไม่ได้ส่ง driverID มาใน query
 *       404:
 *         description: ไม่พบคนขับที่มี ID นี้
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */


const pool = require("../db");

exports.getDriverinfo = async (req, res) => {
    const { driverID } = req.query; // Get driverID from query parameters
    
    if (!driverID) {
        return res.status(400).json({ error: "Driver ID is required" });
    }
    console.log('test')
    try {
        const query = `SELECT * FROM driver_info WHERE Driver_ID = ?`;
        const [rows] = await pool.query(query, [driverID]);
        console.log('test2')

        if (rows.length === 0) {
            return res.status(404).json({ error: `Driver with ID ${driverID} not found` });
        }
        console.log('test3')
        res.status(200).json(rows[0]); // Return the first row of the result
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the driver information" });
    }
};