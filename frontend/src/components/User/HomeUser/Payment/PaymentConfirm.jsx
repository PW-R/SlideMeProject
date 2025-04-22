import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { usePosition } from "../../MAP/PositionContext";

function PaymentConfirm() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const { orderId } = useParams();

  const { origin, destination } = usePosition();
  const [isLoadingStoreTab, setIsLoadingStoreTab] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStores, setIsLoadingStores] = useState(false);

  const [nearbyStores, setNearbyStores] = useState([]);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");

  // ดึงข้อมูลที่เลือกจากหน้าที่แล้วมาแสดง
  const [selectedTotalPrice, setSelectedPrice] = useState(0);
  const [selectedEquipmentPrice, setEquipmentPrice] = useState(0);
  useEffect(() => {
    setSelectedPrice(Number(sessionStorage.getItem("selectedTotalPrice") || 0));
    setEquipmentPrice(
      Number(sessionStorage.getItem("selectedEquipmentPrice") || 0)
    );
  }, []);
  const selectedDriverName = sessionStorage.getItem("selectedDriverName");
  const selectedDriverYear = sessionStorage.getItem("selectedDriverYear");
  const selectedShopPhone = sessionStorage.getItem("selectedShop_Phone");

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await axios.get(
        // `https://nominatim.openstreetmap.org/reverse`,
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
      const { startLat, startLng, endLat, endLng } = orderData;
      console.log("StartLat:", startLat, "StartLng:", startLng); // Check values
      console.log("EndLat:", endLat, "EndLng:", endLng);

      if (startLat && startLng) {
        reverseGeocode(startLat, startLng).then(setStartAddress);
      }

      if (endLat && endLng) {
        reverseGeocode(endLat, endLng).then(setEndAddress);
      }
    }
  }, [orderData]);

  // ดึงข้อมูลคำสั่งซื้อจาก backend
  useEffect(() => {
    console.log("orderId:", orderId);
    if (orderId) {
      axios
        .get(`http://localhost:3000/api/InputOrder/order/${orderId}`)
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

  // ส่งข้อมูลไปหน้าคนขับ
  const handleDriverDetail = () => {
    sessionStorage.setItem("selectedDriverName", selectedDriverName);
    sessionStorage.setItem("selectedDriverYear", selectedDriverYear);
    sessionStorage.setItem("selectedShopPhone", selectedShopPhone);
    navigate(`/DriverDetail/${orderId}`);
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

  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to={`/DCSS/${orderId}`}>
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">เรียกรถสไลด์</h1>
      </div>

      <div className="pt-[115px] h-[750px] flex flex-col m-6">
        {/* เลือกตำแหน่ง */}
        <div className="grid grid-cols-[1fr_8fr] gap-4">
          {/* icon */}
          <div className="flex flex-col items-start justify-center relative gap-15">
            <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
            <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
            <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
          </div>
          {/* ตำแหน่ง */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-[52px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left w-[280px] overflow-hidden whitespace-nowrap text-ellipsis">
                {startAddress || "ตำแหน่งต้นทาง"}
              </div>
              <div className="h-[52px] rounded-xl bg-gray-100 text-gray-600 px-3 py-2 text-left w-[280px] overflow-hidden whitespace-nowrap text-ellipsis">
                {endAddress || "ตำแหน่งปลายทาง"}
              </div>
            </div>
          </div>
        </div>

        {/* 3ปุ่ม ข้อมูลผู้ให้บริการ / โทรหาผู้ให้บริการ / ส่งข้อความ */}
        <div className="grid grid-cols-3 mt-6 gap-2">
          <button
            onClick={handleDriverDetail}
            style={{ fontSize: "13px", borderRadius: "10px" }}
            className="bg-[#0DC964] text-white w-[100px] h-[30px] text-[10px] flex items-center justify-center hover:bg-[#43af56] transition"
          >
            ข้อมูลผู้ให้บริการ
          </button>
          <button
            onClick={() => navigate("/UserMassage")}
            style={{ fontSize: "13px", borderRadius: "10px" }}
            className="bg-[#0DC964] text-white w-[100px] h-[30px] text-[10px] flex items-center justify-center hover:bg-[#43af56] transition"
          >
            โทรหาผู้ให้บริการ
          </button>
          <button
            onClick={() => navigate("/UserMassage")}
            style={{ fontSize: "13px", borderRadius: "10px" }}
            className="bg-[#0DC964] text-white w-[100px] h-[30px] text-[10px] flex items-center justify-center hover:bg-[#43af56] transition"
          >
            ส่งข้อความ
          </button>
        </div>

        {/* โฆษณา */}
        <div className="mt-6">
          <Link to="/ShopReccommend">
            <Carousel className="rounded-xl h-[160px] overflow-hidden">
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 rounded-xl"
                  src="./advert_car1.svg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 rounded-xl"
                  src="./advert_car2.svg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 rounded-xl"
                  src="./advert_car3.svg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 rounded-xl"
                  src="./advert_car4.svg"
                  alt="four slide"
                />
              </Carousel.Item>
            </Carousel>
          </Link>
        </div>

        {/* รายละเอียดค่าบริการ */}
        <div className="mb-2 items-center text-lg font-semibold">
          <div className="grid grid-cols-[3fr_1fr]">
            <p className="mb-0 ">ค่าบริการ</p>
            <p className="mb-0 text-end">{selectedTotalPrice}</p>
          </div>
          <div className="grid grid-cols-[3fr_1fr]">
            <p className="mb-0">ค่าอุปกรณ์</p>
            <p className="mb-0 text-end">{selectedEquipmentPrice}</p>
          </div>
          {/* แสดงหลังจากที่กดใช้ส่วนลด */}
          {/* <div className="grid grid-cols-[3fr_1fr]">
                <p className="mb-0">ส่วนลด</p>
                <p className="mb-0 text-end">500</p>
            </div> */}
          <div className="grid grid-cols-[3fr_1fr]">
            <p className="mb-0">ค่าบริการแพลทฟอร์ม</p>
            <p className="mb-0 text-end">50</p>
          </div>
          <div className="grid grid-cols-[3fr_1fr]">
            <p className="mb-0 text-red-500">รวมทั้งหมด</p>
            <p className="mb-0 text-red-500 text-end">2,230</p>
          </div>
        </div>

        {/* ปุ่มคูปองส่วนลด */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/UseCoupon/${orderId}`)}
            style={{ fontSize: "13px", borderRadius: "10px" }}
            className="bg-[#FFC4FF] text-black w-full h-[30px] flex items-center justify-center hover:bg-[#FFA3BA] transition"
          >
            คูปอง
          </button>
        </div>

        {/* ปุ่มชำระเงิน / ยกเลิก */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/Receipt/${orderId}`)}
            style={{ fontSize: "13px", borderRadius: "10px" }}
            className="bg-[#0DC964] text-white w-full h-[30px] flex items-center justify-center hover:bg-[#43af56] transition"
          >
            ชำระเงิน
          </button>
          <button
            onClick={() => navigate(`/DCSS/${orderId}`)}
            style={{ fontSize: "13px", borderRadius: "10px" }}
            className="bg-[#FF0A0A] text-white w-full h-[30px] flex items-center justify-center hover:bg-[#EF1D33] transition"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirm;
