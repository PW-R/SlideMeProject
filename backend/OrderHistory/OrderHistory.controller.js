// controllers
const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

const getOrderHistory = async (req, res, next) => {
  try {
    const conn = await pool; // ใช้ conn แทน pool ซ้ำ
    const result = await conn.request().query(`
      SELECT 
        oh.ID,
        oh.Total_Price,
        oh.Discount,
        oh.Equipment,
        oh.Start_Location,
        oh.End_location,
        oh.Car_Brand,
        oh.UserCar_type,
        oh.License_Plate,
        oh.Note,
        oh.Order_Date_time,
        oh.Order_Budget,
        od.* 
      FROM 
        OrderHistory oh
      JOIN 
        OrderDetail od ON oh.OrderDetail_ID = od.ID
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    next(error); // ส่งไปที่ middleware จัดการ error
  }
};

module.exports = {
  getOrderHistory
};
