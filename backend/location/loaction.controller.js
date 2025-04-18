const Location = require('../models/location.model'); // เขียนไว้เฉยๆยังไม่ได้แก้ให้ดึงข้อมูลจากดาต้าเบสได้

exports.getLocations = async (req, res) => {
    try {
        const { start, end } = req.query;

        // Check if locations are provided
        if (!start || !end) {
            return res.status(400).json({ message: "Please provide both start and end locations." });
        }
        // Get the start and end locations from the database
        const startLocation = await Location.findById(start);  // Replace with the actual logic
        const endLocation = await Location.findById(end);  // Replace with the actual logic

        if (!startLocation || !endLocation) {
            return res.status(404).json({ message: "Location not found." });
        }

        res.status(200).json({
            startLocation,
            endLocation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};
