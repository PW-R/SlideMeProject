import React from "react";
import { useNavigate } from "react-router-dom";

function Destination() {
  const navigate = useNavigate();

  // ฟังก์ชั่นสำหรับย้อนกลับ
  const handleBack = () => {
    navigate(-1); // ย้อนกลับไปยังหน้าก่อนหน้า
  };

  // ฟังก์ชั่นสำหรับยืนยันตำแหน่ง
  const handleConfirm = () => {
    // คุณสามารถใช้ navigate ไปยังหน้าที่ต้องการหลังจากยืนยันตำแหน่ง
    navigate(-1); // ย้อนกลับไปยังหน้าก่อนหน้า
  };

  return (
    <div>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <i
          onClick={handleBack}
          className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4 cursor-pointer"
        ></i>
        <h1 className="text-white">ตำแหน่งปลายทาง</h1>
      </div>

      <div className="pt-[115px] h-[840px] flex flex-col justify-between">
        {/* ค้นหาตำแหน่ง */}
        <div className="relative m-6">
          <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
          <input
            type="text"
            placeholder="ค้นหาสถานที่"
            className="w-full h-[52px] rounded-xl pl-10 pr-3 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* ตำแหน่งที่เลือก */}
        <div className="w-full h-[170px] bg-amber-50 flex flex-col gap-3 items-center justify-center">
          <div className="text-[20px] mb-2">
            ตำแหน่งที่เลือก
            {/* <p>{address || "..."}</p> */}
          </div>
          <br />
          <button
            onClick={handleConfirm}
            style={{ borderRadius: "50px" }}
            className="rounded-2xl bg-[#0DC964] text-white w-[200px] h-[40px] font-bold text-l flex items-center justify-center hover:bg-[#43af56] transition"
          >
            ยืนยันตำแหน่ง
          </button>
        </div>
      </div>
    </div>
  );
}

export default Destination;
