const express = require("express");
const cors = require("cors");

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

// Location Routes
app.use('/api', locationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
