import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function OrderInfoInputPage() {
  const [selectedVehicle_condition, setSelectedVehicle_condition] =
    useState("");
  const [selectedDriverCar_type, setSelectedDriverCar_type] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const navigate = useNavigate();

  // เลือกสภาพยานพาหนะ
  const handleVehicleConditionChange = (event) => {
    setSelectedVehicle_condition(event.target.value);
  };

  // เลือกประเภทรถบริการ
  const handleDriverCarTypeChange = (event) => {
    setSelectedDriverCar_type(event.target.value);
  };

  // เลือกเวลา
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  // ฟังก์ชั่นสำหรับยืนยันตำแหน่ง
  const handleSearchSlideCar = () => {
    navigate("/DCSS");
  };

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/UserHome">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">ค้นหาสถานที่</h1>
      </div>

      <div className="pt-[115px]">
        {/* เลือกตำแหน่ง */}
        <div className="m-6">
          <div className="grid grid-cols-[1fr_8fr] gap-4">
            {/* icon */}
            <div className="flex flex-col items-start justify-center relative gap-15">
              <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
              <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
              <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/StartPosition" className="w-full">
                <div className="h-[52px] rounded-xl bg-gray-100 text-gray-600 px-3 py-3 text-left">
                  ตำแหน่งต้นทาง
                </div>
              </Link>
              <Link to="/Destination" className="w-full">
                <div className="h-[52px] rounded-xl bg-gray-100 text-gray-600 px-3 py-3 text-left">
                  ตำแหน่งปลายทาง
                </div>
              </Link>
            </div>
          </div>

          {/* ประเภทรถของคุณ */}
          <div className="mb-2 mt-3">
            <div>
              <label className="block text-xl/6 font-semibold text-black-900">
                ประเภทรถของคุณ
              </label>
              <div className="mt-1 mb-2">
                <input
                  type="text"
                  id="Car_Brand"
                  placeholder="ยี่ห้อรถ"
                  className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="UserCar_type"
                  placeholder="รุ่นรถ"
                  className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ข้อมูลรถ */}
          <div className="mb-2 mt-2">
            <label className="block text-xl/6 font-semibold text-black-900">
              ข้อมูลรถ
            </label>
            <div className="flex mt-1 mb-2 gap-x-2">
              <select
                value={selectedVehicle_condition}
                onChange={handleVehicleConditionChange}
                className="block h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-500 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none w-1/2"
              >
                <option value="">สภาพยานพาหนะ</option>
                <option value="Option 1">รถชน</option>
                <option value="Option 2">ยางรั่ว</option>
                <option value="Option 3">รถดับ</option>
              </select>
              <input
                type="number"
                id="UserCar_type"
                placeholder="ปีที่รถผลิต"
                className="block w-1/2 rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                id="License_Plate"
                placeholder="เลขทะเบียน"
                className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <textarea
                id="Note"
                placeholder="รายละเอียดเพิ่มเติม"
                className="block w-full h-20 resize-none rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              ></textarea>
            </div>
          </div>

          {/* ประเภทรถบริการ */}
          <div className="mb-2 mt-2">
            <label className="block text-xl/6 font-semibold text-black-900">
              ประเภทรถบริการ
            </label>
            <div className="mt-1 mb-2">
              <select
                value={selectedDriverCar_type}
                onChange={handleDriverCarTypeChange}
                className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-500 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">เลือกรถ</option>
                <option value="DriverCar_type 1">รถสไลด์ขนาดเล็ก</option>
                <option value="DriverCar_type 2">รถสไลด์ขนาดกลาง</option>
                <option value="DriverCar_type 3">รถสไลด์ขนาดใหญ่</option>
                <option value="DriverCar_type 4">รถสไลด์บรรทุก</option>
              </select>
            </div>
          </div>

          {/* เวลา */}
          <div className="mb-2 mt-2">
            <label className="block text-xl/6 font-semibold text-black-900">
              เวลา
            </label>
            <div className="mt-1 mb-2">
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-500 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">เลือกเวลา</option>
                <option value="Time 1">เรียกรถทันที</option>
                <option value="Time 2">กำหนดเรียก</option>
              </select>
            </div>
          </div>

          {/* ถ้าเลือก "กำหนดเรียก" */}
          {selectedTime === "Time 2" && (
            <div className="mb-2 mt-3">
              <input
                type="date"
                className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
              />
              <input
                type="time"
                className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f] mt-2"
              />
              <input
                type="number"
                placeholder="จำนวนเงิน"
                className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f] mt-2"
              />
            </div>
          )}

          {/* ปุ่มค้นหา */}
          <div className="block w-[150px] h-[40px] mx-auto mt-4 mb-25">
            <button
              onClick={handleSearchSlideCar}
              style={{ borderRadius: "50px" }}
              className="bg-[#0DC964] text-white w-[150px] h-[40px] font-bold text-l flex items-center justify-center hover:bg-[#43af56] transition"
            >
              ค้นหารถสไลด์
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
export default OrderInfoInputPage;
