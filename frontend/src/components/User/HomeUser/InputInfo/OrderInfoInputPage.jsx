import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

function OrderInfoInputPage() {
  // State เพื่อเก็บค่าที่เลือก
  const [selectedVehicle_condition, setSelectedVehicle_condition] =
    useState("");
  const [selectedDriverCar_type, setSelectedDriverCar_type] = useState("");

  // เลือกสภาพยานพาหนะ
  const handleVehicleConditionChange = (event) => {
    setSelectedVehicle_condition(event.target.value);
  };

  // เลือกประเภทรถบริการ
  const handleDriverCarTypeChange = (event) => {
    setSelectedDriverCar_type(event.target.value);
  };

  // const currentYear = dayjs().year(); // ดึงปีปัจจุบัน

  return (
    <div>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/UserLayout/UserHome">
          <i class="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">ค้นหาสถานที่</h1>
      </div>

      {/* เลือกตำแหน่ง */}
      <div className="user-order-location-container">
        <div className="user-order-location-icon">
          <div className="user-order-location-circle"></div>
          <i className="bi bi-geo-alt"></i>
        </div>
        <div className="user-order-location">
          <div>
            <button>ตำแหน่งต้นทาง</button>
          </div>
          <div>
            <button>ตำแหน่งปลายทาง</button>
          </div>
        </div>

        <div className="user-order-cartype">
          <h5>ประเภทรถของคุณ</h5>
          <input type="text" id="Car_Brand" placeholder="ยี่ห้อรถ" /> <br />
          <input type="text" id="UserCar_type" placeholder="รุ่นรถ" />
        </div>

        <div className="user-order-carInformation">
          <h5>ข้อมูลรถ</h5>
          <div className="user-order-Vehicle_condition">
            <select
              value={selectedVehicle_condition} // ให้เลือกค่าที่เก็บใน state
              onChange={handleVehicleConditionChange} // เมื่อมีการเปลี่ยนแปลงเลือกค่าใหม่
              className="border p-2"
            >
              <option value="">สภาพยานพาหนะ</option>
              <option value="Option 1">รถชน</option>
              <option value="Option 2">ยางรั่ว</option>
              <option value="Option 3">รถดับ</option>
            </select>
          </div>
          {/* ปีที่รถผลิต */}
          {/* <div>
                  <DatePicker
                      label="Years in descending order"
                      maxDate={currentYear}
                      openTo="year"
                      views={['year', 'month']}
                      yearsOrder="desc"
                      sx={{ minWidth: 250 }}
                  />
              </div> */}
          <input type="text" id="License_Plate" placeholder="เลขทะเบียน" />{" "}
          <br />
          <input type="text" id="Note" placeholder="รายละเอียดเพิ่มเติม" />
        </div>

        <div className="user-order-DriverCar_type">
          <h4>ประเภทรถบริการ</h4>
          <div className="user-order-select-DriverCar_type">
            <select
              value={selectedDriverCar_type} // ให้เลือกค่าที่เก็บใน state
              onChange={handleDriverCarTypeChange} // เมื่อมีการเปลี่ยนแปลงเลือกค่าใหม่
              className="border p-2"
            >
              <option value="">เลือกรถ</option>
              <option value="DriverCar_type 1">รถสไลด์ขนาดเล็ก</option>
              <option value="DriverCar_type 2">รถสไลด์ขนาดกลาง</option>
              <option value="DriverCar_type 3">รถสไลด์ขนาดใหญ่</option>
              <option value="DriverCar_type 4">รถสไลด์บรรทุก</option>
            </select>
          </div>
        </div>

        <div>
          <h4>เลือกเวลา</h4>
          <p>เรียกรถทันที</p>
          <p>กำหนดเรียก</p>
        </div>

        <div>
          <Link to="#">
            <button>ค้นหารถสไลด์</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default OrderInfoInputPage;
