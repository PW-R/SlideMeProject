import { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
// import { usePosition } from "../../MAP/PositionContext";
import axios from "axios";

import MapStatus from "../../MAP/MapStatus";
import L from "leaflet";

function OrderStatusListUser() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // รับ orderId จาก URL
  const [orderData, setOrderData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  
  const [origin, setOrigin] = useState({ lat: null, lng: null });
  const [destination, setDestination] = useState({ lat: null, lng: null });
  console.log("Origin:", origin);
  console.log("Destination:", destination);

  const selectedDriverName = sessionStorage.getItem("selectedDriverName");
  const selectedShopLat = sessionStorage.getItem("selectedShop_Lat");
  const selectedShopLng = sessionStorage.getItem("selectedShop_Lng");
  
  console.log("Parsed ShopLat:", selectedShop_Lat, "ShopLng:", selectedShop_Lng);

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
    if (selectedShopLat && selectedShopLng) {
      const lat = parseFloat(selectedShopLat);
      const lng = parseFloat(selectedShopLng);

      setOrigin({ lat, lng });
      reverseGeocode(lat, lng).then(setStartAddress);
    }
  }, [selectedShopLat, selectedShopLng]);

  useEffect(() => {
    if (orderData) {
      const { End_Lat, End_Lng } = orderData;

      // ตรวจสอบว่า End_Lat และ End_Lng มีค่าและไม่เป็น null หรือ undefined
      if (End_Lat && End_Lng) {
        // แปลงจาก string เป็น number
        const lat = parseFloat(End_Lat);
        const lng = parseFloat(End_Lng);

        if (!isNaN(lat) && !isNaN(lng)) {
          // ตั้งค่า destination
          setDestination({ lat, lng });

          // ทำการ reverseGeocode เพื่อหาที่อยู่
          reverseGeocode(lat, lng).then((address) => {
            setDestination((prev) => ({ ...prev, address }));
          });
        } else {
          console.error(
            "ค่าของ End_Lat หรือ End_Lng ไม่ถูกต้อง:",
            End_Lat,
            End_Lng
          );
        }
      } else {
        console.error("ข้อมูล End_Lat หรือ End_Lng ไม่สมบูรณ์");
      }
    }
  }, [orderData]);
  
  console.log("ข้อมูลที่ได้จาก API:", orderData);


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
        <div className="relative z-[1] h-[500px] flex-grow">
          <MapStatus
            origin={origin}
            destination={destination}
            onRouteCalculated={(data) => {
              console.log("เส้นทางที่คำนวณได้:", data);
            }}
          />
        </div>

        <div className="absolute bottom-0 w-full h-[270px] bg-white rounded-t-3xl z-[5000] p-6 overflow-y-auto shadow-[0_-4px_10px_rgba(0,0,0,0.2)] flex flex-col gap-3">
          {/* รายละเอียดรถ */}
          <div className="grid grid-cols-[2fr_1fr] m-0">
            {/* ฝั่งซ้าย */}
            <div className="mx-2">
              <h4 className="font-bold">
                <i className="bi bi-car-front pr-2"></i>
                {orderData?.DriverCar_type}
              </h4>
              <h4 className="m-0 leading-6">
                <i className="bi bi-clock text-xl pr-2"></i>
                {orderData?.ServiceType}
              </h4>
            </div>
            {/* ฝั่งขวา */}
            <div className="mx-2 flex flex-col items-center justify-center">
              <img src="logo-black.svg" className="w-[80px]" />
            </div>
          </div>

          {/* เส้นสีเทา */}
          <hr className="border-t-2 border-gray-500 w-full mt-0 mb-0" />

          {/* ข้อมูลคนขับ */}
          <div className="grid grid-cols-[2fr_5fr_1fr_1fr] items-center justify-items-center mb-2 mt-0">
            <img src="driver_logo.svg" className="w-[60px]" />
            <div className="text-left justify-self-start pl-2">
              <h5 className="font-bold my-2 leading-none">
                {orderData?.driverName || "ยังไม่มีข้อมูลคนขับ"}
              </h5>
            </div>

            <button
              onClick={() => navigate("/UserMassage")}
              style={{ borderRadius: "10px" }}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-telephone text-white"></i>
            </button>

            <button
              onClick={() => navigate("/UserMassage")}
              style={{ borderRadius: "10px" }}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-chat text-white"></i>
            </button>
          </div>

          {/* ปุ่มกลับ  */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/ListPendingOrder")}
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
