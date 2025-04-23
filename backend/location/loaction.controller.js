/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: ดึงข้อมูลตำแหน่งเริ่มต้นและตำแหน่งปลายทางตาม ID ที่ให้มา
 *     tags:
 *       - User
 *     parameters:
 *       - name: start
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของตำแหน่งเริ่มต้น
 *       - name: end
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID ของตำแหน่งปลายทาง
 *     responses:
 *       200:
 *         description: ดึงข้อมูลตำแหน่งเริ่มต้นและตำแหน่งปลายทางสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startLocation:
 *                   type: object
 *                   description: ข้อมูลตำแหน่งเริ่มต้น
 *                 endLocation:
 *                   type: object
 *                   description: ข้อมูลตำแหน่งปลายทาง
 *       400:
 *         description: ต้องการตำแหน่งเริ่มต้นและปลายทางทั้งสอง
 *       404:
 *         description: ไม่พบข้อมูลตำแหน่ง
 *       500:
 *         description: ข้อผิดพลาดจากเซิร์ฟเวอร์
 */

const pool = require("../db");
exports.getLocations = async (req, res) => {
    try {
        const { start, end } = req.query;

        // Check if locations are provided
        if (!start || !end) {
            return res.status(400).json({ message: "Please provide both start and end locations." });
        }
        // Get the start and end locations from the database
        const startLocation = await pool.findById(start);  // Replace with the actual logic
        const endLocation = await pool.findById(end);  // Replace with the actual logic

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
