import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function JoinStore() {
  const [storeName, setStoreName] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [result, setResult] = useState("");
  const [foundStore, setFoundStore] = useState(null);
  const [requestStatus, setRequestStatus] = useState("idle"); // idle, pending, approved
  const navigate = useNavigate();

  const dummyStores = [
    {
      name: "ร้าน",
      code: "123",
      logo: "advert_car1.svg",
    }
  ];

  const handleSearch = () => {
    const found = dummyStores.find(
      (store) =>
        store.name === storeName.trim() && store.code === storeCode.trim()
    );

    if (found) {
      setFoundStore(found);
      setResult("");
    } else {
      setResult("...ขออภัยไม่พบร้านที่คุณค้นหา...");
      setFoundStore(null);
    }
  };

  const handleJoinStore = () => {
    setRequestStatus("pending");

    // จำลองการรอเจ้าของร้านกด "อนุมัติ" ภายใน 5 วิ
    setTimeout(() => {
      setRequestStatus("approved");
      navigate("/HomeCustomize");
    }, 5000);
  };

  return (
    <AppWrapper>
      <div>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
  {/* ปุ่มย้อนกลับ */}
  <Link to="/CreateAndjoin">
    <i className="bi bi-chevron-left text-white text-2xl absolute left-4 bottom-4"></i>
  </Link>

  {/* หัวข้อหน้า */}
  <div className="text-center">
    <h1 className="text-white font-bold text-xl">Join Store</h1>
  </div>
</div>

        <div className="flex justify-center items-center bg-white">
          <div className="flex flex-col gap-4 p-4 items-center">
            <input
              type="text"
              placeholder="ชื่อร้าน"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-[320px] h-[45px] px-4 py-2 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500"
            />

            <input
              type="text"
              placeholder="รหัสร้าน"
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value)}
              className="w-[320px] h-[45px] px-4 py-2 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-[#0dc964] hover:bg-[#24b23e] text-white font-bold w-[200px] h-[45px] rounded-[15px] transition"
            >
              ค้นหาร้าน
            </button>

            {result && (
              <p className="text-center text-[15px] mt-2 text-red-500">{result}</p>
            )}

            {foundStore && (
              <div className="flex flex-col items-center mt-2 gap-2">
                <img
                  src={foundStore.logo}
                  alt="store-logo"
                  className="w-[60px] h-[60px] rounded-full shadow-md"
                />
                <p className="text-lg font-semibold text-gray-800">{foundStore.name}</p>

                {requestStatus === "idle" && (
                  <button
                    onClick={handleJoinStore}
                    className="bg-[#0dc964] hover:bg-[#24b23e] text-white font-bold w-[200px] h-[40px] rounded-[15px] transition"
                  >
                    เข้าร่วมร้าน
                  </button>
                )}

                {requestStatus === "pending" && (
                  <p className="text-black-600 animate-pulse">⏳ รอเจ้าของร้านอนุมัติ...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-gray-300 shadow-xl overflow-auto relative bg-white">
      {children}
    </div>
  );
}

export default JoinStore;
