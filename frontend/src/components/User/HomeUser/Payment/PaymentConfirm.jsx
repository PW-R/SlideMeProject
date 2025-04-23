import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function PaymentConfirm() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [orderData, setOrderData] = useState(null);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTotalPrice, setSelectedPrice] = useState(0);
  const [selectedEquipmentPrice, setEquipmentPrice] = useState(0);

  useEffect(() => {
    sessionStorage.setItem("selectedTotalPrice", "1200");
    sessionStorage.setItem("selectedEquipmentPrice", "300");

    setSelectedPrice(Number(sessionStorage.getItem("selectedTotalPrice") || 0));
    setEquipmentPrice(Number(sessionStorage.getItem("selectedEquipmentPrice") || 0));
  }, []);

  const reverseGeocode = async (lat, lng) => {
    console.log(`Mock reverseGeocode: (${lat}, ${lng})`);
    if (lat === 13.7466 && lng === 100.5348) return "สยาม, กรุงเทพฯ";
    return "ที่อยู่จำลอง";
  };

  useEffect(() => {
    const mockOrderData = {
      id: orderId,
      startLat: 13.7466,
      startLng: 100.5348,
      endLat: 13.7466,
      endLng: 100.5348,
    };

    setOrderData(mockOrderData);
    setIsLoading(false);
  }, [orderId]);

  useEffect(() => {
    if (orderData) {
      const { startLat, startLng, endLat, endLng } = orderData;
      reverseGeocode(startLat, startLng).then(setStartAddress);
      reverseGeocode(endLat, endLng).then(setEndAddress);
    }
  }, [orderData]);

  const handleDriverDetail = () => {
    navigate(`/DriverDetail/${orderId}`);
  };

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
        {/* ตำแหน่ง */}
        <div className="grid grid-cols-[1fr_8fr] gap-4">
          <div className="flex flex-col items-start justify-center relative gap-15">
            <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
            <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
            <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
          </div>
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

        {/* ปุ่ม 3 อัน */}
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
              {[1, 2, 3, 4].map((i) => (
                <Carousel.Item key={i} interval={1000}>
                  <img
                    className="d-block w-100 rounded-xl"
                    src={`./advert_car${i}.svg`}
                    alt={`slide-${i}`}
                  />
                </Carousel.Item>
              ))}
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
          <div className="grid grid-cols-[3fr_1fr]">
            <p className="mb-0">ค่าบริการแพลทฟอร์ม</p>
            <p className="mb-0 text-end">50</p>
          </div>
          <div className="grid grid-cols-[3fr_1fr]">
            <p className="mb-0 text-red-500">รวมทั้งหมด</p>
            <p className="mb-0 text-red-500 text-end">
              {selectedTotalPrice + selectedEquipmentPrice + 50}
            </p>
          </div>
        </div>

        {/* ปุ่มคูปอง */}
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
