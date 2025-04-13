import React from "react";
import { Link } from "react-router-dom";

function UseCoupon() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/PaymentConfirm">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">คูปอง</h1>
      </div>

      <div className="pt-[115px] h-[750px] flex flex-col m-6">
        <div className="w-full h-[120px] grid grid-cols-[3fr_1fr] bg-gray-100 rounded-xl mb-3 px-3 py-3">
          {/* รายละเอียด */}
          <div className="mr-3">
            <p className="text-[#0DC964] text-xl font-semibold mb-1">
              โค้ดส่วนลดลูกค้าใหม่
            </p>
            <p className="text-[#A09D9D] text-xs mb-1">
              ใช้งานครั้งแรกรับส่วนลดทันที 25% ทันที เพียงใส่โค้ด Newsideme25
              รับส่วนลดทันที
            </p>
            <p className="text-[#377B48] text-sm font-medium mb-1">
              Exp 30/12/2025
            </p>
          </div>
          
          {/* ปุ่ม "use" */}
          <div className="flex items-center justify-center">
            <button
              //   onClick={handleCoupon}
              style={{ fontSize: "15px", borderRadius: "15px" }}
              className="bg-[#FF0A0A] text-white w-full h-[30px] flex items-center justify-center hover:bg-[#EF1D33] transition"
            >
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseCoupon;
