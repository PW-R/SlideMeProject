import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

function OrderInfoInputPage() {
  // State เพื่อเก็บค่าที่เลือก
  const [selectedVehicle_condition, setSelectedVehicle_condition] = useState("");
  const [selectedDriverCar_type, setSelectedDriverCar_type] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  
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
    setSelectedTime(event.target.value)
  }

  // const currentYear = dayjs().year(); // ดึงปีปัจจุบัน

  return (
    <div>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/UserHome">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">ค้นหาสถานที่</h1>
      </div>

      {/* เลือกตำแหน่ง */}
      <div className="user-order-location-container">
        <div className="grid grid-cols-[1fr_8fr] gap-4 m-6">
          <div className="flex flex-col items-start justify-center relative gap-10">
            <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
            {/* เส้นสีเทา */}
            <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
          </div>

          <div className="flex flex-col gap-4">
              <button className="w-full bg-gray-300 text-black px-4 py-2 rounded-xl text-left">
                ตำแหน่งต้นทาง
              </button>
              <button className="w-full bg-gray-300 text-black px-4 py-2 rounded-xl text-left">
                ตำแหน่งปลายทาง
              </button>
          </div>
        </div>

        <div className="m-6 mb-2 mt-2">
          <div>
            <label className="block text-sm/6 font-semibold text-gray-900">
              ประเภทรถของคุณ
            </label>
            <div className="mt-2.5 mb-2">
              <input
                type="text"
                id="Car_Brand"
                placeholder="ยี่ห้อรถ"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
            <div>
              <input
                type="text"
                id="UserCar_type"
                placeholder="รุ่นรถ"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="m-6 mb-2 mt-2">
          <label className="block text-sm/6 font-semibold text-gray-900">
            ข้อมูลรถ
          </label>
          <div className="flex mt-2.5 mb-2 gap-x-2">
            <select
              value={selectedVehicle_condition}
              onChange={handleVehicleConditionChange}
              className="rounded-l-md border border-gray-300 px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-1/2"
            >
              <option value="">สภาพยานพาหนะ</option>
              <option value="Option 1">รถชน</option>
              <option value="Option 2">ยางรั่ว</option>
              <option value="Option 3">รถดับ</option>
            </select>
            <input
              type="text"
              id="UserCar_type"
              placeholder="ปีที่รถผลิต"
              className="rounded-r-md border-t border-r border-b border-gray-300 px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-1/2"
            />
          {/* ปีที่รถผลิต */}
          {/* <div className="mt-2.5 mb-2">
                  <DatePicker
                      label="Years in descending order"
                      maxDate={currentYear}
                      openTo="year"
                      views={['year', 'month']}
                      yearsOrder="desc"
                      sx={{ minWidth: 250 }}
                  />
              </div> */}
          </div>
          <div className="mb-2">
            <input
              type="text"
              id="License_Plate"
              placeholder="เลขทะเบียน"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>
          <div>
            <input
              type="text"
              id="Note"
              placeholder="รายละเอียดเพิ่มเติม"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div className="m-6 mb-2 mt-2">
          <label className="block text-sm/6 font-semibold text-gray-900">
            ประเภทรถบริการ
          </label>
          <div className="mt-2.5 mb-2">
            <select
                value={selectedDriverCar_type} 
                onChange={handleDriverCarTypeChange}
                className="border p-2 w-full"
              >
                <option value="">เลือกรถ</option>
                <option value="DriverCar_type 1">รถสไลด์ขนาดเล็ก</option>
                <option value="DriverCar_type 2">รถสไลด์ขนาดกลาง</option>
                <option value="DriverCar_type 3">รถสไลด์ขนาดใหญ่</option>
                <option value="DriverCar_type 4">รถสไลด์บรรทุก</option>
              </select>
          </div>
        </div>

        <div className="m-6 mb-2 mt-2">
          <label className="block text-sm/6 font-semibold text-gray-900">
            เลือกเวลา
          </label>
          <div className="mt-2.5 mb-2">
            <select
                value={selectedTime} 
                onChange={handleTimeChange}
                className="border p-2 w-full"
              >
                <option value="">เรียกรถทันที</option>
                <option value="Time 1">เรียกรถทันที</option>
                <option value="Time 2">กำหนดเรียก</option>
            </select>
            {/* แสดงเวลา */}
          </div>
        </div>

        <div className="rounded-3xl bg-[#0DC964] fixed bottom-60 left-1/2 transform -translate-x-1/2 z-50">
          <Link to="#">
            <button className=' w-[150px] h-[40px]'>
              <p className='text-white mt-1'>ค้นหารถสไลด์</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default OrderInfoInputPage;
