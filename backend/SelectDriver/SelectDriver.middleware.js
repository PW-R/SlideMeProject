// auth.middleware.js
const jwt = require("jsonwebtoken");
dotenv.config();

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = decoded.id; // Store user ID in request object for further processing
    next();
  });
};
