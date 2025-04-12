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

      <div className="pt-[115px] h-[750px] flex flex-col items-center text-center m-6">
        {/* รูปโปรไฟล์คนขับ */}
        <div className="flex items-center justify-center w-[126px] h-[126px] rounded-full bg-gray-300">
          <img className="rounded-full" src="driver_logo.svg" />
        </div>

        {/* ชื่อและรหัส */}
        <div className="m-2">
          <p className="text-2xl font-bold mt-3 mb-2">สมใจ สมดีนคร</p>
          <p className="font-bold">569-SM-8A2001</p>
        </div>

        {/* Order / Service / Year */}
        <div className="grid grid-cols-3 gap-14 text-center">
          <div className="leading-tight">
            <p className="text-2xl font-bold mb-0">12</p>
            <p className="text-[#A09D9D]">Order</p>
          </div>
          <div className="leading-tight">
            <p className="text-2xl font-bold mb-0">4.9</p>
            <p className="text-[#A09D9D]">Service</p>
          </div>
          <div className="leading-tight">
            <p className="text-2xl font-bold mb-0">2024</p>
            <p className="text-[#A09D9D]">Year</p>
          </div>
        </div>

        {/* เส้นสีเขียว */}
        <div className="w-full border-t-4 border-[#0DC964]"></div>

        {/* ชื่อ / เบอร์โทรศัพท์ / ตำแหน่ง */}
        <div className="grid gap-1 mt-4">
          <p className="flex items-center text-base mb-1">
            <i className="bi bi-file-earmark-person text-[1.3rem] text-[#479E5D] pr-5"></i>
            สมใจ สมดีนคร 569-SM-8A2001
          </p>
          <p className="flex items-center text-base mb-1">
            <i className="bi bi-telephone text-[1.3rem] text-[#479E5D] pr-5"></i>
            096-235-8888
          </p>
          <p className="flex items-center text-base mb-0">
            <i className="bi bi-geo-alt text-[1.3rem] text-[#479E5D] pr-5"></i>
            ตำแหน่ง
          </p>
        </div>

        {/* รีวิว */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">
              ตรงต่อเวลา
            </p>
            <p className="text-[15px] flex items-center h-full m-0">4.0</p>
          </div>
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">
              ราคาเป็นธรรม
            </p>
            <p className="text-[15px] flex items-center h-full m-0">3.9</p>
          </div>
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">ปลอดภัย</p>
            <p className="text-[15px] flex items-center h-full m-0">4.2</p>
          </div>
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">
              บุคลิคผู้ขับ
            </p>
            <p className="text-[15px] flex items-center h-full m-0">4.5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetail;
