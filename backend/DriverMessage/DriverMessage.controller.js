/**
 * @swagger
 * /api/driver-messages:
 *   get:
 *     summary: ดึงข้อความทั้งหมดของคนขับ
 *     tags:
 *       - Driver
 *     responses:
 *       200:
 *         description: รายการข้อความที่คนขับได้รับ/ส่ง
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sender:
 *                     type: string
 *                     example: "ระบบ"
 *                   content:
 *                     type: string
 *                     example: "คุณมีงานใหม่รอรับ"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-23T12:00:00Z"
 */

/**
 * @swagger
 * /api/driver-messages:
 *   post:
 *     summary: ส่งข้อความใหม่ไปยังระบบข้อความของคนขับ
 *     tags:
 *       - Driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 example: "Admin"
 *               content:
 *                 type: string
 *                 example: "กรุณาตรวจสอบเส้นทางอีกครั้ง"
 *     responses:
 *       201:
 *         description: ส่งข้อความเรียบร้อยแล้ว
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */

const { DriverGetMessages, DriverAddMessage } = require("./DriverMessageLocal");

exports.getMessages = (req, res) => {
  res.json(DriverGetMessages());
};

exports.postMessage = (req, res) => {
  const message = req.body;
  DriverAddMessage(message);
  res.status(201).json({ success: true });
};