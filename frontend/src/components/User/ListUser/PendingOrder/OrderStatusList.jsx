import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { usePosition } from "../../MAP/PositionContext";
import MapStatus from "../../MAP/MapStatus";

function OrderStatusListUser() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  const [origin, setOrigin] = useState({ lat: null, lng: null });
  const [destination, setDestination] = useState({ lat: null, lng: null });

  const selectedDriverName = sessionStorage.getItem("selectedDriverName") || "คุณสมหมาย";
  const selectedShopLat = sessionStorage.getItem("selectedShop_Lat");
  const selectedShopLng = sessionStorage.getItem("selectedShop_Lng");

  // Mock reverse geocode
  const reverseGeocode = async (lat, lng) => {
    console.log(`Reverse geocode mock (${lat}, ${lng})`);
    if (lat === 13.7563) return "อนุสาวรีย์ชัยสมรภูมิ, กรุงเทพฯ";
    if (lat === 13.7367) return "สนามหลวง, กรุงเทพฯ";
    return "ไม่พบที่อยู่";
  };

  useEffect(() => {
    // Mock ตำแหน่งร้านต้นทาง
    if (selectedShopLat && selectedShopLng) {
      const lat = parseFloat(selectedShopLat);
      const lng = parseFloat(selectedShopLng);
      setOrigin({ lat, lng });
      reverseGeocode(lat, lng).then(setStartAddress);
    }
  }, [selectedShopLat, selectedShopLng]);

  useEffect(() => {
    // Mock order data
    const mockData = {
      orderId,
      DriverCar_type: "รถสไลด์ 4 ล้อ",
      ServiceType: "ฉุกเฉินกลางคืน",
      driverName: selectedDriverName,
      End_Lat: 13.7367,
      End_Lng: 100.5231,
    };

    setOrderData(mockData);

    // ปลายทาง (destination)
    const endLat = parseFloat(mockData.End_Lat);
    const endLng = parseFloat(mockData.End_Lng);
    setDestination({ lat: endLat, lng: endLng });

    reverseGeocode(endLat, endLng).then(setEndAddress);
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
        {/* แผนที่ */}
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
            <div className="mx-2 flex flex-col items-center justify-center">
              <img src="logo-black.svg" className="w-[80px]" />
            </div>
          </div>

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

          {/* ปุ่มกลับ */}
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
