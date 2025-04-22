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