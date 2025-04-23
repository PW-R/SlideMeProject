// InputOrder.controller.js

const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

// Import your MySQL model (you'll need to create it in `auth.model.js` later)
// const { getUserByUsername, addNewUser } = require("./auth.model");

// Register a new user
exports.register = async (req, res) => {
  const { username, password, role_id } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the database
    const result = await addNewUser({ username, password: hashedPassword, role_id });
    if (result === "success") {
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('Database connection successful', rows);
  } catch (error) {
    console.error('Database connection error', error);
  }
}

testConnection();

exports.InputOrder = async (req, res) => {
  console.log("📥 New request received: ", req.body);
  const offerStatus = "รอ"; // ✅ บังคับให้เป็น "รอ"
  const {
    startLat,
    startLng,
    endLat,
    endLng,
    carBrand,
    userCarType,
    vehicleCondition,
    carYear,
    licensePlate,
    note,
    serviceType,
    driverCarType,
    orderDateTime,
    orderBudget,
    username,  // Assuming the username is coming from the request body
  } = req.body;

  if (
    !startLat || !startLng ||
    !endLat || !endLng ||
    !carBrand || !userCarType ||
    !vehicleCondition || !carYear ||
    !licensePlate || !serviceType ||
    !orderBudget || !driverCarType 
  )
  {
    return res.status(400).json({
      error: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
    });
  }

  if (serviceType === "กำหนดเรียก" && !orderDateTime) {
    return res.status(400).json({ error: "กรุณากรอกวันที่และเวลา" });
  }
  
  const sql = `
    INSERT INTO OrderDetail (
      Status,
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
      ServiceType,
      DriverCar_type,
      Order_Date_time,
      Order_Budget,
      OfferStatus
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    'Waiting For Accept',
    startLat,   // ตำแหน่ง lat ของต้นทาง
    startLng,   // ตำแหน่ง lng ของต้นทาง
    endLat,     // ตำแหน่ง lat ของปลายทาง
    endLng,      // ตำแหน่ง lng ของปลายทาง
    carBrand,
    userCarType,
    vehicleCondition,
    carYear,
    licensePlate,
    note,
    serviceType,
    driverCarType,
    orderDateTime,
    orderBudget,
    offerStatus
  ];

  try {
    const [result] = await pool.query(sql, values);
    console.log("✅ Order inserted with ID:", result.insertId);

    // After inserting, update the Order_UserName in the OrderDetail table
    const updateSql = `
      UPDATE OrderDetail 
      SET Order_UserName = ? 
      WHERE OrderDetail_ID = ?
    `;
    const updateValues = [username, result.insertId];

    await pool.query(updateSql, updateValues);
    
    res.status(200).json({
      message: "Order saved and username updated successfully",
      orderId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error inserting data: ", err);
    res.status(500).json({ message: "Database error", error: err });
  }
};


exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;
  console.log("Fetching order for ID:", orderId);

  const sql = `
    SELECT * FROM OrderDetail WHERE OrderDetail_ID = ?
  `;
  console.log('SQL query:', sql);  // แสดงคำสั่ง SQL ที่จะทำการ query
  console.log('Query params:', [orderId]);  // แสดงค่าที่จะถูกส่งไปใน query (orderId)

  try {
    const [rows] = await pool.query(sql, [orderId]);
    console.log("✅ Order detail:", rows);

    if (rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลคำสั่งซื้อ" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching order detail:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

