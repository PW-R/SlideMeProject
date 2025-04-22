import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UseCoupon() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  // ✅ ดึง user id จาก localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleCollectCoupon = async (userId, couponId) => {
    try {
      // ✅ ดึงส่วนลดของคูปองจาก backend
      const discountRes = await fetch(
        `http://localhost:3000/api/coupons/discount/${userId}`
      );

      if (!discountRes.ok) throw new Error("ไม่สามารถดึงส่วนลดได้");

      const discountData = await discountRes.json();
      const discountPrice = discountData?.discount_price || 0;

      // ✅ ลบคูปองออก (เหมือนใช้ไปแล้ว)
      const res = await fetch(`http://localhost:3000/api/coupons/coupon`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, coupon_ID: couponId }),
      });

      if (!res.ok) throw new Error("ลบคูปองไม่สำเร็จ");

      alert("🎉 ใช้คูปองเรียบร้อยแล้ว!");

      // ✅ อัปเดตรายการคูปองในหน้า
      setCoupons((prev) =>
        prev.filter((c) => c.coupon_ID !== couponId)
      );

      // ✅ ไปหน้า PaymentConfirm พร้อมส่ง discount ไปด้วย
      navigate(`/PaymentConfirm/:orderId`, { state: { data: discountPrice } });

    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message || "เกิดข้อผิดพลาดขณะใช้คูปอง");
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/coupons/user-coupon?user_id=${userId}`
        );
        if (!res.ok) throw new Error("โหลดคูปองไม่สำเร็จ");
        const data = await res.json();
        setCoupons(data);
      } catch (err) {
        console.error("❌ Error loading coupons:", err);
      }
    };

    if (userId) {
      fetchCoupons();
    }
  }, [userId]);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">คูปอง</h1>
      </div>

      {/* Body */}
      <div className="pt-[115px] h-[750px] flex flex-col m-6 overflow-y-auto">
        {coupons.length === 0 ? (
          <p className="text-gray-500 text-center">ยังไม่มีคูปองให้ใช้</p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon.coupon_ID}
              className="w-full h-[120px] grid grid-cols-[3fr_1fr] bg-gray-100 rounded-xl mb-3 px-3 py-3"
            >
              {/* คูปอง */}
              <div className="mr-3">
                <p className="text-[#0DC964] text-xl font-semibold mb-1">
                  {coupon.name_coupon}
                </p>
                <p className="text-[#A09D9D] text-xs mb-1">
                  {coupon.discount_description}
                </p>
                <p className="text-[#377B48] text-sm font-medium mb-1">
                  {coupon.expiry_date === '9999-12-31' || !coupon.expiry_date
                    ? "ไม่มีวันหมดอายุ"
                    : `หมดอายุ: ${new Date(coupon.expiry_date).toLocaleDateString("th-TH")}`}
                </p>
              </div>

              {/* ปุ่ม */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleCollectCoupon(userId, coupon.coupon_ID)}
                  style={{ fontSize: "15px", borderRadius: "15px" }}
                  className="bg-[#FF0A0A] text-white w-full h-[30px] flex items-center justify-center hover:bg-[#EF1D33] transition"
                >
                  ใช้คูปอง
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UseCoupon;
