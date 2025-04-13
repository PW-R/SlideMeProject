import React from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderStatusListUser() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ overflow: "hidden h-screen" }}>
      {/* header */}
      <div className="fixed w-full max-w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <i
          onClick={handleBack}
          className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"
        ></i>
        <h1 className="text-white">สถานะรถสไลด์</h1>
      </div>

      <div className="pt-[115px] flex flex-col h-full">
        {/* พื้นที่แสดง MAP */}
        <div className="relative z-[1] h-[500px] flex-grow">MAP</div>

        <div className="absolute bottom-0 w-full h-[320px] bg-white rounded-t-3xl z-[5000] p-4 overflow-y-auto shadow-[0_-4px_10px_rgba(0,0,0,0.2)] flex flex-col justify-between">
          {/* รายละเอียดรถ */}
          <div className="grid grid-cols-[2fr_1fr] m-0">
            <div className="mx-2">
              <h3 className="font-bold">รถสไลด์ขนาดเล็ก</h3>
              <p className="m-0 leading-6">
                <i className="bi bi-clock-fill text-xl pr-2"></i>
                20 minutes
              </p>
              <p className="m-0 leading-6">
                <i className="bi bi-sign-turn-right-fill text-xl pr-2"></i>
                3.4 km
              </p>
            </div>
            {/* ฝั่งขวา */}
            <div className="mx-2 flex flex-col items-center justify-center">
              <img src="logo-black.svg" className="w-[65px] mb-1" />
              <p className="mb-0">เลขทะเบียน</p>
              <p>จังหวัด</p>
            </div>
          </div>

          {/* เส้นสีเทา */}
          <hr className="border-t-2 border-gray-500 w-full m-0" />

          {/* ข้อมูลคนขับ */}
          <div className="grid grid-cols-[2fr_5fr_1fr_1fr] items-center justify-items-center mb-2 mt-0">
            <img src="driver_logo.svg" className="w-[60px]" />

            <div className="text-left justify-self-start pl-2">
              <p className="font-bold my-2 leading-none">สมใจ สมดีนคร</p>
              <p className="font-bold my-2 leading-none">
                <i className="bi bi-star-fill text-[#FFC30F] pr-1"></i>
                4.9
              </p>
            </div>

            <button
              style={{ borderRadius: "10px" }}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
              //   onClick={() =>
              //     (window.location.href = `tel:${
              //       selectedOffer?.phoneNumber || "+0682538888"
              //     }`)
              //   }
            >
              <i className="bi bi-telephone text-white"></i>
            </button>

            <button
              style={{ borderRadius: "10px" }}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-chat text-white"></i>
            </button>
          </div>

          {/* ปุ่มกลับ  */}
          <div className="flex justify-center items-center">
            <button
              // onClick={handleNextChooseStore}
              style={{ borderRadius: "50px" }}
              className="bg-[#0DC964] text-white w-[120px] h-[30px] font-bold text-l flex items-center justify-center hover:bg-[#43af56] transition"
            >
              กลับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusListUser;
