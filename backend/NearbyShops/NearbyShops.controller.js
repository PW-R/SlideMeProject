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
