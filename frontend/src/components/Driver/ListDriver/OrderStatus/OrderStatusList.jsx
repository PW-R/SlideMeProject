import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
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

function OrderStatusList() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const handleCancel = () => setShow(true);
  const handleClose = () => setShow(false);
  const [locations, setLocations] = useState({});
  const navigate = useNavigate();
  const deleteClick = () => {
    console.log("งานถูกยกเลิก");
    setShow(false);
  };

  const handleOrderInfo = (orderId) => {
    navigate(`/OrderInfo?id=${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/order-status-driver"
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching order statuses:", err);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchAllLocations = async () => {
      const newLocations = {};

      for (const order of orders) {
        if (
          order.Start_Lat &&
          order.Start_Lng &&
          order.End_Lat &&
          order.End_Lng
        ) {
          const start = await reverseGeocodeNominatim(
            order.Start_Lat,
            order.Start_Lng
          );
          const end = await reverseGeocodeNominatim(
            order.End_Lat,
            order.End_Lng
          );
          newLocations[order.OrderDetail_ID] = {
            start,
            end,
          };
        }
      }

      setLocations(newLocations);
    };
    if (orders.length > 0) {
      fetchAllLocations();
    }
  }, [orders]);

  const getStatusMessage = (status) => {
    switch (status) {
      case "Pending":
        return {
          message: "คุณรับงานแล้ว กรุณารอการตอบกลับ",
          bgColor: "#CBEBD3",
        };
      case "Accepted":
        return { message: "คุณยืนยันการรับงานแล้ว", bgColor: "#D0E3FF" };
      case "InProgress":
        return { message: "กำลังดำเนินงาน", bgColor: "#FFF3CD" };
      case "Completed":
        return { message: "งานเสร็จสิ้นแล้ว", bgColor: "#D4EDDA" };
      case "Cancelled":
        return { message: "งานนี้ถูกยกเลิก", bgColor: "#F8D7DA" };
      default:
        return { message: "กำลังประมวลผล...", bgColor: "#E2E3E5" };
    }
  };

  return (
    <div className="overflow-hidden h-screen">
      {/* Modal ยืนยันการยกเลิกงาน */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        dialogClassName="custom-modal-zindex"
      >
        <Modal.Header closeButton />
        <Modal.Body className="text-center">
          คุณต้องการยกเลิกงานนี้ใช่หรือไม่ ?
        </Modal.Body>
        <Modal.Footer className="justify-around">
          <Button
            variant="danger"
            onClick={handleClose}
            style={{ width: 110, height: 30 }}
          >
            ไม่
          </Button>
          <Button
            variant="success"
            onClick={deleteClick}
            style={{ width: 110, height: 30 }}
          >
            ใช่
          </Button>
        </Modal.Footer>
      </Modal>

      {/* header */}
      <div className="w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000] relative">
        {/* ปุ่มย้อนกลับ */}
        <Link to="/ListDriver">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>

        {/* หัวข้อ Order History */}
        <div className="text-white text-center">
          <h1 className="text-lg font-bold">สถานะงาน</h1>
        </div>
      </div>

      {/* แจ้งเตือนสถานะ */}
      {orders.length > 0 && (
        <div
          className="mt-[20px] ml-8 font-bold w-[300px] h-[40px] rounded-[15px] p-3 leading-none"
          style={{
            backgroundColor: getStatusMessage(orders[0].Order_Status).bgColor,
          }}
        >
          <p>{getStatusMessage(orders[0].Order_Status).message}</p>
        </div>
      )}

      {/* รายการงาน  */}
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex mt-4 ml-4 font-bold w-full"
          onClick={() => handleOrderInfo(order.OrderDetail_ID)}
        >
          <img src="./car_location.svg" className="w-20 h-15" />
          <div className="ml-2 w-full">
            <p className="text-[#15BC11]">
              {locations[order.OrderDetail_ID]?.start || "กำลังโหลด..."}
            </p>
            <p className="text-[#004AAD]">
              {order.Order_UserName} : {order.Order_Status}
            </p>
            <div className="bg-[#E5E5E5] w-[270px] rounded-2xl p-4">
              <p>
                {order.UserCar_type} / {order.DriverCar_type}
              </p>
              <p>{order.Order_Budget} ฿</p>
              <p>
                {new Date(order.Order_Date_time).toLocaleDateString("th-TH")}{" "}
                เวลา{" "}
                {new Date(order.Order_Date_time).toLocaleTimeString("th-TH")}
              </p>
            </div>

            <div className="flex items-center mt-2 ml-4 gap-x-6">
              <Link to={`/OrderConfirmation?id=${order.OrderDetail_ID}`}>
                <button className="btn btn-success">สำเร็จงาน</button>
              </Link>
              <button className="btn btn-danger" onClick={handleCancel}>
                ยกเลิกงาน
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderStatusList;
