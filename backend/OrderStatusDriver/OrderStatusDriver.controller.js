const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

exports.getOrderStatuses = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(`
      SELECT 
        os.*, 
        od.Order_UserName AS customerName,
        od.Start_Location AS startLocation, 
        od.End_location AS endLocation
      FROM OrderStatus_Driver os
      INNER JOIN OrderDetail od ON os.ID = od.OrderDetail_ID
    `);
    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching order statuses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(`
      SELECT 
        os.*, 
        od.Order_UserName AS customerName,
        od.Start_Location AS startLocation, 
        od.End_location AS endLocation
      FROM OrderStatus_Driver os
      INNER JOIN OrderDetail od ON os.ID = od.OrderDetail_ID
      WHERE os.ID = ?
    `, [id]);
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Order status not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching order status by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
