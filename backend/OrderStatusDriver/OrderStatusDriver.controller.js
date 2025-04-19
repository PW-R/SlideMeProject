const dotenv = require("dotenv");
dotenv.config();

const pool = require("../db/index"); 

exports.getOrderStatuses = async (req, res) => {
  try {
    const result = await pool
      .request()
      .query(`
        SELECT os.*, od.CustomerName, od.StartLocation, od.EndLocation
        FROM OrderStatus_Driver os
        INNER JOIN OrderDetail od ON os.OrderId = od.OrderId
      `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching order statuses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool
      .request()
      .input("id", pool.sql.Int, id)
      .query(`
        SELECT os.*, od.CustomerName, od.StartLocation, od.EndLocation
        FROM OrderStatus_Driver os
        INNER JOIN OrderDetail od ON os.OrderId = od.OrderId
        WHERE os.OrderId = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Order status not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error("Error fetching order status by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
