import { Link, useNavigate } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import { usePosition } from "../MAP/PositionContext";
import { useEffect, useState } from "react";

function UserHome() {
  const navigate = useNavigate();

  const { origin, setOrigin, destination, setDestination } = usePosition();
  const [originAddress, setOriginAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);

  // const [start, setStart] = useState(null);
  // const [destination, setDestination] = useState(null);

  console.log("DEST:", destination);

  // ฟังก์ชันแปลงพิกัดเป็นที่อยู่
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=th,en`
      );
      const data = await response.json();
      return data.display_name || "ไม่สามารถดึงข้อมูลที่อยู่ได้";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "ไม่สามารถดึงข้อมูลที่อยู่ได้";
    }
  };
  
  if (destination && destination.position) {
    fetchAddress(destination.position.lat, destination.position.lng)
      .then(address => console.log(address)); // ใช้ address ที่ได้จาก API
  }
  
  useEffect(() => {
    const storedStart = JSON.parse(sessionStorage.getItem("start"));
    const storedDestination = JSON.parse(sessionStorage.getItem("destination"));
    if (storedStart) setStart(storedStart);
    if (storedDestination) setDestination(storedDestination);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("setDestination");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDestination(parsed); // หรือทำอย่างอื่นกับข้อมูลนี้
    }
  }, []);

  // อัปเดตที่อยู่เมื่อ origin หรือ destination เปลี่ยน
  useEffect(() => {
    if (origin?.address) {
      setOriginAddress(origin.address);
    }
  }, [origin]);
  
  useEffect(() => {
    if (destination?.address) {
      setDestinationAddress(destination.address);
    }
  }, [destination]);

  // useEffect(() => {
  //   const storedOrigin = JSON.parse(sessionStorage.getItem("setOrigin"));
  //   const storedDestination = JSON.parse(
  //     sessionStorage.getItem("setDestination")
  //   );

  //   if (storedOrigin) {
  //     setOrigin([storedOrigin.lat, storedOrigin.lng]);
  //     setOriginAddress(storedOrigin.address);
  //   }
  //   if (storedDestination) {
  //     setDestination([storedDestination.lat, storedDestination.lng]);
  //     setDestinationAddress(storedDestination.address); // ✅ was wrongly using setOriginAddress
  //   }
  // }, [setOrigin, setDestination]);

  return (
    <div>
      {/* Herder */}
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">สวัสดี บัว</h1>
      </div>

      {/* ข้อความและรูป */}
      <div className="m-6 mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-left text-xl font-semibold">
            Towing Services <br />
            Help You From Stuck
          </h3>
          <img
            src="./slideme.svg"
            alt="Logo"
            className="w-18 h-18 object-contain"
          />
        </div>
      </div>

      <div className="m-6">
        {/* เลือกตำแหน่ง */}
        <div className="grid grid-cols-[1fr_8fr] gap-4">
          {/* icon */}
          <div className="flex flex-col items-start justify-center relative gap-15">
            <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
            <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
            <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
          </div>
          {/* ปุ่ม */}
          <div className="flex flex-col gap-4 ">
            <button
              style={{ borderRadius: "15px" }}
              onClick={() => navigate("/StartPosition")}
              className="h-[52px] bg-gray-100 text-gray-600 px-3 py-3 text-left w-[270px] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {originAddress ? `${originAddress}` : "เลือกตำแหน่งต้นทาง"}
            </button>
            <button
              style={{ borderRadius: "15px" }}
              onClick={() => navigate("/Destination")}
              className="h-[52px] bg-gray-100 text-gray-600 px-3 py-3 text-left w-[270px] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {destinationAddress
                ? `${destinationAddress}`
                : "เลือกตำแหน่งปลายทาง"}
            </button>
          </div>
        </div>

        {/* ปุ่มค้นหาผู้ให้บริการใกล้ฉัน */}
        <button
          style={{ borderRadius: "15px" }}
          onClick={() => navigate("/OrderInfoInputPage")}
          className="w-full h-[52px] rounded-xl bg-[#2CD64B] text-md  text-white flex items-center justify-center hover:bg-[#43af56] transition mt-4 py-2"
        >
          ค้นหาผู้ให้บริการใกล้ฉัน
        </button>

        {/* ปุ่มตำแหน่งที่สร้างไว้ ยังไมไ่ด้ทำ*/}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="relative w-fit">
            <i className="bi bi-clock-history text-black text-xl absolute -top-4 -right-2 z-0 pointer-events-none"></i>
            <button
              style={{ borderRadius: "10px" }}
              className="w-[100px] h-[36px] text-[13px] text-black bg-[#66DC82] rounded-xl px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start relative z-10 cursor-pointer text-left"
            >
              Homecar-อู่รถมั่นคง
            </button>
          </div>
          <div className="relative w-fit">
            <i className="bi bi-clock-history text-black text-xl absolute -top-4 -right-2 z-0 pointer-events-none"></i>
            <button
              style={{ borderRadius: "10px" }}
              className="w-[100px] h-[36px] text-[13px] text-black bg-[#66DC82] rounded-xl px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start relative z-10 cursor-pointer text-left"
            >
              Homecar-ร้านจันทร์ฉาย
            </button>
          </div>
          {/* ปุ่ม + สร้างตำแหน่ง*/}
          <div className="relative w-fit">
            <button
              style={{ borderRadius: "10px" }}
              className="w-[100px] h-[36px] text-[11px] text-black bg-[#66DC82] rounded-xl px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-center cursor-pointer"
            >
              <i className="bi bi-plus-circle text-lg flex items-center"></i>
            </button>
          </div>
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
        <Link to="/AllCoupon" className="mb-4 w-[291px] h-[50px]">
          <div className="bg-[#48d065] text-white w-full h-full rounded-[20px] font-bold text-lg flex items-center justify-center hover:bg-[#2ea144] transition">
            Coupon
          </div>
        </Link>
      </div>
    </div>
  );
}

export default UserHome;
