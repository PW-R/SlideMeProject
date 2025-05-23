import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function PaymentCompleted() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const { orderId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const selectedDriverName = sessionStorage.getItem("selectedDriverName") || "คุณสมหมาย";

  const InfoItem = ({ iconClass, label }) => (
    <div className="flex flex-col items-center text-[#0DC964]">
      <i className={`${iconClass} text-xl`}></i>
      <p className="mb-1 text-black">{label}</p>
    </div>
  );

  // mock reverse geocode
  const reverseGeocode = async (lat, lng) => {
    console.log(`Reverse geocoding mock (${lat}, ${lng})`);
    if (lat === 13.7563) return "อนุสาวรีย์ชัยสมรภูมิ, กรุงเทพฯ";
    if (lat === 13.7367) return "สนามหลวง, กรุงเทพฯ";
    return "ไม่พบที่อยู่";
  };

  // mock fetch order data
  useEffect(() => {
    const mockData = {
      id: orderId,
      startLat: 13.7563,
      startLng: 100.5018,
      endLat: 13.7367,
      endLng: 100.5231,
      total_price: 2000,
      discount: 300,
    };

    setOrderData(mockData);
    setIsLoading(false);

    const price = mockData.total_price || 0;
    const discountVal = mockData.discount || 0;

    setTotalPrice(price);
    setDiscount(discountVal);

    const afterDiscount = price - discountVal;
    const withVAT = afterDiscount * 1.07;
    const final = withVAT * 1.05;

    setFinalPrice(final.toFixed(2));
  }, [orderId]);

  // mock reverse address
  useEffect(() => {
    if (orderData) {
      const { startLat, startLng, endLat, endLng } = orderData;
      if (startLat && startLng) reverseGeocode(startLat, startLng).then(setStartAddress);
      if (endLat && endLng) reverseGeocode(endLat, endLng).then(setEndAddress);
    }
  }, [orderData]);

  return (
    <div className="flex justify-center items-center py-8 bg-[#0DC964] h-full w-full p-4">
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
        <div className="bg-[#0DC964] w-30 h-30 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
          <i className="bi bi-check2 text-7xl"></i>
        </div>

        <p className="text-center font-semibold text-xl mb-2">
          ขอบคุณสำหรับการเรียกรถ
        </p>

        {/* Order Status Box */}
        <div className="bg-green-100 border border-gray-300 rounded-xl p-4 mb-2">
          <p className="font-semibold text-xl mb-2">Order Status</p>
          <div className="flex justify-between mb-2">
            <span>ทั้งหมด</span>
            <span>{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>ส่วนลด</span>
            <span className="text-red-500">{discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>รวมทั้งหมด</span>
            <span>{Number(finalPrice).toLocaleString()}</span>
          </div>
        </div>

        {/* Driver Profile Section */}
        <div className="flex flex-col items-center bg-green-100 border border-gray-300 rounded-xl mb-2 p-2">
          <div className="w-16 h-16 rounded-full m-2">
            <img className="rounded-full" src="driver_logo.svg" />
          </div>
          <p className="font-bold text-lg mb-2">{selectedDriverName}</p>
          <div className="grid grid-cols-2 gap-x-8 m-2">
            <button
              onClick={() => navigate("/UserMassage")}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-telephone text-white"></i>
            </button>
            <button
              onClick={() => navigate("/UserMassage")}
              className="w-8 h-8 rounded-[10px] bg-[#60B876] flex items-center justify-center"
            >
              <i className="bi bi-chat text-white"></i>
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate(`/OrderStatusListUser/${orderId}`)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition"
        >
          ติดตามสถานะ
        </button>
      </div>
    </div>
  );
}

export default PaymentCompleted;
