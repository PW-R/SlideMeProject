/**
 * @swagger
 * /api/driver-offers:
 *   post:
 *     summary: คนขับเสนอราคาสำหรับคำสั่งซื้อ พร้อมแนบรายการอุปกรณ์
 *     tags:
 *       - Driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - totalPrice
 *               - driverId
 *               - equipment
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 101
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 example: 1200.50
 *               driverId:
 *                 type: integer
 *                 example: 501
 *               serviceType:
 *                 type: string
 *                 example: "ขนย้ายทั่วไป"
 *               equipment:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "รถเข็น"
 *                     price:
 *                       type: number
 *                       example: 150
 *     responses:
 *       200:
 *         description: เสนอราคาสำเร็จและบันทึกข้อมูลเรียบร้อย
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "บันทึกข้อมูลเรียบร้อย"
 *       500:
 *         description: เกิดข้อผิดพลาดขณะบันทึกข้อมูล
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "เกิดข้อผิดพลาดขณะบันทึกข้อมูล"
 */


const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const createOffer = async (req, res) => {
  const { orderId, totalPrice, equipment, serviceType, driverId } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. เพิ่มข้อมูลใน Driver_Offer
    const [offerResult] = await connection.query(
      `INSERT INTO Driver_Offer (OrderDetail_ID, Total_Price, Driver_ID) VALUES (?, ?, ?)`,
      [orderId, totalPrice, driverId]
    );

    const offerId = offerResult.insertId;

    // 2. เพิ่มรายการอุปกรณ์
    for (const item of equipment) {
      await connection.query(
        `INSERT INTO Equipment (Equipment_Name, Equipment_Price, Driver_Offer_ID) VALUES (?, ?, ?)`,
        [item.name, item.price, offerId]
      );
    }

    // 3. เพิ่มข้อมูลใน OrderDetail โดยใช้ราคาจาก Driver_Offer ที่เพิ่งเพิ่ม
    await connection.query(
      `UPDATE OrderDetail SET Total_Price = ? WHERE OrderDetail_ID = ?`,
      [totalPrice, orderId]
    );
    
    

    await connection.commit();
    res.status(200).json({ message: "บันทึกข้อมูลเรียบร้อย" });
  } catch (error) {
    await connection.rollback();
    console.error("Error in createOffer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดขณะบันทึกข้อมูล" });
  } finally {
    connection.release();
  }
};

module.exports = {
  createOffer,
};
