const path = require("path");
const fs = require("fs");
const pool = require("../db");

// ---------------------สร้างร้าน-------------------------
exports.createStore = async (req, res) => {
  const { name, address, phone, password, managerName, info, service } =
    req.body;

  const managerId = req.userId;
  const promptpayFile = req.files?.promptpay?.[0];
  const images = req.files?.images || [];

  try {
    // 🔽 เซฟ promptpay ลง disk
    let promptpayPath = null;
    if (promptpayFile) {
      const promptpayName = `promptpay_${Date.now()}.png`;
      const promptpayFullPath = path.join(
        __dirname,
        "../uploads/",
        promptpayName
      );
      fs.writeFileSync(promptpayFullPath, promptpayFile.buffer);
      promptpayPath = `/uploads/${promptpayName}`;
    }

    // 🔽 เซฟรูปร้านหลายรูป
    const imagePaths = [];
    for (const file of images) {
      const imgName = `shop_${Date.now()}_${file.originalname}`;
      const fullPath = path.join(__dirname, "../uploads/", imgName);
      fs.writeFileSync(fullPath, file.buffer);
      imagePaths.push(`/uploads/${imgName}`);
    }

    // 🔽 บันทึกลง Shop_Info
    const [insertResult] = await pool.query(
      `INSERT INTO Shop_Info 
        (Shop_Name, Shop_Location, Shop_Phone, Shop_Password, Shop_Manager_Name, Shop_Info, Shop_Service, ShopImages, ShopQRCode, ShopManagerID, Shop_Status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open')`,
      [
        name,
        address,
        phone,
        password,
        managerName,
        info,
        service,
        JSON.stringify(imagePaths), // ✅ เซฟเป็น string JSON
        promptpayPath,
        managerId,
      ]
    );

    const newShopId = insertResult.insertId;

    // ✅ เปลี่ยน role เป็น manager
    await pool.query(
      `UPDATE Account_Info SET role = 'manager' WHERE Account_ID = ?`,
      [managerId]
    );
    
    // 🔽 บันทึกรถที่ส่งมาจาก frontend
    if (req.body.vehicles) {
      const vehicles = JSON.parse(req.body.vehicles);
      for (const v of vehicles) {
        await pool.query(
          `INSERT INTO ShopVehicles (Shop_ID, Car_Model, License_Plate) VALUES (?, ?, ?)`,
          [newShopId, v.model, v.license]
        );
      }
    }

    res.status(201).json({ message: "สร้างร้านสำเร็จ" });
  } catch (err) {
    console.error("❌ Error creating store:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//-----------------------ดึงข้อมูลร้านของฉัน----------------------
exports.getMyStore = async (req, res) => {
  const id = req.userId;
  const { username } = req;

  try {
    // ✅ ดึง role สด ๆ จากฐานข้อมูล
    const [[account]] = await pool.query(
      `SELECT role FROM Account_Info WHERE Account_ID = ?`,
      [id]
    );
    const role = account?.role;

    console.log("📦 ROLE:", role, "👤 ID:", id, "🧑‍🚒 Username:", username);

    let store = null;

    if (role === "manager") {
      const [[shop]] = await pool.query(
        `SELECT * FROM Shop_Info WHERE ShopManagerID = ?`,
        [id]
      );
      store = shop;
    } else if (role === "driver") {
      const [[joined]] = await pool.query(
        `SELECT s.* FROM Driver_info d
         JOIN Shop_Info s ON d.Shop_ID = s.Shop_ID
         WHERE d.Driver_Name = ? AND d.Is_Approved = 'approved'`,
        [username]
      );
      store = joined;
    }

    if (!store) return res.status(404).json({ message: "ไม่พบร้านของคุณ" });

    if (typeof store.ShopImages === "string") {
      try {
        store.ShopImages = JSON.parse(store.ShopImages);
      } catch (e) {
        store.ShopImages = [];
      }
    }

    res.json(store);
  } catch (err) {
    console.error("❌ getMyStore error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจาก server" });
  }
};

// ---------------------สถานะร้าน-------------------------
exports.toggleStoreStatus = async (req, res) => {
  console.log("📦 toggleStoreStatus ถูกเรียก");
  const managerId = req.userId;

  try {
    const [[shop]] = await pool.query(
      `SELECT Shop_ID, Shop_Status FROM Shop_Info WHERE ShopManagerID = ?`,
      [managerId]
    );

    if (!shop) return res.status(404).json({ message: "ไม่พบร้านของคุณ" });

    const newStatus = shop.Shop_Status === "open" ? "closed" : "open";

    await pool.query(`UPDATE Shop_Info SET Shop_Status = ? WHERE Shop_ID = ?`, [
      newStatus,
      shop.Shop_ID,
    ]);

    res.json({ message: `เปลี่ยนสถานะร้านเป็น ${newStatus} แล้ว` });
  } catch (err) {
    console.error("❌ toggleStoreStatus error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};
