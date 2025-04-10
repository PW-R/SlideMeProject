import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { TextField } from "@mui/material";
// import dayjs from "dayjs"; // ใช้ dayjs ในการจัดการวันที่

function OrderInfoInputPage() {
  const [selectedVehicle_condition, setSelectedVehicle_condition] =
    useState("");
  const [selectedDriverCar_type, setSelectedDriverCar_type] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");

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

  // เลือกวันที่
  // const handleDateChange = (newDate) => {
  //   setSelectedDate(newDate);
  // };
  // const currentYear = dayjs().year(); // ดึงปีปัจจุบัน

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
            <div className="flex flex-col items-start justify-center relative gap-10">
              <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
              <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
              <div className="absolute top-[1.5rem] left-[0.6rem] h-[50px] w-[2px] bg-[#D9D9D9] z-0"></div>
            </div>
            <div className="flex flex-col gap-4 ">
              <Link to="#" className="w-full">
                <div className="rounded-lg bg-gray-300 text-black px-2 py-2 text-left">
                  ตำแหน่งต้นทาง
                </div>
              </Link>
              <Link to="#" className="w-full">
                <div className="rounded-lg bg-gray-300 text-black px-2 py-2 text-left">
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
                  className="block w-full rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="UserCar_type"
                  placeholder="รุ่นรถ"
                  className="block w-full rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                className="block rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none w-1/2"
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
                className="block w-1/2 rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                className="block w-full rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <textarea
                id="Note"
                placeholder="รายละเอียดเพิ่มเติม"
                className="block w-full h-20 resize-none rounded-lg bg-white px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                className="block w-full rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                className="block w-full rounded-lg px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">เลือกเวลา</option>
                <option value="Time 1">เรียกรถทันที</option>
                <option value="Time 2">กำหนดเรียก</option>
              </select>
            </div>
          </div>

          {/* เลือก "กำหนดเรียก" */}
          {selectedTime === "Time 2" && (
            <div className="mb-2 mt-2">
              {/* <DesktopDatePicker
                inputFormat="DD/MM/YYYY"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </div>
          )}

          {/* ปุ่มค้นหา */}
          <Link to="#" className="block w-[150px] h-[40px] mx-auto mt-4">
            <div className="rounded-[20px] bg-[#0DC964] text-white w-full h-full font-bold text-l flex items-center justify-center hover:bg-[#43af56] transition">
              ค้นหารถสไลด์
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default OrderInfoInputPage;
