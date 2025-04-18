// NearbyShops.controller.js

const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.NearbyShops = async (req, res) => {
  console.log("📥 Request received with orderId:", req.params.orderId);

  const { orderId } = req.params;

  try {
    // 1. ดึงตำแหน่งต้นทางจาก orderId
    const [orderRows] = await pool.execute(
      "SELECT Start_Lat, Start_Lng FROM OrderDetail WHERE OrderDetail_ID = ?",
      [orderId]
    );

    if (orderRows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const Start_Lat = parseFloat(orderRows[0].Start_Lat);
    const Start_Lng = parseFloat(orderRows[0].Start_Lng);
    console.log("Start_Lat, Start_Lng:", Start_Lat, Start_Lng);

    // 2. ดึงข้อมูลร้านทั้งหมด
    const [Shops] = await pool.execute(`
      SELECT 
        d.Driver_ID,
        d.Shop_Name,
        d.Shop_Lat,
        d.Shop_Lng,
        o.Total_Price
      FROM Driver_info d
      LEFT JOIN Driver_Offer o ON d.Driver_ID = o.Driver_ID
    `);
    console.log("Shops:", Shops);
    console.log("Found shops:", Shops.length);

    // 3. คำนวณหาร้านที่อยู่ไม่เกิน 3 กิโลเมตร
    const nearbyShop = Shops.filter((shop) => {
      const distance = calculateDistance(
        Start_Lat,
        Start_Lng,
        parseFloat(shop.Shop_Lat),
        parseFloat(shop.Shop_Lng)
      );
      console.log('Start Lat:', Start_Lat, 'Start Lng:', Start_Lng);
      console.log('Shop Lat:', parseFloat(shop.Shop_Lat), 'Shop Lng:', parseFloat(shop.Shop_Lng));
      return distance <= 3;
    });
    console.log("Nearby shops:", nearbyShop.length);
    // console.log("Nearby shops with price:", storesWithPrice);

    // 4. ส่งข้อมูลร้านที่อยู่ใกล้ไปยัง frontend
    res.status(200).json({
      message: "Nearby Shop found",
      stores: nearbyShop.map(shop => ({
        name: shop.Shop_Name,
        lat: shop.Shop_Lat,
        lng: shop.Shop_Lng,
        price: shop.Total_Price
        
      }))
    });
    console.log("Nearby shops with price:", nearbyShop);


  } catch (err) {
    console.error("❌ Error fetching nearby drivers: ", err);
    res.status(500).json({ message: "Database error", error: err });
  }
};