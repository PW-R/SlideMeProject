/**
 * @swagger
 * /store:
 *   post:
 *     summary: สร้างร้านค้าใหม่
 *     description: ใช้สำหรับผู้จัดการในการสร้างร้านใหม่ พร้อมอัปโหลด PromptPay และภาพร้านหลายรูป
 *     tags:
 *       - Store
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *               - password
 *               - managerName
 *               - info
 *               - service
 *             properties:
 *               name:
 *                 type: string
 *                 example: "ร้านคาเฟ่ข้างทาง"
 *               address:
 *                 type: string
 *                 example: "123/4 ถนนสุขุมวิท กทม."
 *               phone:
 *                 type: string
 *                 example: "0812345678"
 *               password:
 *                 type: string
 *                 example: "shop1234"
 *               managerName:
 *                 type: string
 *                 example: "คุณสมชาย"
 *               info:
 *                 type: string
 *                 example: "ร้านกาแฟสดและขนมโฮมเมด"
 *               service:
 *                 type: string
 *                 example: "เครื่องดื่ม ขนม บริการส่ง"
 *               vehicles:
 *                 type: string
 *                 description: JSON string เช่น `[{"model":"Toyota","license":"1234"}]`
 *               promptpay:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: สร้างร้านสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "สร้างร้านสำเร็จ"
 *       500:
 *         description: เกิดข้อผิดพลาดในระบบ
 */

/**
 * @swagger
 * /store/me:
 *   get:
 *     summary: ดูข้อมูลร้านของฉัน
 *     description: ใช้ดึงข้อมูลร้านที่ตัวเองเป็นผู้จัดการ หรือร้านที่คนขับสังกัดอยู่ (เฉพาะที่ได้รับการอนุมัติ)
 *     tags:
 *       - Store
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: คืนข้อมูลร้านของผู้ใช้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Shop_ID:
 *                   type: integer
 *                 Shop_Name:
 *                   type: string
 *                 Shop_Location:
 *                   type: string
 *                 Shop_Phone:
 *                   type: string
 *                 Shop_Manager_Name:
 *                   type: string
 *                 Shop_Info:
 *                   type: string
 *                 Shop_Service:
 *                   type: string
 *                 ShopImages:
 *                   type: array
 *                   items:
 *                     type: string
 *                 ShopQRCode:
 *                   type: string
 *                 Shop_Status:
 *                   type: string
 *                   enum: [open, closed]
 *       404:
 *         description: ไม่พบร้าน
 *       500:
 *         description: เกิดข้อผิดพลาดจาก server
 */

/**
 * @swagger
 * /store/toggle-status:
 *   patch:
 *     summary: สลับสถานะร้าน (เปิด / ปิด)
 *     description: ผู้จัดการร้านสามารถเปลี่ยนสถานะร้านของตัวเองได้
 *     tags:
 *       - Store
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: เปลี่ยนสถานะร้านสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "เปลี่ยนสถานะร้านเป็น closed แล้ว"
 *       404:
 *         description: ไม่พบร้านของคุณ
 *       500:
 *         description: เกิดข้อผิดพลาดจากระบบ
 */




const path = require("path");
const fs = require("fs");
const pool = require("../db");

// ---------------------สร้างร้าน-------------------------
exports.createStore = async (req, res) => {
  const {
    name,
    address,
    phone,
    password,
    managerName,
    info,
    service,
    lat,
    lng
  } = req.body;
  

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
        (Shop_Name, Shop_Location, Shop_Phone, Shop_Password, Shop_Manager_Name, Shop_Info, Shop_Service, ShopImages, ShopQRCode, ShopManagerID, Shop_Status, Shop_Lat, Shop_Lng)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)`,
    
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
        parseFloat(lat),
        parseFloat(lng)
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
