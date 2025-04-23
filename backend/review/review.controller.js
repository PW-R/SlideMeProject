const db = require("../db");

// ดึง CompletePhoto และ CompleteDetail จาก OrderID
exports.getCompleteInfo = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const [rows] = await db.query(
      "SELECT CompletePhoto, CompleteDetail FROM Orderdetail WHERE OrderID = ?",
      [orderId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลของคำสั่งซื้อนี้" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching review info:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};
