const dotenv = require("dotenv");
dotenv.config();

exports.NearbyShops = async (req, res) => {
  console.log("📥 (Dummy) Request received with orderId:", req.params.orderId);
  const { orderId } = req.params;

  // ข้อมูล driver จำลอง
  const dummyDrivers = [
    {
      name: "ร้านสมหมายการช่าง",
      lat: "13.7563",
      lng: "100.5018",
      shop_info: "ซ่อมด่วน 24 ชม.",
      shop_phone: "0812345678",
      shop_service: "รถสไลด์, ยกรถ",
      total_price: 1500,
      equipment: "สายพ่วง, แม่แรง",

      Driver_ID: 999,
      driver_name: "สมหมาย ขับไว",
      driver_year: 5,
      rating: 4.9,
    },
    {
      name: "ร้านเจ๊หน่อยขนส่ง",
      lat: "13.7580",
      lng: "100.5020",
      shop_info: "บริการทั่วกรุง",
      shop_phone: "0898765432",
      shop_service: "สไลด์, ขนส่งด่วน",
      total_price: 1800,
      equipment: "รถสไลด์อย่างดี",

      Driver_ID: 1000,
      driver_name: "เจ๊หน่อย",
      driver_year: 8,
      rating: 4.7,
    },
  ];

  return res.status(200).json({
    message: "Nearby Shop (Dummy) found",
    stores: dummyDrivers,
  });
};

exports.SelectedShop = async (req, res) => {
  const { orderId } = req.params;
  console.log("📥 [GET] SelectedShop for orderId:", orderId);

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM OrderDetail WHERE OrderDetail_ID = ?`,
      [orderId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const shop = rows[0];

    console.log("✅ Selected shop data:", shop);

    res.status(200).json({
      lat: shop.Selected_Shop_Lat,
      lng: shop.Selected_Shop_Lng,
    });
  } catch (err) {
    console.error("❌ Error fetching selected shop:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
};
