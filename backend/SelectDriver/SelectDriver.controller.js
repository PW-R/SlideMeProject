const pool = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

exports.SelectDriver = async (req, res) => {
  const orderId = req.params.orderId;
  const { Driver_ID } = req.body;

  console.log("✅ รับคำขอเลือกคนขับ (mock) >> orderId:", orderId, "| Driver_ID:", Driver_ID);

  if (!Driver_ID || !orderId) {
    return res.status(400).json({ message: "ข้อมูลไม่ครบ" });
  }

  try {
    // 🛠 อัปเดตโดยใช้ Driver_ID แทน (ไม่เกี่ยวกับ username แล้ว)
    const [result] = await pool.query(
      "UPDATE OrderDetail SET Selected_Driver_ID = ? WHERE OrderDetail_ID = ?",
      [Driver_ID, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบ OrderDetail" });
    }

    res.status(200).json({
      message: "เลือกคนขับ (mock) สำเร็จแล้ว!",
      selected_driver_id: Driver_ID,
    });
  } catch (err) {
    console.error("❌ Error selecting mock driver:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดจาก server", error: err });
  }
};
