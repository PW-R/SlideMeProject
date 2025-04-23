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
