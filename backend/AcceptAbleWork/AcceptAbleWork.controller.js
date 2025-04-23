const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

//-----------------งานที่สามารถรับได้--------------------
const getAcceptableWork = async (req, res) => {
  try {
    const [results] = await pool.query(`
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
        CarYear,
        Note,
        License_Plate,
        Order_Date_time,
        Order_Budget,
        ServiceType
      FROM OrderDetail
      WHERE OfferStatus = 'รอ'
    `);

    res.json(results);
  } catch (err) {
    console.error("Error fetching acceptable work:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAcceptableWork
};
