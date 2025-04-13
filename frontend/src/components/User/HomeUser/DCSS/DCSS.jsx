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
      }, 2000);
    } else {
      setTab(newTab);
    }
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

      <div className="pt-[115px] flex flex-col h-full">
        {/* MAP */}
        <div className="relative z-[1] h-[500px] flex-grow">MAP</div>

        {/* รายละเอียด / เลือกร้าน */}
        <div className="absolute bottom-0 w-full h-[370px] bg-white rounded-t-3xl z-[5000] overflow-y-auto shadow-[0_-4px_10px_rgba(0,0,0,0.2)] flex flex-col">
          <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-2">
            <div className="flex justify-between items-center w-full">
              <button
                onClick={() => handleTabChange("details")}
                className={`text-black text-base px-4 py-2 rounded-md text-center flex-1 relative transition-all duration-200 ${
                  tab === "details"
                    ? "font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                    : ""
                }`}
              >
                รายละเอียด
              </button>
              <button
                onClick={() => handleTabChange("chooseStore")}
                className={`text-black text-base px-4 py-2 rounded-md text-center flex-1 relative transition-all duration-200 ${
                  tab === "chooseStore"
                    ? "font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                    : ""
                }`}
              >
                เลือกร้าน
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-6">
            {/* "รายละเอียด" */}
            {tab === "details" && (
              <div className="mt-2">
                <div className="grid grid-cols-[1fr_8fr] gap-4">
                  {/* Icons */}
                  <div className="flex flex-col items-start justify-center relative gap-10">
                    <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full z-20"></div>
                    <div className="absolute top-[1rem] left-[0.6rem] h-[55px] w-[2px] bg-[#D9D9D9] z-0"></div>
                    <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] z-10"></i>
                  </div>
                  {/* ตำแหน่ง */}
                  <div className="flex flex-col gap-2">
                    <div className="h-[45px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left">
                      ตำแหน่งต้นทาง
                    </div>
                    <div className="h-[45px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left">
                      ตำแหน่งปลายทาง
                    </div>
                  </div>
                </div>

                {/* เส้นแบ่ง */}
                <div className="w-full border-t-2 border-gray-300 mt-3 mb-2"></div>

                {/* รายละเอียดเพิ่มเติม */}
                <div className="grid grid-cols-2 gap-x-4">
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
                  <div className="flex justify-end items-center">
                    <img className="w-[90px]" src="logo-black.svg" alt="Logo" />
                  </div>
                </div>

                {/* ปุ่มถัดไป */}
                <div className="flex justify-center mt-2">
                  <button
                    style={{ borderRadius: "50px" }}
                    onClick={handleNextChooseStore}
                    className="bg-[#0DC964] text-white w-[120px] h-[35px] font-bold text-base rounded-full hover:bg-[#43af56] transition"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}

            {/* "เลือกร้าน" */}
            {tab === "chooseStore" && (
              <div className="mt-2">
                {isLoadingStoreTab ? (
                  <p className="text-gray-500 text-center">รอสักครู่...</p>
                ) : (
                  <>
                    <div className="grid grid-cols-[1fr_3fr_1fr] items-center mb-3">
                      <div>
                        <img
                          className="w-[50px] h-[50px] rounded-full object-cover"
                          src="driver_logo.svg"
                          alt="Driver"
                        />
                      </div>
                      <div>
                        <button
                          style={{ fontSize: "20px" }}
                          // onClick={handleChooseStore}
                          className="text-[#0DC964] font-bold mb-0"
                        >
                          ร้านบัวบางแคร์
                        </button>
                        <p className="mb-0 text-sm text-gray-600">01/01/2025</p>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <p className="mb-0 font-semibold">1500</p>
                        <button
                          style={{ borderRadius: "50px" }}
                          onClick={() => navigate("/PaymentConfirm")}
                          className="bg-[#0DC964] text-white w-[80px] h-[28px] text-sm rounded-full hover:bg-[#43af56] transition"
                        >
                          เลือก
                        </button>
                      </div>
                    </div>

                    <div className="w-full border-t-2 border-gray-300"></div>
                  </>
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
