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
// NearbyShops.controller.js

// 🔧 ใส่ไว้ด้านบนสุดของไฟล์ NearbyShops.controller.js
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // รัศมีของโลก หน่วยเป็นกิโลเมตร
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}


exports.NearbyShops = async (req, res) => {
  console.log("📥 [MOCK] Request received with orderId:", req.params.orderId);
  const { orderId } = req.params;

  // MOCK พิกัดต้นทางของ order
  const Start_Lat = 13.7563;
  const Start_Lng = 100.5018;

  // Mock function สำหรับคำนวณระยะทางแบบคร่าวๆ (ไม่ใช้ Haversine)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const dx = lat1 - lat2;
    const dy = lon1 - lon2;
    return Math.sqrt(dx * dx + dy * dy) * 111; // 1 degree ~ 111km
  };

  // Mock data ร้านค้า + คนขับ
  const allShops = [
    {
      Shop_Name: "ร้าน A",
      Shop_Lat: 13.757,
      Shop_Lng: 100.503,
      Shop_Info: "ให้บริการ 24 ชม.",
      Shop_Phone: "0812345678",
      Shop_service: "รถสไลด์ฉุกเฉิน",
      Total_Price: 1500,
      Equipment: "สายลาก, ล้อสำรอง",
      Driver_ID: "D001",
      Driver_Name: "สมปอง",
      Driver_Year: 3,
      DriverRating: 4.8,
      Offer_Status: "ตกลง"
    },
    {
      Shop_Name: "ร้าน B",
      Shop_Lat: 13.760,
      Shop_Lng: 100.510,
      Shop_Info: "บริการกลางวัน",
      Shop_Phone: "0898765432",
      Shop_service: "เปลี่ยนยาง, ลากรถ",
      Total_Price: 1800,
      Equipment: "แม่แรง, ไฟฉาย",
      Driver_ID: "D002",
      Driver_Name: "สมศักดิ์",
      Driver_Year: 5,
      DriverRating: 4.3,
      Offer_Status: "ตกลง"
    },
    {
      Shop_Name: "ร้าน C (ไกลเกิน)",
      Shop_Lat: 13.900,
      Shop_Lng: 100.800,
      Shop_Info: "ไกลเกิน 10 กม.",
      Shop_Phone: "0877777777",
      Shop_service: "ลากรถ",
      Total_Price: 3000,
      Equipment: "ชุดลากรถ",
      Driver_ID: "D003",
      Driver_Name: "สมใจ",
      Driver_Year: 10,
      DriverRating: 4.9,
      Offer_Status: "ตกลง"
    },
    {
      Shop_Name: "ร้าน D (ไม่ตกลง)",
      Shop_Lat: 13.758,
      Shop_Lng: 100.502,
      Shop_Info: "ไม่รับงานนี้",
      Shop_Phone: "0890000000",
      Shop_service: "ลากรถ",
      Total_Price: 1400,
      Equipment: "แม่แรง",
      Driver_ID: "D004",
      Driver_Name: "สมหมาย",
      Driver_Year: 2,
      DriverRating: 4.0,
      Offer_Status: "ปฏิเสธ"
    }
  ];

  // กรองร้านที่อยู่ในรัศมี <= 10 กม.
  const nearbyShops = allShops.filter((shop) => {
    const distance = calculateDistance(
      Start_Lat,
      Start_Lng,
      shop.Shop_Lat,
      shop.Shop_Lng
    );
    return distance <= 10;
  });

  // กรองเฉพาะที่ offerStatus === "ตกลง"
  const acceptedShops = nearbyShops.filter(
    (shop) => shop.Offer_Status === "ตกลง"
  );

  return res.status(200).json({
    message: "Nearby accepted shops found",
    stores: acceptedShops.map((shop) => ({
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
};
