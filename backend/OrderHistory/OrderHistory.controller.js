const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const getOrderHistory = async (req, res, next) => {
  try {
    const conn = await pool.getConnection(); // ✅ ใช้ getConnection
    const [rows] = await conn.query(`
      SELECT 
        OrderDetail_ID AS ID,
        Status,
        Discount,
        Start_Location,
        End_location,
        Car_Brand,
        UserCar_type,
        Vehicle_condition,
        CarYear,
        License_Plate,
        Note,
        DriverCar_type,
        Order_Date_time,
        Order_Budget,
        Total_Price,
        Equipment,
        Current_Location,
        ShopQRcode,
        OfferStatus,
        Order_UserName,
        Order_DriverName,
        Rating_ID AS Rating
      FROM OrderDetail
      ORDER BY Order_Date_time DESC
    `);

    conn.release(); // ✅ คืน connection กลับ pool
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching order history:", error);
    next(error);
  }
};

module.exports = {
  getOrderHistory,
};
