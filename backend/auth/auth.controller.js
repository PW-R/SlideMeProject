// auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Import your MySQL model (you'll need to create it in `auth.model.js` later)
const { getUserByUsername, addNewUser } = require("./auth.model");

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

// Login a user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await getUserByUsername(username);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password stored in DB
    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return the token
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
