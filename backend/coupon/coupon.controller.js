/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: ดึงข้อมูลคูปองทั้งหมดที่ผู้ใช้ยังไม่เคยเก็บ
 *     tags:
 *       - Coupon
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: รหัสผู้ใช้
 *     responses:
 *       200:
 *         description: รายการคูปองที่ยังไม่ถูกเก็บโดยผู้ใช้
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   coupon_ID:
 *                     type: integer
 *                   name_coupon:
 *                     type: string
 *                   expiry_date:
 *                     type: string
 *                   discount_price:
 *                     type: number
 *                   discount_description:
 *                     type: string
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */
/**
 * @swagger
 * /api/user-coupon:
 *   post:
 *     summary: เก็บคูปองเข้าในบัญชีผู้ใช้
 *     tags:
 *       - Coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               coupon_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: เก็บคูปองเรียบร้อยแล้ว
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Coupon collected successfully"
 *       400:
 *         description: คูปองนี้ถูกเก็บไปแล้ว
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */
/**
 * @swagger
 * /api/user-coupon:
 *   get:
 *     summary: ดึงข้อมูลคูปองที่ผู้ใช้เคยเก็บแล้ว
 *     tags:
 *       - Coupon
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: รายการคูปองของผู้ใช้
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */
/**
 * @swagger
 * /api/user-coupon-details/{user_id}:
 *   get:
 *     summary: ดึงราคาส่วนลดของคูปองที่ผู้ใช้เก็บไว้
 *     tags:
 *       - Coupon
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: ราคาส่วนลดที่สามารถใช้ได้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 discount_price:
 *                   type: number
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */
/**
 * @swagger
 * /api/user-coupon:
 *   delete:
 *     summary: ลบคูปองที่ผู้ใช้เก็บไว้และลบข้อมูลคูปองออกจากระบบ
 *     tags:
 *       - Coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               coupon_ID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: ลบคูปองเรียบร้อยแล้ว
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User coupon and coupon detail deleted successfully"
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */


// coupon.controller.js
const pool = require("../db");

// GET /api/coupons

//------------------คูปองทั้งหมดที่ผู้ใช้ยังไม่เคยเก็บ------------------
exports.getCoupons = async(req, res) => {
    const { user_id } = req.query;
    try {
        const sql = `
            SELECT cd.coupon_ID, cd.name_coupon, cd.expiry_date, cd.discount_price, cd.discount_description
            FROM CouponDetail cd
            WHERE NOT EXISTS (
            SELECT 1 
            FROM UserCoupon uc 
            WHERE uc.CouponDetail = cd.coupon_ID AND uc.user_id = ?
            )
        `;
        const [results] = await pool.query(sql, [user_id]); 
        return res.status(200).json(results);
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// POST /api/user-coupon
//------------------เก็บคูปอง------------------
exports.collectCoupon = async(req, res) => {
    const { user_id, coupon_ID } = req.body;

    try {
        // เช็คว่าผู้ใช้งานเคยเก็บคูปองนี้หรือยัง
        const checkSql = `SELECT * FROM UserCoupon WHERE user_id = ? AND CouponDetail = ?`;

        const [checkResult] = await pool.query(checkSql, [user_id, coupon_ID]);
        if (checkResult.length > 0) {
            return res.status(400).json({ message: "Coupon already collected" });
        }
        
        // ถ้ายังไม่เคยเก็บ -> insert
        const insertSql = `
            INSERT INTO UserCoupon (user_id, CouponDetail)
            VALUES (?, ?)
        `;
        await pool.query(insertSql, [user_id, coupon_ID]);
        
        return res.status(200).json({ message: "Coupon collected successfully" });
        
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET /api/user-coupon
//------------------คูปองที่ผู้ใช้เก็บแล้ว------------------
exports.getUserCoupon = async (req, res) => {
    const { user_id } = req.query;

    try {
        const sql = `
            SELECT cd.* 
            FROM UserCoupon uc
            INNER JOIN CouponDetail cd ON uc.CouponDetail = cd.coupon_ID
            WHERE uc.user_id = ?
        `;
        const [results] = await pool.query(sql, [user_id]);
        return res.status(200).json(results);
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET /api/user-coupon-details
//-----ตอนคิดราคาในหน้า Payment หรือตอนใช้ส่วนลดในระบบ-----
exports.getCouponDiscount = async (req, res) => {
    const { user_id } = req.params;

    try {
        const sql = `
            SELECT cd.discount_price
            FROM UserCoupon uc 
            INNER JOIN CouponDetail cd ON uc.CouponDetail = cd.coupon_ID
            WHERE uc.user_id = ?
        `;
        const [results] = await pool.query(sql, [user_id]);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// DELETE /api/user-coupon
//------------------ลบคูปองที่ผู้ใช้เก็บแล้ว------------------
exports.deleteUserCoupon = async (req, res) => {
    const { user_id, coupon_ID } = req.body;

    try {
        const sql = `
            DELETE FROM UserCoupon 
            WHERE user_id = ? AND CouponDetail = ?
        `;
        await pool.query(sql, [user_id, coupon_ID]);

        const deleteCouponSql = `
            DELETE FROM CouponDetail 
            WHERE coupon_ID = ?
        `;
        await pool.query(deleteCouponSql, [coupon_ID]);

        return res.status(200).json({ message: "User coupon and coupon detail deleted successfully" });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};