// server.js
const express = require("express");
const cors = require("cors");
const InputOrderRoutes = require("./InputOrder/InputOrder.routes");
const NearbyShopsRoutes = require("./NearbyShops/NearbyShops.routes")
const SelectDriverRoutes = require("./SelectDriver/SelectDriver.routes")

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});


app.use("/api/InputOrder", InputOrderRoutes); // ใช้เส้นทางใน auth.routes
app.use("/api", InputOrderRoutes); 
app.use("/api/nearby-shops", NearbyShopsRoutes)
app.use("/:orderId", SelectDriverRoutes)


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
