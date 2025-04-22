import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllCoupon() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ ดึง userId จาก localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || 1;

  // ✅ ฟังก์ชันกด Redeem
  const handleCollectCoupon = async (userId, coupon) => {
    try {
      const res = await fetch("http://localhost:3000/api/coupons/user-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          coupon_ID: coupon.coupon_ID, // ✅ แก้ตรงนี้
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to redeem coupon");
      }
  
      alert(`🎉 คุณได้เก็บคูปอง: ${coupon.name_coupon}`);
      // ลบคูปองออกจากรายการ
      setCoupons((prev) =>
        prev.filter((c) => c.coupon_ID !== coupon.coupon_ID)
      );
    } catch (err) {
      console.error("❌ Error redeeming coupon:", err);
      alert(err.message || "Redeem coupon failed");
    }
  };
  
  // ✅ โหลดคูปอง
  useEffect(() => {
    fetch(`http://localhost:3000/api/coupons/coupons?user_id=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("ไม่พบข้อมูลคูปอง");
        return res.json();
      })
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching coupons:", err);
        setError("เกิดข้อผิดพลาดในการโหลดคูปอง");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p className="text-center mt-6">⏳ Loading coupons...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">คูปอง</h1>
      </div>

      {/* body */}
      <div className="pt-[115px] h-[750px] flex flex-col m-6 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-[#0dc964] scrollbar-track-gray-200">
        {coupons.length === 0 ? (
          <p className="text-gray-600 text-center">ยังไม่มีคูปองให้เก็บตอนนี้</p>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon.coupon_ID}
              className="border rounded-xl p-4 shadow bg-white mb-4"
            >
              <h3 className="font-semibold text-lg">{coupon.name_coupon}</h3>
              <p>{coupon.discount_description}</p>
              <p className="text-sm text-gray-600">
                ส่วนลด: {coupon.discount_price} บาท
              </p>
              <p className="text-sm text-red-500">
                หมดอายุ:{" "}
                {new Date(coupon.expiry_date).toLocaleDateString("th-TH")}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-[#0dc964] text-white rounded-full shadow hover:bg-[#0bb653] transition"
                onClick={() => handleCollectCoupon(userId, coupon)}
              >
                เก็บคูปอง
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllCoupon;
