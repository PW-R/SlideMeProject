import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PaymentCompleted() {
  const navigate = useNavigate();

  const InfoItem = ({ iconClass, label }) => (
    <div className="flex flex-col items-center text-[#0DC964]">
      <i className={`${iconClass} text-xl`}></i>
      <p className="mb-1 text-black">{label}</p>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-8 bg-[#0DC964] h-full w-full p-4">
      {/* Main Container with White Background */}
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
        {/* Green Check Mark Circle */}
        <div className="bg-[#0DC964] w-30 h-30 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
          <i className="bi bi-check2 text-7xl"></i>
        </div>

        {/* Thank You Message */}
        <p className="text-center font-semibold text-xl mb-2">
          ขอบคุณสำหรับการเรียกรถ
        </p>

        {/* Order Status Box */}
        <div className="bg-green-100 border border-gray-300 rounded-xl p-4 mb-2">
          <p className="font-semibold text-xl mb-2">Order Status</p>
          <div className="flex justify-between mb-2">
            <span>ทั้งหมด</span>
            <span>2,230</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>ส่วนลด</span>
            <span className="text-red-500">100</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>รวมทั้งหมด</span>
            <span>2,130</span>
          </div>
        </div>

        {/* Driver Profile Section */}
        <div className="flex flex-col items-center bg-green-100 border border-gray-300 rounded-xl mb-2 p-2">
          {/* Profile Icon Placeholder */}
          <div className="w-16 h-16 rounded-full m-2">
            <img className="rounded-full" src="driver_logo.svg" />
          </div>
          <p className="font-bold text-lg mb-2">Driver Name</p>

          <div className="grid grid-cols-3 gap-x-4 mb-2">
            <InfoItem iconClass="bi bi-star-fill" label="5ดาว" />
            <InfoItem iconClass="bi bi-truck-flatbed" label="15รอบเที่ยว" />
            <InfoItem iconClass="bi bi-suitcase-lg-fill" label="1ปี" />
          </div>

          {/* Call and Message Icons */}
          <div className="grid grid-cols-2 gap-x-8 m-2">
            <button
              onClick={() => navigate("/UserMassage")}
              style={{ borderRadius: "10px" }}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-telephone text-white"></i>
            </button>

            <button
              onClick={() => navigate("/UserMassage")}
              style={{ borderRadius: "10px" }}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-chat text-white"></i>
            </button>
          </div>
        </div>

        {/* Green Action Button */}
        <button
          onClick={() => navigate("/OrderStatusListUser")}
          style={{ borderRadius: "15px" }}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition"
        >
          ติดตามสถานะ
        </button>
      </div>
    </div>
  );
}

export default PaymentCompleted;
