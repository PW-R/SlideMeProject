/**
 * @swagger
 * /acceptable-work:
 *   get:
 *     summary: ดึงงานที่สามารถรับได้ (เฉพาะงานที่มีสถานะ "รอ")
 *     tags:
 *       - Driver
 *     description: ดึงข้อมูลงานที่สามารถรับได้ โดยจะเลือกเฉพาะงานที่มี OfferStatus เป็น "รอ" เท่านั้น เพื่อให้ผู้ขับรถเลือกงานได้
 *     responses:
 *       200:
 *         description: ดึงข้อมูลงานสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   OrderDetail_ID:
 *                     type: integer
 *                     example: 101
 *                   OfferStatus:
 *                     type: string
 *                     example: "รอ"
 *                   Order_UserName:
 *                     type: string
 *                     example: "john_doe"
 *                   Start_Lat:
 *                     type: number
 *                     format: float
 *                     example: 13.7563
 *                   Start_Lng:
 *                     type: number
 *                     format: float
 *                     example: 100.5018
 *                   End_Lat:
 *                     type: number
 *                     format: float
 *                     example: 13.7367
 *                   End_Lng:
 *                     type: number
 *                     format: float
 *                     example: 100.5231
 *                   DriverCar_type:
 *                     type: string
 *                     example: "เก๋ง"
 *                   Car_Brand:
 *                     type: string
 *                     example: "Toyota"
 *                   UserCar_type:
 *                     type: string
 *                     example: "กระบะ"
 *                   CarYear:
 *                     type: integer
 *                     example: 2019
 *                   Note:
 *                     type: string
 *                     example: "ขนของขึ้นคอนโด"
 *                   License_Plate:
 *                     type: string
 *                     example: "1กก1234"
 *                   Order_Date_time:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-23T10:30:00"
 *                   Order_Budget:
 *                     type: number
 *                     example: 500
 *                   ServiceType:
 *                     type: string
 *                     example: "ขนย้าย"
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */


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
