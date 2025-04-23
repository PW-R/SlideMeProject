/**
 * @swagger
 * /api/shops/nearby/{orderId}:
 *   get:
 *     summary: ดึงข้อมูลร้านค้าที่ยอมรับใกล้เคียงตามตำแหน่งเริ่มต้นของคำสั่งซื้อ
 *     tags:
 *       - User
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของคำสั่งซื้อที่ใช้ในการดึงข้อมูลร้านค้าที่ใกล้เคียง
 *     responses:
 *       200:
 *         description: ดึงข้อมูลร้านค้าที่ยอมรับใกล้เคียงสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: ข้อความสำเร็จ
 *                 stores:
 *                   type: array
 *                   description: รายการร้านค้าที่ใกล้เคียงและได้รับการยอมรับ
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: ชื่อร้านค้า
 *                       lat:
 *                         type: number
 *                         format: float
 *                         description: ละติจูดของร้านค้า
 *                       lng:
 *                         type: number
 *                         format: float
 *                         description: ลองจิจูดของร้านค้า
 *                       shop_info:
 *                         type: string
 *                         description: ข้อมูลเกี่ยวกับร้านค้า
 *                       shop_phone:
 *                         type: string
 *                         description: เบอร์โทรศัพท์ของร้านค้า
 *                       shop_service:
 *                         type: string
 *                         description: บริการที่ร้านค้าให้
 *                       total_price:
 *                         type: number
 *                         description: ราคาทั้งหมดสำหรับบริการ
 *                       equipment:
 *                         type: string
 *                         description: รายการอุปกรณ์ที่ร้านค้าจัดหา
 *                       Driver_ID:
 *                         type: string
 *                         description: ID ของคนขับที่เกี่ยวข้องกับร้านค้า
 *                       driver_name:
 *                         type: string
 *                         description: ชื่อของคนขับ
 *                       driver_year:
 *                         type: number
 *                         description: จำนวนปีที่คนขับได้ทำงาน
 *                       rating:
 *                         type: number
 *                         description: คะแนนของคนขับ
 *                       offerStatus:
 *                         type: string
 *                         description: สถานะของข้อเสนอ (เช่น "ตกลง" สำหรับยอมรับ)
 *       400:
 *         description: ID ของคำสั่งซื้อไม่ถูกต้องหรือขาดพารามิเตอร์
 *       404:
 *         description: ไม่พบคำสั่งซื้อ
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์
 */


const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

exports.NearbyShops = async (req, res) => {
  console.log("📥 Request received with orderId:", req.params.orderId);
  const { orderId } = req.params;

  try {
    // 1. ดึงตำแหน่งต้นทาง
    const [orderRows] = await pool.execute(
      "SELECT Start_Lat, Start_Lng FROM OrderDetail WHERE OrderDetail_ID = ?",
      [orderId]
    );
    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const Start_Lat = parseFloat(orderRows[0].Start_Lat);
    const Start_Lng = parseFloat(orderRows[0].Start_Lng);

    // 2. ดึงข้อมูลร้านทั้งหมด พร้อม Offer_Status
    const [Shops] = await pool.execute(`
      SELECT 
        d.Driver_ID,
        s.Shop_ID,
        s.Shop_Name,
        s.Shop_Lat,
        s.Shop_Phone,
        s.Shop_Lng,
        s.Shop_Info,
        s.Shop_service,
        o.Total_Price,
        o.Equipment,
        o.Offer_Status,
        d.Driver_Year,
        d.Driver_Name,
        d.DriverRating
      FROM Driver_info d
      LEFT JOIN Driver_Offer o ON d.Driver_ID = o.Driver_ID AND o.OrderDetail_ID = ?
      LEFT JOIN Shop_Info s ON d.Shop_ID = s.Shop_ID
    `, [orderId]);

    // 3. ร้านที่อยู่ใกล้ 3 กม.
    const nearbyShop = Shops.filter((shop) => {
      if (!shop.Shop_Lat || !shop.Shop_Lng) return false;
      const distance = calculateDistance(
        Start_Lat, Start_Lng,
        parseFloat(shop.Shop_Lat),
        parseFloat(shop.Shop_Lng)
      );
      return distance <= 10;
    });

    // 4. กรองเฉพาะร้านที่ "ตกลง"
    const acceptedShops = nearbyShop.filter(shop => shop.Offer_Status === "ตกลง");

    // 5. ส่งกลับ
    res.status(200).json({
      message: "Nearby accepted shops found",
      stores: acceptedShops.map(shop => ({
        name: shop.Shop_Name,
        lat: shop.Shop_Lat,
        lng: shop.Shop_Lng,
        shop_info: shop.Shop_Info,
        shop_phone: shop.Shop_Phone,
        shop_service: shop.Shop_service,
        total_price: shop.Total_Price,
        equipment: shop.Equipment,
        Driver_ID: shop.Driver_ID,
        driver_name: shop.Driver_Name,
        driver_year: shop.Driver_Year,
        rating: shop.DriverRating,
        offerStatus: shop.Offer_Status
      }))
    });

  } catch (err) {
    console.error("❌ Error fetching nearby drivers:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
};
