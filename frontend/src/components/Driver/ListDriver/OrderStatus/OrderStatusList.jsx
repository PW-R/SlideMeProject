import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function OrderStatusList() {
  const [show, setShow] = useState(false);

  const handleCancel = () => setShow(true);
  const handleClose = () => setShow(false);
  const deleteClick = () => {
    console.log("งานถูกยกเลิก");
    setShow(false);
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
      <div className="flex mt-4 ml-4 font-bold w-full">
        <img src="./car_location.svg" className="w-20 h-15" />
        <div className="ml-2 w-full">
          <p className="text-[#15BC11]">Don Muang Toll Way, Khwaeng</p>
          <p className="text-[#004AAD]">คุณพร บ่าวแม็ค : กำลังดำเนินงาน</p>
          <div className="bg-[#E5E5E5] w-[270px] rounded-2xl p-4">
            <p>รถสไลด์ขนาดกลาง</p>
            <p>2130 ฿</p>
            <p>07 มกราคม 2567 เวลา 10.00</p>
          </div>
          <div className="flex items-center mt-2 ml-4 gap-x-6">
            <Link to="/OrderConfirmation">
              <button className="btn btn-success">สำเร็จงาน</button>
            </Link>
            <button className="btn btn-danger" onClick={handleCancel}>
              ยกเลิกงาน
            </button>
          </div>
        </div>
      </div>

      {/* รายการงาน 2 */}
      <div className="flex mt-4 ml-4 font-bold w-full">
        <img src="./car_location.svg" className="w-20 h-15" />
        <div className="ml-2 w-full">
          <p className="text-[#15BC11]">Near Soi Vibhavadi Rangsit 20</p>
          <p className="text-[#004AAD]">คุณอเล็กซ์ หวังไป๋ : รอยืนยัน</p>
          <div className="bg-[#E5E5E5] w-[270px] rounded-2xl p-4">
            <p>รถสไลด์ขนาดกลาง</p>
            <p>2130 ฿</p>
            <p>07 มกราคม 2567 เวลา 10.00</p>
          </div>
          <div className="flex items-center mt-2 ml-4 gap-x-6">
            <Link to="/OrderConfirmation">
              <button className="btn btn-success">สำเร็จงาน</button>
            </Link>
            <button className="btn btn-danger" onClick={handleCancel}>
              ยกเลิกงาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusList;
