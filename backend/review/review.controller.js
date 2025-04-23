/**
 * @swagger
 * /api/orders/{orderId}/complete-info:
 *   get:
 *     summary: รับข้อมูลทั้งหมด (รูปภาพและรายละเอียด) ของคำสั่งซื้อ
 *     tags:
 *       - User
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ตัวระบุเฉพาะสำหรับคำสั่งซื้อ
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ดึงข้อมูลทั้งหมดสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CompletePhoto:
 *                   type: string
 *                   description: รูปภาพของคำสั่งซื้อที่เสร็จสมบูรณ์
 *                 CompleteDetail:
 *                   type: string
 *                   description: ข้อมูลรายละเอียดของคำสั่งซื้อที่เสร็จสมบูรณ์
 *       404:
 *         description: ไม่พบคำสั่งซื้อ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความผิดพลาดที่ระบุว่าไม่พบคำสั่งซื้อ
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์ภายใน
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความผิดพลาดที่ระบุว่าเกิดข้อผิดพลาดจากเซิร์ฟเวอร์ภายใน
 */

const db = require("../db");

// ดึง CompletePhoto และ CompleteDetail จาก OrderID
exports.getCompleteInfo = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const [rows] = await db.query(
      "SELECT CompletePhoto, CompleteDetail FROM Orderdetail WHERE OrderID = ?",
      [orderId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลของคำสั่งซื้อนี้" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching review info:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};
