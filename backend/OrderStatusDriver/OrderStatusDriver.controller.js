const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

exports.getOrderStatuses = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(`
      SELECT 
      OrderDetail_ID,
        OfferStatus,
        Order_UserName,
        Start_Lat,
        Start_Lng,
        End_Lat,
        End_Lng,
        DriverCar_type,
        Car_Brand,
        UserCar_type,
        License_Plate,
        CarYear,
        Note,
        Order_Date_time,
        Order_Budget,
        Order_Status
      FROM OrderDetail
    `);
    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ดึงข้อมูลตาม ID
exports.getOrderStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      `
      SELECT 
      OrderDetail_ID,
        OfferStatus,
        Order_UserName,
        Start_Lat,
        Start_Lng,
        End_Lat,
        End_Lng,
        DriverCar_type,
        Car_Brand,
        UserCar_type,
        License_Plate,
        CarYear,
        Note,
        Order_Date_time,
        Order_Budget,
        Order_Status
      FROM OrderDetail
      WHERE OrderDetail_ID = ?
    `,
      [id]
    );
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching order detail by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
