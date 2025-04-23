import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
function IncomingOrderInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const order = state?.order;

  const handleAccept = async () => {
  try {
    await fetch(
      `http://localhost:3000/api/acceptable-work/${order.OrderDetail_ID}/status`,
      {
        status: "ตกลง",
      }
      
    );
    navigate("/OrderPayment", { state: { order } });
  } catch (error) {
    console.error("ตกลงงานไม่สำเร็จ:", error);
    alert("เกิดข้อผิดพลาดในการตกลงงาน");
  }
  };
  
  const handleReject = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/acceptable-work/${order.OrderDetail_ID}/status`,
        {
          status: "ปฏิเสธ",
        }
      );
      navigate("/ICOrderList");
    } catch (error) {
      console.error("ปฏิเสธงานไม่สำเร็จ:", error);
      alert("เกิดข้อผิดพลาดในการปฏิเสธงาน");
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (
      order &&
      order.Start_Lat &&
      order.Start_Lng &&
      order.End_Lat &&
      order.End_Lng
    ) {
      const fetchLocations = async () => {
        const startAddress = await reverseGeocodeNominatim(
          order.Start_Lat,
          order.Start_Lng
        );
        const endAddress = await reverseGeocodeNominatim(
          order.End_Lat,
          order.End_Lng
        );

        if (isMounted) {
          setStartLocation(startAddress);
          setEndLocation(endAddress);
        }
      };

      fetchLocations();
    }

    return () => {
      isMounted = false;
    };
  }, [order]);

  if (!order) return <p className="text-center mt-10">ไม่พบข้อมูลงาน</p>;

  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      <div className="w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000] relative">
        <Link to="/ICOrderList">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <div className="text-white text-center">
          <h1 className="text-lg font-bold">สถานะงาน</h1>
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className="mt-4 font-bold bg-[#62EF8A] w-[300px] h-auto rounded-[10px] p-3 leading-none">
          <p>Order ID: # {order.OrderDetail_ID}</p>
        </div>

        <div className="bg-[#62EF8A] w-[300px] h-auto rounded-[10px] p-3 leading-none mt-4">
          <p>ตำแหน่งต้นทาง: {startLocation}</p>
          <p>ตำแหน่งปลายทาง: {endLocation}</p>
          <p>ประเภทรถ: {order.DriverCar_type}</p>
          <p>ยี่ห้อ: {order.Car_Brand}</p>
          <p>ประเภทรถผู้ใช้: {order.UserCar_type}</p>
          <p>เลขทะเบียนรถ: {order.License_Plate}</p>
          <p>ปีรถ: {order.CarYear}</p>
          <p>หมายเหตุ: {order.Note}</p>
          <p>
            วันที่บริการ:{" "}
            {new Date(order.Order_Date_time).toLocaleDateString("th-TH")}
          </p>
          <p>
            เวลา: {new Date(order.Order_Date_time).toLocaleTimeString("th-TH")}
          </p>
          <p>งบประมาณ: {order.Order_Budget} บาท</p>
        </div>

        <div className="flex m-4 gap-x-6">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAccept}
          >
            รับงาน
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleReject}
          >
            ปฏิเสธงาน
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingOrderInfo;
