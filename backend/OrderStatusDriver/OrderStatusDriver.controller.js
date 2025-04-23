/**
 * @swagger
 * /api/orders/statuses:
 *   get:
 *     summary: ดึงสถานะทั้งหมดของคำสั่งซื้อ
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: ดึงสถานะทั้งหมดของคำสั่งซื้อสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   OrderDetail_ID:
 *                     type: string
 *                     description: ID ของรายละเอียดคำสั่งซื้อ
 *                   OfferStatus:
 *                     type: string
 *                     description: สถานะข้อเสนอของคำสั่งซื้อ
 *                   Order_UserName:
 *                     type: string
 *                     description: ชื่อของผู้ใช้ที่ทำการสั่งซื้อ
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
 *                   DriverCar_type:
 *                     type: string
 *                     description: ประเภทของรถของคนขับ
 *                   Car_Brand:
 *                     type: string
 *                     description: ยี่ห้อของรถ
 *                   UserCar_type:
 *                     type: string
 *                     description: ประเภทของรถของผู้ใช้
 *                   License_Plate:
 *                     type: string
 *                     description: หมายเลขทะเบียนรถ
 *                   CarYear:
 *                     type: integer
 *                     description: ปีของรถ
 *                   Note:
 *                     type: string
 *                     description: หมายเหตุเพิ่มเติมสำหรับคำสั่งซื้อ
 *                   Order_Date_time:
 *                     type: string
 *                     format: date-time
 *                     description: วันที่และเวลาที่ทำการสั่งซื้อ
 *                   Order_Budget:
 *                     type: string
 *                     description: งบประมาณของคำสั่งซื้อ
 *                   Order_Status:
 *                     type: string
 *                     description: สถานะปัจจุบันของคำสั่งซื้อ
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/orders/statuses/{id}:
 *   get:
 *     summary: ดึงสถานะคำสั่งซื้อโดย ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID ของรายละเอียดคำสั่งซื้อ
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ดึงสถานะคำสั่งซื้อโดย ID สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OrderDetail_ID:
 *                   type: string
 *                   description: ID ของรายละเอียดคำสั่งซื้อ
 *                 OfferStatus:
 *                   type: string
 *                   description: สถานะข้อเสนอของคำสั่งซื้อ
 *                 Order_UserName:
 *                   type: string
 *                   description: ชื่อของผู้ใช้ที่ทำการสั่งซื้อ
 *                 Start_Lat:
 *                   type: number
 *                   format: float
 *                   description: ละติจูดของสถานที่เริ่มต้น
 *                 Start_Lng:
 *                   type: number
 *                   format: float
 *                   description: ลองจิจูดของสถานที่เริ่มต้น
 *                 End_Lat:
 *                   type: number
 *                   format: float
 *                   description: ละติจูดของสถานที่สิ้นสุด
 *                 End_Lng:
 *                   type: number
 *                   format: float
 *                   description: ลองจิจูดของสถานที่สิ้นสุด
 *                 DriverCar_type:
 *                   type: string
 *                   description: ประเภทของรถของคนขับ
 *                 Car_Brand:
 *                   type: string
 *                   description: ยี่ห้อของรถ
 *                 UserCar_type:
 *                   type: string
 *                   description: ประเภทของรถของผู้ใช้
 *                 License_Plate:
 *                   type: string
 *                   description: หมายเลขทะเบียนรถ
 *                 CarYear:
 *                   type: integer
 *                   description: ปีของรถ
 *                 Note:
 *                   type: string
 *                   description: หมายเหตุเพิ่มเติมสำหรับคำสั่งซื้อ
 *                 Order_Date_time:
 *                   type: string
 *                   format: date-time
 *                   description: วันที่และเวลาที่ทำการสั่งซื้อ
 *                 Order_Budget:
 *                   type: string
 *                   description: งบประมาณของคำสั่งซื้อ
 *                 Order_Status:
 *                   type: string
 *                   description: สถานะปัจจุบันของคำสั่งซื้อ
 *       404:
 *         description: ไม่พบคำสั่งซื้อ
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์
 */


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
