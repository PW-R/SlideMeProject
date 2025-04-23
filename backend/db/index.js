// db/index.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Database connection pool setup
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // Your DB host (e.g., localhost or IP address of the DB server)
  user: process.env.DB_USER,     // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections
  queueLimit: 0, // Queue limit (if set to 0, it means no limit)
});

console.log("DB CONFIG:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
