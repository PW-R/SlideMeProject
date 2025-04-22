// Put.api/userSettings/userSettings.controller.js
const pool = require("../db");
exports.updateUserSettings = async (req, res) => {
  const { username, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userId = req.user.id; // Make sure you have JWT middleware to set this

    const sql = `
      UPDATE Account_Info 
      SET username = ?, Phone_Number = ?, Password = ?
      WHERE id = ?
    `;

    await pool.query(sql, [username, phone, password, userId]);

    res.status(200).json({ message: "User settings updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
