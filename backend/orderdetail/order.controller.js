// order.controller.js
const pool = require("../db");
// Update order status
exports.updateStatus = async (req, res) => {
    const { orderId } = req.query; // Get orderId from query parameters
    console.log('orderId', orderId)

    if (!orderId) {
        return res.status(400).json({ error: "Order ID and status are required" });
    }

    try {
        const query = `UPDATE orderdetail SET Status = "Order Cancel" WHERE OrderDetail_ID = ?`;
        const result = await pool.query(query, [ orderId]);


        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the order status" });
    }
};

// Get Order_Budget from orderdetail table
exports.getOrder = async (req, res) => {
    const { orderId } = req.query; // Get orderId from query parameters
    
    if (!orderId) {
        return res.status(400).json({ error: "Order ID is required" });
    }

    try {
        const query = `SELECT * FROM orderdetail WHERE OrderDetail_ID = ?`;
        const [rows] = await pool.query(query, [orderId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(rows[0]); // Return the first row of the result
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the order budget" });
    }
};

// Get QR code from Shop_Info table by joining with OrderDetail
exports.getQRCode = async (req, res) => {
    const { orderId } = req.query;

    if (!orderId) {
        return res.status(400).json({ error: "Order ID is required" });
    }

    try {
        const query = `
            SELECT s.ShopQRcode 
            FROM orderdetail o
            JOIN shop_info s ON o.Shop_ID = s.Shop_ID
            WHERE o.OrderDetail_ID = ?
        `;
        const [rows] = await pool.query(query, [orderId]);

        if (rows.length === 0 || !rows[0].ShopQRcode) {
            return res.status(404).json({ error: "QR Code not found" });
        }

        // Convert binary to base64
        const qrBuffer = rows[0].ShopQRcode;
        const base64QR = qrBuffer.toString("base64");

        res.status(200).json({ qrCode: base64QR });
    } catch (error) {
        console.error("Error fetching QR code:", error);
        res.status(500).json({ error: "An error occurred while fetching the QR code" });
    }
};
