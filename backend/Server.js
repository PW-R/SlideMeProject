// server.js
const express = require("express");
const cors = require("cors");
const InputOrderRoutes = require("./InputOrder/InputOrder.routes");
const NearbyShopsRoutes = require("./NearbyShops/NearbyShops.routes")

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


<<<<<<< HEAD
app.use("/api/InputOrder", InputOrderRoutes); // ใช้เส้นทางใน auth.routes
app.use("/api", InputOrderRoutes); 

app.use("/api/nearby-shops", NearbyShopsRoutes)

=======
>>>>>>> a7bd45e85098ec40f7da47483ee0872286001cde

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
