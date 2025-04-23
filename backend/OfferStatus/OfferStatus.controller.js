/**
 * @swagger
 * /api/offers/update/{OrderDetail_ID}/{ID}:
 *   put:
 *     summary: อัปเดตสถานะข้อเสนอเป็น "ตกลง" (ยอมรับ) สำหรับทั้ง OrderDetail และ Driver_Offer
 *     tags:
 *       - Driver
 *     parameters:
 *       - name: OrderDetail_ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของรายละเอียดคำสั่งซื้อที่ต้องการอัปเดต
 *       - name: ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของข้อเสนอคนขับที่ต้องการอัปเดต
 *     responses:
 *       200:
 *         description: อัปเดตสถานะข้อเสนอสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความสำเร็จ
 *                 rowsAffected:
 *                   type: object
 *                   properties:
 *                     orderDetail:
 *                       type: number
 *                       description: จำนวนแถวที่ได้รับผลกระทบจากการอัปเดตในตาราง OrderDetail
 *                     driverOffer:
 *                       type: number
 *                       description: จำนวนแถวที่ได้รับผลกระทบจากการอัปเดตในตาราง Driver_Offer
 *       400:
 *         description: ข้อมูลที่ป้อนไม่ถูกต้องหรือขาดพารามิเตอร์
 *       404:
 *         description: ไม่พบคำสั่งซื้อหรือข้อเสนอ
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์หรือไม่สามารถอัปเดตสถานะได้
 */


const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const updateOfferStatus = async (req, res) => {


  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // อัปเดต OfferStatus ใน OrderDetail
    const [orderResult] = await connection.query(
      `UPDATE OrderDetail
       SET OfferStatus = 'ตกลง'
       WHERE OrderDetail_ID = ? AND (OfferStatus = 'รอ' OR OfferStatus IS NULL)`,
      [req.params.OrderDetail_ID]
    );

    // อัปเดต Offer_Status ใน Driver_Offer
    const [driverOfferResult] = await connection.query(
      `UPDATE Driver_Offer
       SET Offer_Status = 'ตกลง'
       WHERE ID = ? AND Offer_Status = 'รอ'`,
      [req.params.ID]
    );

    await connection.commit();

    return res.status(200).json({
      message: "OfferStatus updated successfully",
      rowsAffected: {
        orderDetail: orderResult.affectedRows,
        driverOffer: driverOfferResult.affectedRows,
      },
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error updating offer status:", error);
    return res.status(500).json({ error: "Failed to update offer status" });
  } finally {
    connection.release();
  }
};

module.exports = { updateOfferStatus };
