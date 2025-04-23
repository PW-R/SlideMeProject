import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ShopDetail() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // ดึงข้อมูลจากหน้าที่แล้ว
  const selectedShopName = sessionStorage.getItem("selectedShop_Name");
  const selectedShopInfo = sessionStorage.getItem("selectedShop_Info");
  const selectedShopService = sessionStorage.getItem("selectedShop_service");
  const selectedShopPhone = sessionStorage.getItem("selectedShop_Phone");

  const [shopAddress, setShopAddress] = useState("");

  useEffect(() => {
    const selectedShopLat = sessionStorage.getItem("selectedShop_Lat");
    const selectedShopLng = sessionStorage.getItem("selectedShop_Lng");
  
    const reverseGeocode = async (lat, lng) => {
      try {
        const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
        });
  
        console.log("ที่อยู่ที่ได้จาก reverse geocode:", res.data.display_name);
        return res.data.display_name;
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
        return "ไม่พบที่อยู่";
      }
    };
  
    if (selectedShopLat && selectedShopLng) {
      reverseGeocode(selectedShopLat, selectedShopLng).then(setShopAddress);
    }
  }, []);

  useEffect(() => {
    if (orderData) {
      console.log("ข้อมูลที่ได้จาก API:", orderData);
      const { startLat, startLng, endLat, endLng } = orderData;
      console.log("StartLat:", startLat, "StartLng:", startLng); // Check values
      console.log("EndLat:", endLat, "EndLng:", endLng);
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

  return (
    <div>
      <div style={{ overflow: "hidden" }} className="pb-32">
        <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
          <Link to={`/DCSS/${orderId}`}>
            <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
          </Link>
          <h1 className="text-white">{selectedShopName}</h1>
        </div>

        <div className="pt-[150px] flex flex-col items-center ">
          {/* <div className="form-check form-switch ">
              <label className="form-check-label" for="switchCheckDefault">Store status: </label>
              <input className="form-check-input" for="switchCheckDefault" type="checkbox" role="switch" id="switchCheckDefault" />
            </div> */}

          <div className="w-full h-[220px] border-none bg-gray-500 mt-4">
            <p>store img</p>
          </div>

          <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4 overflow-hidden">
            <p className="mb-0">
              <i class="bi bi-shop"></i> เกี่ยวกับ
            </p>
            <p>{selectedShopInfo}</p>
          </div>

          <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4">
            <p className="mb-0">
              <i class="bi bi-car-front"></i> บริการ
            </p>
            <p>{selectedShopService}</p>
          </div>

          <div className="w-[80%] h-[130px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4 overflow-hidden">
            <p className="mb-0">
              <i class="bi bi-geo-alt-fill"></i> ที่อยู่ร้าน
            </p>
            <p>{shopAddress}</p>
          </div>

          <div className="w-[80%] h-[80px] border-2 border-[#6FBB84] rounded-[15px] p-2 mt-4">
            <p className="mb-0">
              <i class="bi bi-telephone-fill"></i> เบอร์โทรศัพท์
            </p>
            <p className="mb-0">{selectedShopPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetail;
