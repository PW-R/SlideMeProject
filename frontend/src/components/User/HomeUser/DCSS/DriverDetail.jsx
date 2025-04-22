import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DriverDetail() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // รับข้อมูลมาแสดง
  const selectedDriverName = sessionStorage.getItem("selectedDriverName");
  const selectedDriverYear = sessionStorage.getItem("selectedDriverYear");
  const selectedShopPhone = sessionStorage.getItem("selectedShopPhone");

  const [shopAddress, setShopAddress] = useState("");

  useEffect(() => {
    const selectedShopLat = sessionStorage.getItem("selectedShop_Lat");
    const selectedShopLng = sessionStorage.getItem("selectedShop_Lng");

    const reverseGeocode = async (lat, lng) => {
      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              lat,
              lon: lng,
              format: "json",
            },
          }
        );

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
    console.log("orderId:", orderId);
    if (orderId) {
      axios
        .get(`http://localhost:3000/api/InputOrder/order/${orderId}`)
        .then((response) => {
          console.log("ข้อมูลคำสั่งซื้อ:", response.data);
          // setOrderData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
          setIsLoading(false);
        });
    }
  }, [orderId]);

  useEffect(() => {
    if (orderData) {
      console.log("ข้อมูลที่ได้จาก API:", orderData);
      const { serviceType, driverName, shopPhone, Driver_Name } = orderData;
      console.log("StartLat:", startLat, "StartLng:", startLng); // Check values
      console.log("EndLat:", endLat, "EndLng:", endLng);
    }
  }, [orderData]);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to={`/PaymentConfirm/${orderId}`}>
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">ข้อมูลผู้ให้บริการ</h1>
      </div>

      <div className="pt-[115px] h-[750px] flex flex-col items-center text-center m-6">
        {/* รูปโปรไฟล์คนขับ */}
        <div className="flex items-center justify-center w-[126px] h-[126px] rounded-full bg-gray-300">
          <img className="rounded-full" src="driver_logo.svg" />
        </div>

        {/* ชื่อและรหัส */}
        <div className="m-2">
          <p className="text-2xl font-bold mt-3 mb-2">{selectedDriverName}</p>
          {/* <p className="font-bold">อะไระวะ ๆม่เอา 569-SM-8A2001</p> */}
        </div>

        {/* Service / Year */}
        <div className="grid grid-cols-2 gap-14 text-center">
          <div className="leading-tight">
            <p className="text-2xl font-bold mb-0">ยัง</p>
            <p className="text-[#A09D9D]">Service</p>
          </div>
          <div className="leading-tight">
            <p className="text-2xl font-bold mb-0">{selectedDriverYear}</p>
            <p className="text-[#A09D9D]">Year</p>
          </div>
        </div>

        {/* เส้นสีเขียว */}
        <div className="w-full border-t-4 border-[#0DC964]"></div>

        {/* ชื่อ / เบอร์โทรศัพท์ / ตำแหน่ง */}
        <div className="grid gap-1 mt-4">
          <p className="flex items-center text-base mb-1">
            <i className="bi bi-file-earmark-person text-[1.3rem] text-[#479E5D] pr-5"></i>
            {selectedDriverName}
          </p>
          <p className="flex items-center text-base mb-1">
            <i className="bi bi-telephone text-[1.3rem] text-[#479E5D] pr-5"></i>
            {selectedShopPhone}
          </p>
          <p className="flex items-center text-base mb-0 w-[300px] h-[100px] overflow-hidden">
            <i className="bi bi-geo-alt text-[1.3rem] text-[#479E5D] pr-5"></i>
            <span className="text-left break-words w-full">{shopAddress}</span>
          </p>
        </div>

        {/* รีวิว */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">
              ตรงต่อเวลา
            </p>
            <p className="text-[15px] flex items-center h-full m-0">ยัง</p>
          </div>
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">
              ราคาเป็นธรรม
            </p>
            <p className="text-[15px] flex items-center h-full m-0">3.9</p>
          </div>
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">ปลอดภัย</p>
            <p className="text-[15px] flex items-center h-full m-0">4.2</p>
          </div>
          <div className="w-[160px] h-[60px] border-2 border-[#0dc964] rounded-md grid grid-cols-[5fr_1fr] items-center px-2">
            <p className="text-[15px] flex items-center h-full m-0">
              บุคลิคผู้ขับ
            </p>
            <p className="text-[15px] flex items-center h-full m-0">4.5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetail;
