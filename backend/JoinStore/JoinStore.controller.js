// paths:
//   /store/search:
//     post:
//       summary: ค้นหาร้านค้าด้วยชื่อและรหัสผ่าน
//       tags:
//         - Store
//       requestBody:
//         required: true
//         content:
//           application/json:
//             schema:
//               type: object
//               properties:
//                 storeName:
//                   type: string
//                   example: "Coffee Hub"
//                 storeCode:
//                   type: string
//                   example: "secret123"
//       responses:
//         200:
//           description: พบร้านค้าตรงกับข้อมูลที่ให้
//           content:
//             application/json:
//               schema:
//                 type: object
//                 properties:
//                   shopId:
//                     type: integer
//                   shopName:
//                     type: string
//         404:
//           description: ไม่พบร้าน หรือรหัสผิด
//         500:
//           description: Server error

//   /store/join:
//     post:
//       summary: ขอเข้าร่วมร้านค้าในฐานะคนขับ
//       tags:
//         - Store
//       requestBody:
//         required: true
//         content:
//           application/json:
//             schema:
//               type: object
//               properties:
//                 shopId:
//                   type: integer
//                   example: 1
//       responses:
//         200:
//           description: ส่งคำขอสำเร็จ
//         400:
//           description: ข้อมูลไม่ครบ หรือมีข้อมูลคนขับอยู่แล้ว
//         500:
//           description: Server error

//   /store/join/status:
//     get:
//       summary: ตรวจสอบสถานะคำขอเข้าร่วมร้านของคนขับ
//       tags:
//         - Store
//       responses:
//         200:
//           description: คืนสถานะการอนุมัติ
//           content:
//             application/json:
//               schema:
//                 type: object
//                 properties:
//                   approved:
//                     type: string
//                     enum: [pending, approved, rejected]
//         404:
//           description: ยังไม่มีคำขอเข้าร่วมร้าน
//         500:
//           description: Server error

//   /store/join/requests:
//     get:
//       summary: เจ้าของร้านดูคำขอเข้าร่วมร้านทั้งหมด
//       tags:
//         - Store
//       responses:
//         200:
//           description: รายชื่อคำขอที่รออนุมัติ
//           content:
//             application/json:
//               schema:
//                 type: array
//                 items:
//                   type: object
//                   properties:
//                     Driver_ID:
//                       type: integer
//                     Driver_Name:
//                       type: string
//         404:
//           description: ไม่พบร้านของคุณ
//         500:
//           description: Server error

//   /store/join/approve:
//     put:
//       summary: อนุมัติหรือปฏิเสธคำขอเข้าร่วมร้าน
//       tags:
//         - Store
//       requestBody:
//         required: true
//         content:
//           application/json:
//             schema:
//               type: object
//               properties:
//                 driverId:
//                   type: integer
//                   example: 3
//                 approved:
//                   type: boolean
//                   example: true
//       responses:
//         200:
//           description: เปลี่ยนสถานะคำขอสำเร็จ
//         500:
//           description: Server error
// 


const pool = require("../db");

// 🔍 ค้นหาร้านตามชื่อและรหัสผ่าน
exports.searchStore = async (req, res) => {
  const { storeName, storeCode } = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM Shop_Info WHERE Shop_Name = ? AND Shop_Password = ?",
    [storeName, storeCode]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "ไม่พบร้าน หรือรหัสผิด" });
  }

  res.status(200).json({
    shopId: rows[0].Shop_ID,
    shopName: rows[0].Shop_Name,
  });
};

// 🙋‍♂️ ขอเข้าร่วมร้าน
exports.requestJoinStore = async (req, res) => {
  const { shopId } = req.body;
  const username = req.username;

  console.log("📦 Body:", req.body);
  console.log("👤 Username:", username);

  if (!shopId || !username) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
  }

  try {
    const [exists] = await pool.query(
      "SELECT * FROM Driver_info WHERE Driver_Name = ?",
      [username]
    );

    if (exists.length > 0) {
      return res
        .status(400)
        .json({ message: "คุณมีข้อมูลคนขับอยู่แล้ว" });
    }

    // ✅ INSERT ใช้ Shop_ID ถูกต้องแล้ว
    await pool.query(
      "INSERT INTO Driver_info (Driver_Name, Shop_ID, Is_Approved) VALUES (?, ?, 'pending')",
      [username, shopId]
    );

    res.status(200).json({ message: "ส่งคำขอเข้าร่วมร้านแล้ว" });
  } catch (err) {
    console.error("❌ Error joining store:", err.message);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจาก server" });
  }
};

// 🔁 ตรวจสอบสถานะการเข้าร่วม
exports.checkJoinStatus = async (req, res) => {
  const username = req.username;

  const [rows] = await pool.query(
    "SELECT * FROM Driver_info WHERE Driver_Name = ?",
    [username]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "ยังไม่มีคำขอเข้าร่วมร้าน" });
  }

  res.status(200).json({ approved: rows[0].Is_Approved });
};

// 📥 เจ้าของร้านดูคำขอทั้งหมด
exports.getJoinRequests = async (req, res) => {
  const userId = req.userId;

  try {
    // ✅ ชื่อคอลัมน์ตรง: ShopManagerID
    const [[shop]] = await pool.query(
      "SELECT Shop_ID FROM Shop_Info WHERE ShopManagerID = ?",
      [userId]
    );

    if (!shop) return res.status(404).json({ message: "ไม่พบร้านของคุณ" });

    // ✅ WHERE ใช้ Shop_ID ถูกต้อง
    const [drivers] = await pool.query(
      `SELECT Driver_ID, Driver_Name
       FROM Driver_info
       WHERE Shop_ID = ? AND Is_Approved = 'pending'`,
      [shop.Shop_ID]
    );

    res.json(drivers);
  } catch (err) {
    console.error("getJoinRequests error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

// ✅ เจ้าของร้านอนุมัติ/ปฏิเสธคำขอ
exports.approveJoinRequest = async (req, res) => {
  const { driverId, approved } = req.body;
  const newStatus = approved ? "approved" : "rejected";

  try {
    await pool.query(
      "UPDATE Driver_info SET Is_Approved = ? WHERE Driver_ID = ?",
      [newStatus, driverId]
    );

    res.json({ message: `เปลี่ยนสถานะเป็น ${newStatus} สำเร็จ` });
  } catch (err) {
    console.error("approveJoinRequest error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};
