/**
 * @swagger
 * /api/orders/{orderId}/select-driver:
 *   put:
 *     summary: เลือกคนขับและอัปเดตชื่อคนขับในคำสั่งซื้อ
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: รหัสคำสั่งซื้อที่ต้องการเลือกคนขับ
 *         schema:
 *           type: string
 *       - name: Driver_ID
 *         in: body
 *         required: true
 *         description: รหัสคนขับที่เลือก
 *         schema:
 *           type: object
 *           properties:
 *             Driver_ID:
 *               type: string
 *               description: รหัสคนขับ
 *     responses:
 *       200:
 *         description: เลือกคนขับสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความยืนยันว่าเลือกคนขับสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ครบ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความแจ้งเตือนเมื่อข้อมูลไม่ครบ
 *       404:
 *         description: ไม่พบข้อมูลคนขับหรือคำสั่งซื้อ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความแจ้งว่าไม่พบข้อมูล
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


// SelectDriver.controller.js

const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

exports.SelectDriver = async (req, res) => {
  const orderId = req.params.orderId;
  const { Driver_ID } = req.body;

  console.log("✅ orderId:", orderId);
  console.log("✅ Driver_ID:", Driver_ID);

  if (!Driver_ID || !orderId) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
  }

  try {
    // 🔍 ดึงชื่อจาก Driver_ID
    const [[driver]] = await pool.query(
      "SELECT Driver_Name FROM Driver_info WHERE Driver_ID = ?",
      [Driver_ID]
    );

    if (!driver) {
      return res.status(404).json({ message: "ไม่พบข้อมูลคนขับ" });
    }

    const driverName = driver.Driver_Name;

    // 📝 อัปเดตชื่อคนขับลง OrderDetail
    const [result] = await pool.query(
      "UPDATE OrderDetail SET Order_DriverName = ? WHERE OrderDetail_ID = ?",
      [driverName, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบ OrderDetail" });
    }

    res.status(200).json({
      message: "เลือกคนขับสำเร็จแล้ว!",
    });
  } catch (err) {
    console.error("❌ Error selecting driver:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจาก server", error: err });
  }
};
