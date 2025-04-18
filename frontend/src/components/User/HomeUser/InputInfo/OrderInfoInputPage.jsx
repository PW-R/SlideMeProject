import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

function OrderInfoInputPage() {
  const navigate = useNavigate();

  const [start, setStart] = useState(null);
  const [destination, setDestination] = useState(null);
  const [carBrand, setCarBrand] = useState("");
  const [userCarType, setUserCarType] = useState("");
  const [vehicleCondition, setVehicleCondition] = useState("");
  const [carYear, setCarYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [note, setNote] = useState("");
  const [driverCarType, setDriverCarType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [orderDateTime, setOrderDateTime] = useState({
    date: "",
    time: "",
  });
  const [orderBudget, setOrderBudget] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("formData"));
    const storedStart = JSON.parse(sessionStorage.getItem("start"));
    const storedDestination = JSON.parse(sessionStorage.getItem("destination"));
    if (storedStart) setStart(storedStart);
    if (storedDestination) setDestination(storedDestination);

    if (storedData) {
      setCarBrand(storedData.carBrand || "");
      setUserCarType(storedData.userCarType || "");
      setVehicleCondition(storedData.vehicleCondition || "");
      setCarYear(storedData.carYear || "");
      setLicensePlate(storedData.licensePlate || "");
      setNote(storedData.note || "");
      setDriverCarType(storedData.driverCarType || "");
      setServiceType(storedData.serviceType || "");
      setOrderDateTime(storedData.orderDateTime || { date: "", time: "" });
      setOrderBudget(storedData.orderBudget || "");
    }
  }, []);

  useEffect(() => {
    const formData = {
      carBrand,
      userCarType,
      vehicleCondition,
      carYear,
      licensePlate,
      note,
      driverCarType,
      serviceType,
      orderDateTime,
      orderBudget,
    };
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [
    carBrand,
    userCarType,
    vehicleCondition,
    carYear,
    licensePlate,
    note,
    driverCarType,
    serviceType,
    orderDateTime,
    orderBudget,
  ]);

  const handleSearchSlideCar = async () => {
    let dateTime = null;
    if (serviceType === "กำหนดเรียก") {
      if (!orderDateTime.date || !orderDateTime.time) {
        alert("กรุณาเลือกวันและเวลาที่ต้องการเรียกรถ");
        return;
      }
      dateTime = `${orderDateTime.date}T${orderDateTime.time}:00`;
    }

    const InputOrderData = {
      startLat: start?.lat,
      startLng: start?.lng,
      endLat: destination?.lat,
      endLng: destination?.lng,
      carBrand,
      userCarType,
      vehicleCondition,
      carYear,
      licensePlate,
      note,
      serviceType,
      driverCarType,
      orderDateTime: serviceType === "กำหนดเรียก" ? dateTime : null,
      orderBudget,
    };

    sessionStorage.setItem("slideCarInfo", JSON.stringify(InputOrderData));

    try {
      const res = await axios.post(
        "http://localhost:3000/api/InputOrder",
        InputOrderData
      );
      const orderId = res.data.orderId;
      console.log("✅ Data saved");
      navigate(`/DCSS/${orderId}`);
    } catch (err) {
      console.error("❌ Error saving data:", err);
      alert("ไม่สามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ได้");
    }
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

      <div className="pt-[115px] m-6">
        {/* เลือกตำแหน่ง */}
        <div className="grid grid-cols-[1fr_8fr] gap-4">
          {/* icon */}
          <div className="flex flex-col items-start justify-center relative gap-15">
            <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
            <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
            <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
          </div>
          {/* ปุ่ม */}
          <div className="flex flex-col gap-4 ">
            <button
              style={{ borderRadius: "15px" }}
              onClick={() => navigate("/StartPosition")}
              className="h-[52px] bg-gray-100 text-gray-600 px-3 py-3 text-left w-[270px] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {start?.name ? start.name : "ตำแหน่งต้นทาง"}
            </button>
            <button
              style={{ borderRadius: "15px" }}
              onClick={() => navigate("/Destination")}
              className="h-[52px] bg-gray-100 text-gray-600 px-3 py-3 text-left w-[270px] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {destination?.name ? destination.name : "ตำแหน่งปลายทาง"}
            </button>
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
                id="carBrand"
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                placeholder="ยี่ห้อรถ"
                className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                id="userCarType"
                value={userCarType}
                onChange={(e) => setUserCarType(e.target.value)}
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
              value={vehicleCondition}
              onChange={(e) => setVehicleCondition(e.target.value)}
              className="block h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-500 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none w-1/2"
            >
              <option value="">สภาพยานพาหนะ</option>
              <option value="รถชน">รถชน</option>
              <option value="ยางรั่ว">ยางรั่ว</option>
              <option value="รถดับ">รถดับ</option>
            </select>
            <input
              type="number"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              placeholder="ปีที่รถผลิต"
              className="block w-1/2 rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="เลขทะเบียน"
              className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              value={driverCarType}
              onChange={(e) => setDriverCarType(e.target.value)}
              className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-500 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">เลือกรถ</option>
              <option value="รถสไลด์ขนาดเล็ก">รถสไลด์ขนาดเล็ก</option>
              <option value="รถสไลด์ขนาดกลา">รถสไลด์ขนาดกลาง</option>
              <option value="รถสไลด์ขนาดใหญ่">รถสไลด์ขนาดใหญ่</option>
              <option value="รถสไลด์บรรทุ">รถสไลด์บรรทุก</option>
            </select>
          </div>
        </div>

        {/* เลือกการรับบริการ */}
        <div className="mb-2 mt-2">
          <label className="block text-xl/6 font-semibold text-black-900">
            เวลา
          </label>
          <div className="mt-1 mb-2">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-500 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">เลือกเวลา</option>
              <option value="เรียกทันที">เรียกรถทันที</option>
              <option value="กำหนดเรียก">กำหนดเรียก</option>
            </select>
          </div>
        </div>

        {/* ถ้าเลือก "กำหนดเรียก" */}
        {serviceType === "กำหนดเรียก" && (
          <div className="mb-2 mt-3">
            <input
              type="date"
              value={orderDateTime.date}
              onChange={(e) =>
                setOrderDateTime((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f]"
            />
            <input
              type="time"
              value={orderDateTime.time}
              onChange={(e) =>
                setOrderDateTime((prev) => ({ ...prev, time: e.target.value }))
              }
              className="w-[320px] h-[52px] text-[18px] bg-gray-100 text-gray-600 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33b44f] mt-2"
            />
          </div>
        )}

        {/* กรอกจำนวนเงิน */}
        <div className="mb-2 mt-2">
          <label className="block text-xl/6 font-semibold text-black-900">
            จำนวนเงิน
          </label>
          <input
            type="number"
            value={orderBudget}
            onChange={(e) => setOrderBudget(e.target.value)}
            placeholder="กรอกจำนวนเงิน"
            className="block w-full h-[52px] rounded-xl px-3.5 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

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
  );
}
export default OrderInfoInputPage;
