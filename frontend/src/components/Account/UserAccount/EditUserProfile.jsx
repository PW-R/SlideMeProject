import React from "react";
import { FaUserCircle } from "react-icons/fa";

function EditUserProfile() {
  return (
    <div>
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">แก้ไขโปรไฟล์</h1>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
          <FaUserCircle className="text-4xl text-gray-500" />
        </div>
      </div>
      <div className="mt-8 px-6">
        <div className="text-gray-800 text-base font-semibold mb-3">
          ข้อมูลส่วนตัว
        </div>
        <div className="space-y-3">
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition mb-4"
            placeholder="ชื่อ"
          />
          <input
            type="tel"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition mb-4"
            placeholder="เบอร์โทรศัพท์"
          />
          <input
            type="email"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition mb-4"
            placeholder="อีเมล"
          />
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition mb-4"
            placeholder="รหัสผ่านใหม่"
          />
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition mb-4"
            placeholder="ยืนยันรหัสผ่านใหม่"
          />
        </div>

        {/* บันทึก Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-[#0DC964] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#0bb257] transition">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
