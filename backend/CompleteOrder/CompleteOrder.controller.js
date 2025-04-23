/**
 * @swagger
 * /complete-order/{OrderDetail_ID}:
 *   put:
 *     summary: อัปเดตรายละเอียดการดำเนินงานที่เสร็จสิ้น พร้อมแนบรูปภาพ (ถ้ามี)
 *     tags:
 *       - Driver
 *     description: |
 *       ผู้ขับรถสามารถส่งข้อมูลรายละเอียดการดำเนินงานที่เสร็จสิ้น พร้อมรูปภาพยืนยัน (optional) เข้ามาเพื่ออัปเดตสถานะงาน
 *     parameters:
 *       - in: path
 *         name: OrderDetail_ID
 *         required: true
 *         schema:
 *           type: integer
 *         description: รหัสงานที่ต้องการอัปเดต
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               CompleteDetail:
 *                 type: string
 *                 example: "ส่งของเสร็จเรียบร้อยแล้วที่ปลายทาง"
 *               CompletePhoto:
 *                 type: string
 *                 format: binary
 *                 description: รูปภาพหลักฐานการส่งของ (ถ้ามี)
 *     responses:
 *       200:
 *         description: อัปเดตงานว่าเสร็จสิ้นเรียบร้อย
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order marked as completed successfully"
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */


const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const completeOrder = async (req, res, next) => {
  try {
    const { OrderDetail_ID } = req.params;
    const { CompleteDetail } = req.body;
    const CompletePhoto = req.file ? req.file.filename : null;

    const result = await pool
      .request()
      .input("CompleteDetail", CompleteDetail)
      .input("CompletePhoto", CompletePhoto)
      .input("OrderDetail_ID", OrderDetail_ID)
      .query(`
        UPDATE OrderDetail
        SET CompleteDetail = @CompleteDetail,
            CompletePhoto = @CompletePhoto
        WHERE OrderDetail_ID = @OrderDetail_ID
      `);

    res.status(200).json({ message: "Order marked as completed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { completeOrder };
