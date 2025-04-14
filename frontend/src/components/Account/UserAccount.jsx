import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      {/* Herder */}
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">บัญชี</h1>
      </div>


      {/* Profile Info Row */}
      <div className="flex items-center px-6 mt-4">
        {/* Profile Icon */}
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
          <FaUserCircle className="text-4xl text-gray-500" />
        </div>

        {/* Name and Edit Button */}
        <div className="ml-4 flex flex-col">
          <div className="font-bold text-lg">สมใจ สมดีนคร</div>
          
        </div>
      </div>

      {/* Section Title */}
      <div className="mt-8 px-6">
        <div className="text-gray-800 text-base font-semibold mb-3">
          ข้อมูลส่วนตัว
        </div>

        {/* Buttons Section */}
        <div className="space-y-3">
          <button 
          onClick={() => navigate("/PresetPosition")}
          className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition">
            ร้านตำแหน่งสร้างไว้
          </button>
          <button 
          
          onClick={() => navigate("/EditUserProfile")}
          className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition">
          แก้ไขข้อมูลส่วนตัว
          </button>

          <button 
          
          onClick={() => navigate("/")}
          className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg border hover:bg-gray-200 transition">
          ออกจากระบบ
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
