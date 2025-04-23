const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const createOffer = async (req, res) => {
  const { orderId, totalPrice, equipment} = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. เพิ่มข้อมูลใน Driver_Offer
    const [offerResult] = await connection.query(
      `INSERT INTO Driver_Offer (OrderDetail_ID, Total_Price) VALUES (?, ?)`,
      [orderId, totalPrice]
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
      `INSERT INTO OrderDetail (OrderDetail_ID, Total_Price) VALUES (?, ?)`,
      [orderId, totalPrice]
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
