const pool = require("../db");

exports.getDriverinfo = async (req, res) => {
    const { driverID } = req.query; // Get driverID from query parameters
    
    if (!driverID) {
        return res.status(400).json({ error: "Driver ID is required" });
    }
    console.log('test')
    try {
        const query = `SELECT * FROM driver_info WHERE Driver_ID = ?`;
        const [rows] = await pool.query(query, [driverID]);
        console.log('test2')

        if (rows.length === 0) {
            return res.status(404).json({ error: `Driver with ID ${driverID} not found` });
        }
        console.log('test3')
        res.status(200).json(rows[0]); // Return the first row of the result
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the driver information" });
    }
};