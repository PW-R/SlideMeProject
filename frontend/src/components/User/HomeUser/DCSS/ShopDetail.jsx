import React from "react";
import { Link } from "react-router-dom";

function ShopDetail() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/OrderInfoInputPage">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">ข้อมูลผู้ให้บริการ</h1>
      </div>

      <div className="pt-[115px] h-[750px] flex flex-col m-6">
        <div>
            รูปโปรไฟล์
        </div>

        <div>
            ชื่อ <br />
            รหัส
        </div>

        {/* 3อัน แนวนอน*/}
        <div></div>

        {/* เส้น */}
        <div></div>

        {/* 3อัน แนวตั้ง */}
        <div></div>

        {/* รีวิว 4 อัน */}
        <div></div>
        
      </div>
    </div>
  );
}

export default ShopDetail;
