import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { usePosition } from "../../MAP/PositionContext";
import axios from "axios";

import MapDistance from "../../MAP/MapDistance";
import L from "leaflet";

function DCSS() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // รับ orderId จาก URL
  const [orderData, setOrderData] = useState(null);

  const { origin, destination } = usePosition();
  const location = useLocation();
  const mapContainerRef = useRef(null);

  const [tab, setTab] = useState("details");
  const [nearbyStores, setNearbyStores] = useState([]);

  const [isLoadingStoreTab, setIsLoadingStoreTab] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStores, setIsLoadingStores] = useState(false);

  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [AstartAddress, setAStartAddress] = useState("");
  const [AendAddress, setAEndAddress] = useState("");

  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState({
    distance: null,
    duration: null,
  });

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
        }
      );

      console.log("ที่อยู่ที่ได้จาก reverse geocode:", res.data.display_name); // พิมพ์ที่อยู่ที่ได้
      return res.data.display_name; // ที่อยู่แบบเต็ม
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return "ไม่พบที่อยู่";
    }
  };

  useEffect(() => {
    if (orderData) {
      console.log("ข้อมูลที่ได้จาก API:", orderData);
      const { startLat, startLng, endLat, endLng, Start_Lat, Start_Lng, End_Lat, End_Lng } =
        orderData;
      console.log("StartLat:", startLat, "StartLng:", startLng); // Check values
      console.log("EndLat:", endLat, "EndLng:", endLng);

      if (startLat && startLng) {
        reverseGeocode(startLat, startLng).then(setStartAddress);
      }

      if (endLat && endLng) {
        reverseGeocode(endLat, endLng).then(setEndAddress);
      }

      if (Start_Lat && Start_Lng) {
        reverseGeocode(Start_Lat, Start_Lng).then(setAStartAddress);
      }

      if (End_Lat && End_Lng) {
        reverseGeocode(End_Lat, End_Lng).then(setAEndAddress);
      }
    }
  }, [orderData]);


  // ดึงข้อมูลคำสั่งซื้อจาก backend
  useEffect(() => {
    console.log("orderId:", orderId);
    if (orderId) {
      axios
        .get(`http://localhost:3000/api/input-order/order/${orderId}`)
        .then((response) => {
          console.log("ข้อมูลคำสั่งซื้อ:", response.data);
          setOrderData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
          setIsLoading(false);
        });
    }
  }, [orderId]);

// ดึงข้อมูลร้านที่อยู่ใกล้ // เช็คทุก 3 วินาที
// ดึงข้อมูลร้านที่อยู่ใกล้ // เช็คทุก 3 วินาที
useEffect(() => {
  if (!orderId) return;

  const interval = setInterval(() => {
    axios
      .get(`http://localhost:3000/api/nearby-shops/${orderId}`)
      .then((response) => {
        const allStores = response.data.stores;

        // 🔍 Filter stores that have offerStatus === "ตกลง"
        const agreedStores = allStores.filter((shop) => shop.offerStatus === "ตกลง")


        // Log each store found with offerStatus "ตกลง"
        console.log("อัปเดตร้านที่ตกลง:", agreedStores);
        
        // Log each store that is being processed
        agreedStores.forEach((store) => {
          console.log("Current store found:", store); // Logs each store
        });

        setNearbyStores(agreedStores); // Update only "ตกลง" stores
      })
      .catch((error) => {
        console.error("Error polling nearby stores:", error);
      });
  }, 3000); // 🔁 Keep checking every 3 seconds

  return () => clearInterval(interval); // 🧹 Clean up on unmount or orderId change
}, [orderId]);




// "เปลี่ยนแท็บ รายละเอียด / เลือกร้าน "
const handleTabChange = (newTab) => {
  setTab(newTab);
  if (newTab === "chooseStore") {
    setIsLoadingStores(true);
  }
};

  // กดไปดูข้อมูลร้าน
  const handleChooseStore = async (store) => {
    sessionStorage.setItem("selectedShop_Name", store.name);
    sessionStorage.setItem("selectedShop_Info", store.shop_info);
    sessionStorage.setItem("selectedShop_service", store.shop_service);
    sessionStorage.setItem("selectedShop_Phone", store.shop_phone);

    sessionStorage.setItem("selectedShop_Lat", store.lat);
    sessionStorage.setItem("selectedShop_Lng", store.lng);
    navigate(`/ShopDetail/${orderId}`);
  };

  // ปุ่ม เลือก ( ไปหน้าถัดไป )
  const handleSelectShops = async (store) => {
    if (store.offerstatus !== "ตกลง") {
      alert("ยังไม่สามารถเลือกร้านนี้ได้ เพราะยังไม่ได้ตกลงราคา");
      return;
    }
  
    const driverId = Number(store.Driver_ID);
    console.log("Driver ID ที่ส่งไป:", driverId, typeof driverId);
  
    if (isNaN(driverId) || driverId <= 0) {
      console.error("ไม่มี Driver_ID หรือ ID ไม่ถูกต้อง");
      alert("ไม่พบข้อมูลคนขับ");
      return;
    }
  
    try {
      await axios.post(`http://localhost:3000/api/select-driver/${orderId}`, {
        Driver_ID: driverId,
      });
  
      console.log("✅ บันทึกคนขับเรียบร้อย");
  
      // ส่งข้อมูล
      sessionStorage.setItem("selectedTotalPrice", store.total_price);
      sessionStorage.setItem("selectedEquipmentPrice", store.equipment);
      sessionStorage.setItem("selectedDriverName", store.driver_name);
      sessionStorage.setItem("selectedDriverYear", store.driver_year);
      sessionStorage.setItem("selectedShop_Lat", store.lat);
      sessionStorage.setItem("selectedShop_Lng", store.lng);
      sessionStorage.setItem("selectedShop_Phone", store.shop_phone);
  
      navigate(`/PaymentConfirm/${orderId}`);
    } catch (err) {
      console.error("❌ บันทึกข้อมูลไม่สำเร็จ", err);
      alert("เกิดข้อผิดพลาดในการเลือกร้าน / คนขับ");
    }
  };
  

  useEffect(() => {
    console.log("Origin:", origin); // ตรวจสอบค่าของ origin
    console.log("Destination:", destination); // ตรวจสอบค่าของ destination

    // ถ้าค่าของ origin หรือ destination ยังไม่ถูกตั้งค่าให้แสดงข้อความ
    if (!origin || !destination) {
      console.log("ยังไม่ได้ตั้งค่าตำแหน่งต้นทางหรือปลายทาง");
    }
  }, [origin, destination]);

  useEffect(() => {
    if (origin?.lat && origin?.lng && destination?.lat && destination?.lng) {
      reverseGeocode(origin.lat, origin.lng).then(setStartAddress);
      reverseGeocode(destination.lat, destination.lng).then(setEndAddress);
    }
  }, [origin, destination]);

  useEffect(() => {
    console.log("🔁 routeInfo updated:", routeInfo);
  }, [routeInfo]);

  //  ปุ่มถัดไป
  const handleNextChooseStore = () => {
    handleTabChange("chooseStore");
  };

  console.log("origin MAP:", origin);
  console.log("destination MAP:", destination);

  const handleRouteCalculated = (routeData) => {
    console.log("📦 Route received in DCSS:", routeData);
    setRoute(routeData); // เก็บข้อมูลใน state
  };

  useEffect(() => {
    if (route && route.distance) {
      console.log("Route calculated:", route.distance); // ตรวจสอบว่า route.distance ถูกต้อง
    } else {
      console.log("ยังไม่มีข้อมูลเส้นทาง");
    }
  }, [route]);

  if (!origin?.position?.lat || !destination?.position?.lat) {
    return <p>Loading map...</p>; // หรือแสดง loading spinner
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[50]">
        <Link to="/OrderInfoInputPage">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">เรียกรถสไลด์</h1>
      </div>

      <div className="pt-[115px] flex flex-col h-full">
        {/* MAP */}
        <div className="relative z-[10] h-[500px]">
          <MapDistance
            onRouteCalculated={handleRouteCalculated}
            // originLat={origin.position.lat}
            // originLng={origin.position.lng}
            // destinationLat={destination.position.lat}
            // destinationLng={destination.position.lng}
          />
        </div>

        {/* แถบ รายละเอียด / เลือกร้าน */}
        <div className="absolute bottom-0 w-full h-[370px] bg-white  z-[5000]">
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

          <div className="px-6">
            {/* "รายละเอียด" */}
            {tab === "details" && orderData && (
              <div className="mt-2">
                <div className="grid grid-cols-[1fr_8fr] gap-2">
                  {/* Icons */}
                  <div className="flex flex-col items-start justify-center relative gap-10">
                    <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full z-20"></div>
                    <div className="absolute top-[1rem] left-[0.6rem] h-[55px] w-[2px] bg-[#D9D9D9] z-0"></div>
                    <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] z-10"></i>
                  </div>
                  {/* ตำแหน่ง */}
                  <div className="flex flex-col gap-2">
                    <div className="h-[45px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {AstartAddress || "ตำแหน่งต้นทาง"}
                    </div>
                    <div className="h-[45px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {AendAddress || "ตำแหน่งปลายทาง"}
                    </div>
                  </div>
                </div>
                {/* เส้นแบ่ง */}
                <div className="w-full border-t-2 border-gray-300 mt-3 mb-2"></div>

                {/* รายละเอียดเพิ่มเติม */}
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="flex flex-col space-y-1">
                    <div className="grid grid-cols-[1fr_3fr] items-center">
                      <i className="bi bi-car-front"></i>
                      <p className="mb-1">{orderData?.DriverCar_type}</p>
                    </div>
                    <div className="grid grid-cols-[1fr_3fr] items-center">
                      <i className="bi bi-clock"></i>
                      <p className="mb-1">{orderData?.serviceType}</p>
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
        {/* Display only stores where the offer status is 'ตกลง' */}
        {nearbyStores.length > 0 ? (
          nearbyStores
            .filter(store => store.offerStatus === "ตกลง") // Filter stores where offerstatus is "ตกลง"
            .map((store) => (
              <div
                key={store.driverId}
                className="grid grid-cols-[1fr_3fr_1fr] items-center mb-3 mt-3"
              >
                <div>
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src="driver_logo.svg"
                    alt="Driver"
                  />
                </div>
                <div>
                  <p>{store.driver_name}</p>
                  <p>{store.shop_info}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleSelectShops(store)}
                    className="bg-[#0DC964] text-white px-4 py-2 rounded-md"
                  >
                    เลือกร้าน
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center">ไม่พบร้านที่มีการตกลงราคา</p> // Message if no stores have accepted the offer
        )}
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