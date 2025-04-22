const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); 
const PORT = 3000;



//---------------------user-------------------
//amm API
const InputOrderRoutes = require("./InputOrder/InputOrder.routes");
const NearbyShopsRoutes = require("./NearbyShops/NearbyShops.routes");
const selectDriverRoutes = require("./SelectDriver/SelectDriver.routes");

// Put API
const UserSettingsRoutes = require("./userSettings/userSettings.routes");
const registerUserRoutes = require('./registerUser/registerUser.routes');
const loginUserRoutes = require("./loginUser/loginUser.routes");
const PresetLocationRoutes = require("./presetLocation/presetLocation.routes");


// Asia's API
const couponRoutes = require('./coupon/coupon.routes');
const orderdetailRoutes = require('./orderdetail/order.routes');

// -----------------------------Driver----------------------------
//Bua API
const storeRoutes = require('./CreatesStore/CreateStore.routes');
const joinStoreRoutes = require("./JoinStore/JoinStore.routes");
const loginRoutes = require("./Loginauth/loginDriver.routes");
//fang API
const orderHistoryRoutes = require("./OrderHistory/OrderHistory.routes");
const completeOrder = require("./CompleteOrder/CompleteOrder.routes");
const upload = require("./CompleteOrder/CompleteOrder.middleware");
const orderStatusRoutes = require("./OrderStatusDriver/OrderStatusDriver.routes");
const driverMessageRoutes = require("./DriverMessage/DriverMessage.routes");
const acceptAbleWorkRoutes = require('./AcceptAbleWork/AcceptAbleWork.routes.js');

const app = express();
dotenv.config();
// Parse JSON body
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET || "slideme-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2
  }
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});
app.use("/uploads", express.static("uploads"));

// ----------------------------Use API routes-----------------------------------
//amm API routes
app.use("/api/input-order", InputOrderRoutes); // For InputOrder routes
app.use("/api/nearby-shops", NearbyShopsRoutes);
app.use("/api/select-driver", selectDriverRoutes);
 // Named route for select driver

// Put API routes
app.use("/api/user-settings", UserSettingsRoutes);
app.use("/api/registerUser", registerUserRoutes);
app.use("/api/preset-location", PresetLocationRoutes);
app.use("/api/loginUser", loginUserRoutes);

// Asia's API routes
app.use("/api/coupons", couponRoutes); // For coupon routes
app.use("/api/order-details", orderdetailRoutes); // For order details routes

//-------------------- Driver API routes-----------------------
// Bua API routes
app.use("/api/store", storeRoutes);
app.use("/api/join-store", joinStoreRoutes);

app.use("/api/login-driver", loginRoutes); // For driver login

// fang API routes
app.use("/api/order-history", orderHistoryRoutes);
app.use("/api/complete-order/:OrderDetail_ID", upload.single("CompletePhoto"), completeOrder);
app.use("/api", orderStatusRoutes);
app.use("/api/driver-message", driverMessageRoutes);
app.use("/api/accept-able-work", acceptAbleWorkRoutes);







// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
