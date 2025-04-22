// presetLocation.controller.js
const pool = require("../db");

exports.saveLocation = async (req, res) => {
  const { startLocation, endLocation } = req.body;

  if (!startLocation || !endLocation) {
    return res.status(400).json({ message: "Both Start Location and End Location are required." });
  }

  try {
    // SQL query to insert data into Preset_location table
    const sql = `
      INSERT INTO Preset_location (Start_Location, End_location)
      VALUES (?, ?)
    `;

    // Execute the query
    await pool.query(sql, [startLocation, endLocation]);

    // Send success response
    res.status(201).json({ message: "Location saved successfully!" });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
