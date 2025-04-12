import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DCSS() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("details");
  const [isLoadingStoreTab, setIsLoadingStoreTab] = useState(false);

  //   ใช้กับ backend
  //   useEffect(() => {
  //     if (tab === "chooseStore") {
  //       setIsLoadingStoreTab(true);
  //       fetchDataFromBackend().then(() => {
  //         setIsLoadingStoreTab(false);
  //       });
  //     }
  //   }, [tab]);

  //  ปุ่มถัดไป
  const handleNextChooseStore = () => {
    handleTabChange("chooseStore");
  };

  // "รอสักครู่..."
  const handleTabChange = (newTab) => {
    if (newTab === "chooseStore") {
      setIsLoadingStoreTab(true);
      setTab("chooseStore");
      // ตั้ง timeout 3 วินาที
      setTimeout(() => {
        setIsLoadingStoreTab(false);
      }, 3000);
    } else {
      setTab(newTab);
    }
  };

  // ลิ้งไปหน้าไหนวะ
  const handleChooseStore = () => {
    navigate("/PaymentConfirm");
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/OrderInfoInputPage">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">เรียกรถสไลด์</h1>
      </div>

      <div className="pt-[115px] h-[750px] flex flex-col">
        {/* พื้นที่แสดง MAP */}
        <div className="bg-blue-300 h-1/2 flex items-center justify-center">
          MAP
        </div>

        {/* แถบ รายละเอียด, เลือกร้าน */}
        <div className="h-1/2 flex flex-col items-center text-black ">
          <div className="flex justify-between items-center bg-white sticky top-[20px] h-[70px] z-10 px-4 pb-2 w-full rounded-t-3xl">
            <button
              onClick={() => handleTabChange("details")}
              className={`text-black text-base px-4 py-2 rounded-md text-center flex-1 relative transition-all duration-200 ${
                tab === "details"
                  ? "font-bold after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                  : ""
              }`}
            >
              รายละเอียด
            </button>
            <button
              onClick={() => handleTabChange("chooseStore")}
              className={`text-black text-base px-4 py-2 rounded-md text-center flex-1 relative transition-all duration-200 ${
                tab === "chooseStore"
                  ? "font-bold after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                  : ""
              }`}
            >
              เลือกร้าน
            </button>
          </div>

          <div className="w-full">
          {/* ข้อมูล "รายละเอียด" */}
            {tab === "details" && (
              <div className="m-6 mt-0 mb-0">
                <div className="grid grid-cols-[1fr_8fr] gap-4">
                  {/* icon */}
                  <div className="flex flex-col items-start justify-center relative gap-10">
                    <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
                    <div className="absolute top-[1rem] left-[0.6rem] h-[55px] w-[2px] bg-[#D9D9D9] z-0"></div>
                    <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to="/StartPosition" className="w-full">
                      <div className="h-[45px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left">
                        ตำแหน่งต้นทาง
                      </div>
                    </Link>
                    <Link to="/Destination" className="w-full">
                      <div className="h-[45px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left">
                        ตำแหน่งปลายทาง
                      </div>
                    </Link>
                  </div>
                </div>
                {/* เส้นสีเทา */}
                <div className="w-full border-t-2 border-gray-300 mt-2 mb-2"></div>
                {/* รายละเอียดเพิ่มเติม */}
                <div className="grid grid-cols-2 gap-x-2 mb-0">
                  {/* ฝั่งซ้าย */}
                  <div className="flex flex-col space-y-1">
                    <div className="grid grid-cols-[1fr_3fr] items-center">
                      <i className="bi bi-sign-turn-right"></i>
                      <p className="mb-1">3.4 km</p>
                    </div>
                    <div className="grid grid-cols-[1fr_3fr] items-center">
                      <i className="bi bi-car-front"></i>
                      <p className="mb-1">รถสไลด์ขนาดเล็ก</p>
                    </div>
                    <div className="grid grid-cols-[1fr_3fr] items-center">
                      <i className="bi bi-clock"></i>
                      <p className="mb-1">เรียกรถทันที</p>
                    </div>
                  </div>
                  {/* ฝั่งขวา */}
                  <div className="flex flex-col items-end space-y-1">
                    <img className="w-[65px] mb-1" src="logo-black.svg" />
                    <p className="mb-0">เลขทะเบียน</p>
                    <p>จังหวัด</p>
                  </div>
                </div>
                {/* ปุ่มถัดไป  */}
                <div className="flex justify-center items-center mb-0">
                  <button
                    onClick={handleNextChooseStore}
                    style={{ borderRadius: "50px" }}
                    className="bg-[#0DC964] text-white w-[120px] h-[30px] font-bold text-l flex items-center justify-center hover:bg-[#43af56] transition"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}

            {/* ข้อมูล "เลือกร้าน" */}
            {tab === "chooseStore" && (
              <div className="choose-store-content m-6">
                {isLoadingStoreTab ? (
                  <p className="text-gray-500 flex justify-center items-center h-full">
                    รอสักครู่...
                  </p>
                ) : (
                  <div>
                    <div className="grid grid-cols-[1fr_3fr_1fr] items-center">
                      <div>
                        <img
                          className="w-[50px] y-[50px] rounded-full"
                          src="driver_logo.svg"
                        />
                      </div>
                      <div>
                        <p className="text-[#0DC964] text-xl font-bold mb-0">
                          ร้านบัวบางแคร์
                        </p>
                        <p className="mb-0">01/01/2025</p>
                      </div>
                      <div>
                        <p className="text-center mb-0">1500</p>
                        <button
                          onClick={handleChooseStore}
                          style={{ borderRadius: "50px" }}
                          className="bg-[#0DC964] text-white w-[80px] h-[20px] font-medium text-[15px] flex items-center justify-center hover:bg-[#43af56] transition"
                        >
                          เลือก
                        </button>
                      </div>
                    </div>
                    
                    {/* เส้นสีเทา */}
                    <div className="w-full border-t-2 border-gray-300 mt-3 mb-2"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DCSS;
