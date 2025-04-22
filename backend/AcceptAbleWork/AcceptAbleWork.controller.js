const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

const getAcceptableWork = async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT 
        OfferStatus,
        Order_UserName,
        Start_Location,
        End_location,
        DriverCar_type,
        Car_Brand,
        UserCar_type,
        CarYear,
        Note,
        License_Plate,
        Order_Date_time,
        Order_Budget
      FROM OrderDetail
      WHERE OfferStatus = 'Pending'
    `);

    res.json(results);
  } catch (err) {
    console.error(" Error fetching acceptable work:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export แบบ CommonJS
module.exports = { getAcceptableWork };
