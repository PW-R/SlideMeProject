// controllers/updateOfferStatus.controller.js
const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const updateOfferStatus = async (req, res) => {
  const { orderDetailId, driverOfferId } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. อัปเดต OrderDetail
    await connection.query(
      `UPDATE OrderDetail
       SET OfferStatus = 'ตกลง'
       WHERE OrderDetail_ID = ? AND (OfferStatus = 'รอ' OR OfferStatus IS NULL)`,
      [orderDetailId]
    );

    // 2. อัปเดต Driver_Offer
    await connection.query(
      `UPDATE Driver_Offer
       SET Offer_Status = 'ตกลง'
       WHERE ID = ? AND (Offer_Status = 'รอ' OR Offer_Status IS NULL)`,
      [driverOfferId]
    );

    await connection.commit();
    connection.release();

    return res.status(200).json({ message: "อัปเดตสถานะข้อเสนอเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: "ไม่สามารถอัปเดตสถานะข้อเสนอได้" });
  }
};

module.exports = { updateOfferStatus };
