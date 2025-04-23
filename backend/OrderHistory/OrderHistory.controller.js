/**
 * @swagger
 * /api/orders/history:
 *   get:
 *     summary: ดึงประวัติคำสั่งซื้อ
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: ดึงประวัติคำสั่งซื้อสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: string
 *                     description: ID ของรายละเอียดคำสั่งซื้อ
 *                   Status:
 *                     type: string
 *                     description: สถานะของคำสั่งซื้อ
 *                   Discount:
 *                     type: string
 *                     description: ส่วนลดที่ใช้กับคำสั่งซื้อ
 *                   Start_Lat:
 *                     type: number
 *                     format: float
 *                     description: ละติจูดของสถานที่เริ่มต้น
 *                   Start_Lng:
 *                     type: number
 *                     format: float
 *                     description: ลองจิจูดของสถานที่เริ่มต้น
 *                   End_Lat:
 *                     type: number
 *                     format: float
 *                     description: ละติจูดของสถานที่สิ้นสุด
 *                   End_Lng:
 *                     type: number
 *                     format: float
 *                     description: ลองจิจูดของสถานที่สิ้นสุด
 *                   Car_Brand:
 *                     type: string
 *                     description: ยี่ห้อของรถ
 *                   UserCar_type:
 *                     type: string
 *                     description: ประเภทของรถของผู้ใช้
 *                   Vehicle_condition:
 *                     type: string
 *                     description: สภาพของยานพาหนะ
 *                   CarYear:
 *                     type: integer
 *                     description: ปีของรถ
 *                   License_Plate:
 *                     type: string
 *                     description: หมายเลขทะเบียนรถ
 *                   Note:
 *                     type: string
 *                     description: หมายเหตุเพิ่มเติมสำหรับคำสั่งซื้อ
 *                   DriverCar_type:
 *                     type: string
 *                     description: ประเภทของรถของคนขับ
 *                   Order_Date_time:
 *                     type: string
 *                     format: date-time
 *                     description: วันที่และเวลาที่ทำการสั่งซื้อ
 *                   Order_Budget:
 *                     type: string
 *                     description: งบประมาณของคำสั่งซื้อ
 *                   Total_Price:
 *                     type: string
 *                     description: ราคาทั้งหมดของคำสั่งซื้อ
 *                   Equipment:
 *                     type: string
 *                     description: อุปกรณ์ที่ใช้ในคำสั่งซื้อ
 *                   Current_Location:
 *                     type: string
 *                     description: สถานที่ปัจจุบันของคำสั่งซื้อ
 *                   ShopQRcode:
 *                     type: string
 *                     description: QR code ของร้าน
 *                   OfferStatus:
 *                     type: string
 *                     description: สถานะข้อเสนอของคำสั่งซื้อ
 *                   Order_UserName:
 *                     type: string
 *                     description: ชื่อของผู้ใช้ที่ทำการสั่งซื้อ
 *                   Order_DriverName:
 *                     type: string
 *                     description: ชื่อของคนขับที่ได้รับมอบหมายให้คำสั่งซื้อ
 *                   Rating:
 *                     type: string
 *                     description: ID การให้คะแนนสำหรับคำสั่งซื้อ
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์ขณะดึงประวัติคำสั่งซื้อ
 */


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
        Start_Lat,
        Start_Lng,
        End_Lat,
        End_Lng,
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
