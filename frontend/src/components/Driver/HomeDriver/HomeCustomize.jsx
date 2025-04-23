import { useEffect, useState } from "react";

function HomeCustomize() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placeName, setPlaceName] = useState(null); // ✅ ย้ายขึ้นบนสุด
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/store/my-store", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setStore(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("โหลดข้อมูลร้านล้มเหลว:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (store?.ShopImages?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % store.ShopImages.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [store]);

  useEffect(() => {
    if (store?.Shop_Lat && store?.Shop_Lng) {
      fetchReverseGeocode(store.Shop_Lat, store.Shop_Lng);
    }
  }, [store?.Shop_Lat, store?.Shop_Lng]);

  const fetchReverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await res.json();
      setPlaceName(data.display_name);
    } catch (err) {
      console.error("ดึงชื่อสถานที่ล้มเหลว:", err);
    }
  };

  const toggleStatus = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/store/my-store/toggle-status",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStore((prev) => ({
          ...prev,
          Shop_Status: prev.Shop_Status === "open" ? "closed" : "open",
        }));
        alert("เปลี่ยนสถานะร้านแล้ว");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };

  if (loading) return <p>กำลังโหลด...</p>;
  if (!store) return <p>ไม่พบข้อมูลร้าน</p>;

  


  return (
    <div>
      <div style={{ overflow: "hidden" }} className="pb-32">
        <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
          <h1 className="text-white">HOME</h1>
        </div>

        <div className="pt-[150px] flex flex-col items-center ">
          {/* ✅ Toggle Switch */}
          <div className="form-check form-switch mt-3">
            <label className="form-check-label" htmlFor="switchCheckDefault">
              Store status:
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
              checked={store.Shop_Status === "open"}
              onChange={toggleStatus}
              disabled={user.role !== "manager"}
            />
          </div>

          {/* ✅ Auto Slide Image Section */}
          <div className="w-full h-[220px] mt-4 overflow-hidden">
            {store.ShopImages?.length > 0 && (
              <img
                src={`http://localhost:3000${store.ShopImages[currentIndex]}`}
                alt="ร้าน"
                className="w-full h-full object-cover rounded-md transition-all duration-700"
              />
            )}
          </div>

          {/* 💬 เกี่ยวกับเรา */}
          <div className="w-[80%] border-2 border-[#6FBB84] rounded-[15px] p-4 mt-4">
            <div className="flex items-center gap-2 mb-1 ">
              <i className="bi bi-shop text-[#0dc964] mt-[-11px]"></i>
              <p className="font-medium">เกี่ยวกับเรา:</p>
            </div>
            <p className="text-sm">{store.Shop_Info}</p>
          </div>

          {/* 🛠️ บริการของเรา */}
          <div className="w-[80%] border-2 border-[#6FBB84] rounded-[15px] p-4 mt-4">
            <div className="flex items-center gap-2 mb-1">
              <i className="bi bi-gear-fill text-[#0dc964] text-lg mt-[-11px]"></i>
              <p className="font-medium">บริการของเรา:</p>
            </div>
            <p className="text-sm">{store.Shop_service}</p>
          </div>

          {/* 📍 ที่อยู่และเบอร์โทร */}
          <div className="w-[80%] border-2 border-[#6FBB84] rounded-[15px] p-4 mt-4">
            {/* ที่อยู่ร้าน */}
            <div className="flex items-center gap-2 mb-1">
              <i className="bi bi-geo-alt-fill text-[#0dc964] text-lg mt-[-11px]"></i>
              <p className="font-medium">ที่อยู่ร้าน:</p>
            </div>

            <p className="text-sm mb-2">{placeName || store.Shop_Location}</p>

            <a
              href={`https://www.google.com/maps?q=${store.Shop_Lat},${store.Shop_Lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline ml-6"
            >
              ดูพิกัดบน Google Maps
            </a>

            {/* เบอร์โทร */}
            <div className="flex items-center gap-2 mt-2">
              <i className="bi bi-telephone-fill text-[#0dc964] text-lg mt-[-11px]"></i>
              <p className="font-medium">เบอร์โทรร้าน:</p>
              <p className="text-sm">{store.Shop_Phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCustomize;
