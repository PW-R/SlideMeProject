import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const reverseGeocodeNominatim = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const address = data.display_name;
    console.log("Address:", address);
    return address;
  } catch (error) {
    console.error("Nominatim error:", error);
    return null;
  }
};

function IC_OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState({});
  const navigate = useNavigate();

  const handleOrderClick = (order) => {
    navigate("/IncomingOrderInfo", { state: { order } });
  };

  useEffect(() => {
    const fetchAcceptableWork = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/acceptable-work"  // ✅ แก้ path ให้ตรงกับ backend
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching acceptable work:", err);
        setError("ไม่สามารถโหลดข้อมูลได้");
      }
    };
  
    fetchAcceptableWork();
  }, []);
  

  useEffect(() => {
    const fetchLocations = async () => {
      const newLocations = {};

      for (const order of orders) {
        if (order.Start_Lat && order.Start_Lng) {
          const start = await reverseGeocodeNominatim(
            order.Start_Lat,
            order.Start_Lng
          );
          newLocations[order.OrderDetail_ID] = start || "ไม่พบตำแหน่งเริ่มต้น";
        }
      }

      setLocations(newLocations);
    };

    if (orders.length > 0) {
      fetchLocations();
    }
  }, [orders]);

  return (
    <div>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/ListDriver">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-center">งานที่สามารถรับได้</h1>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {orders.map((order, index) => (
        <div
          key={index}
          onClick={() => handleOrderClick(order)}
          className="cursor-pointer"
        >
          <div className="flex mt-4 ml-4 font-bold w-full">
            <div className="icon">
              <img src="./car_location.svg" alt="location" />
            </div>
            <div className="mt-auto w-full leading-none ml-2">
              <p className="mt-0 text-[#15BC11]">
                {locations[order.OrderDetail_ID] || "กำลังโหลดตำแหน่ง..."}
              </p>
              <p className="text-[#004AAD]">#{order.OrderDetail_ID}</p>

              <div className="w-[270px] h-auto bg-[#E5E5E5] rounded-2xl p-4 leading-none">
                <p>{order.DriverCar_type}</p>
                <p>{order.Order_Budget} ฿</p>
                <p>{new Date(order.Order_Date_time).toLocaleString("th-TH")}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IC_OrderList;
