import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function OrderStatusList() {
  const [orders, setOrders] = useState([]);

  const [show, setShow] = useState(false);
  const handleCancel = () => setShow(true);
  const handleClose = () => setShow(false);
  const deleteClick = () => {
    console.log("งานถูกยกเลิก");
    setShow(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/order-status-driver");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching order statuses:", err);
      }
    };

    fetchOrders();
  }, []);

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

      {/* หัวหน้า */}
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
      <div className="mt-[20px] ml-8 font-bold bg-[#CBEBD3] w-[300px] h-[40px] rounded-[15px] p-3 leading-none">
        <p>คุณรับงานแล้ว กรุณารอการตอบกลับ</p>
      </div>

      {/* รายการงาน 1 */}
      {orders.map((order, index) => (
        <div key={index} className="flex mt-4 ml-4 font-bold w-full">
          <img src="./car_location.svg" className="w-20 h-15" />
          <div className="ml-2 w-full">
            <p className="text-[#15BC11]">{order.startLocation}</p>
            <p className="text-[#004AAD]">
              {order.customerName} : {order.status}
            </p>
            <div className="bg-[#E5E5E5] w-[270px] rounded-2xl p-4">
              <p>{order.carType}</p>
              <p>{order.price} ฿</p>
              <p>
                {order.date} เวลา {order.time}
              </p>
            </div>
            <div className="flex items-center mt-2 ml-4 gap-x-6">
              <Link to={`/OrderConfirmation?id=${order.orderId}`}>
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
