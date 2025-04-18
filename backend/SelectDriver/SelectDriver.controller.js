// SelectDriver.controller.js

const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

exports.SelectDriver = async (req, res) => {
  const orderId = req.params.orderId;
  const { Driver_ID } = req.body;
  console.log("Received orderId:", orderId);
  console.log("Received Driver_ID:", Driver_ID);


  if (!Driver_ID) return res.status(400).json({ error: "ไม่มีไอดีคนขับ" });

  try {
    const [result] = await pool.query(
      "UPDATE OrderDetail SET Driver_ID = ? WHERE OrderDetail_ID = ?",
      [Driver_ID, orderId]
    )
    console.log("Response:", result);

  if (result.affectedRows === 0) {
    return res.status(404).json({error: "ไม่พบ OrderDetail"})
  }
    res.status(200).json({
      message: "Select Driver successfully",
      // insertedId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error inserting data: ", err);
    res.status(500).json({ message: "Database error", error: err });
  }
};