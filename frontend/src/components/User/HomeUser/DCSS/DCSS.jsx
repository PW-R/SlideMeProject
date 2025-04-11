import React from "react";
import { Link} from "react-router-dom";
// import { useState } from "react";

function DCSS() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/OrderInfoInputPage">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">เรียกรถสไลด์</h1>
      </div>

      <div className="pt-[115px] h-[calc(100vh-115px)] flex flex-col">
        {/* พื้นที่แสดง MAP */}
        <div className="bg-blue-300 h-1/2 flex items-center justify-center">
          MAP
        </div>

        {/* แถบรายละเอียด เลือกร้าน */}
        <div className="h-1/2 flex items-center justify-center text-black">
          รายละเอียด เลือกร้าน
        </div>
      </div>
    </div>
  );
}

export default DCSS;
