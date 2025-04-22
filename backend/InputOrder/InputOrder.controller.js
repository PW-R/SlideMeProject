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
  } = req.body;

  if (
    !startLat || !startLng ||
    !endLat || !endLng ||
    !carBrand || !userCarType ||
    !vehicleCondition || !carYear ||
    !licensePlate || !serviceType ||
    !orderBudget
    // !driverCarType || !orderBudget
  ) {
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
      Order_Budget
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  ];

  try {
    const [result] = await pool.query(sql, values);
    res.status(200).json({
      message: "Order saved successfully",
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
  SELECT 
    o.OrderDetail_ID,
    o.Status,
    o.Start_Lat AS startLat,
    o.Start_Lng AS startLng,
    o.End_Lat AS endLat,
    o.End_Lng AS endLng,
    o.Car_Brand AS carBrand,
    o.UserCar_type AS userCarType,
    o.Vehicle_condition AS vehicleCondition,
    o.CarYear AS carYear,
    o.License_Plate AS licensePlate,
    o.Note,
    o.ServiceType AS serviceType,
    o.DriverCar_type AS driverCarType,
    o.Order_Date_time AS orderDateTime,
    o.Order_Budget AS orderBudget,
    o.Driver_ID,

    d.Driver_Name AS driverName,
    d.Shop_Name AS shopName,
    d.DriverRating AS driverRating,

    s.Shop_Lat AS shopLat,
    s.Shop_Lng AS shopLng,
    s.Shop_Phone AS shopPhone
  FROM OrderDetail o
  LEFT JOIN Driver_info d ON o.Driver_ID = d.Driver_ID
  LEFT JOIN Shop_Info s ON d.Shop_Name = s.Shop_Name
  WHERE o.OrderDetail_ID = ?
  `;

  try {
    const [rows] = await pool.query(sql, [orderId]);
    console.log("Query result:", rows);
    if (rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลคำสั่งซื้อ" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching order:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" });
  }
};

