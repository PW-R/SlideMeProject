import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function OrderStatusList() {
  const [show, setShow] = useState(false);

  const handleCancel = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteClick = () => {
    console.log("งานถูกยกเลิก");
    setShow(false);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        style={{ height: "300px", zIndex: 4000 }}
        centered
        dialogClassName="custom-modal-zindex"
      >
        <Modal.Header closeButton></Modal.Header>
        <br />
        <Modal.Body>คุณต้องการยกเลิกงานนี้ใช่หรือไม่ ?</Modal.Body>
        <br />
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
          }}
        >
          <Button
            variant="danger"
            onClick={handleClose}
            style={{ width: "110px", height: "30px" }}
          >
            ไม่
          </Button>
          <Button
            variant="success"
            onClick={deleteClick}
            style={{ width: "110px", height: "30px" }}
          >
            ใช่
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center">สถานะงาน</h1>
      </div>

      <div className=" mt-4 ml-8 font-bold bg-[#CBEBD3] w-[300px] h-[40px] rounded-[15px] p-3 leading-none">
        <p >คุณรับงานแล้ว กรุณารอการตอบกลับ</p>
      </div>

      
        <div className="flex mt-4 ml-4 font-bold w-full">
          <div className="icon">
            <img src="./car_location.svg" />
          </div>
          <div className="mt-auto w-full leading-none ml-2">
            <p className="mt-0 text-[#15BC11]">Don Muang Toll Way, Khwaeng</p>
            <p className="text-[#004AAD]">คุณพร บ่าวแม็ค : กำลังดำเนินงาน</p>

            <div className="w-[270px] h-auto bg-[#E5E5E5] rounded-2xl p-4 leading-none">
              <p>รถสไลด์ขนาดกลาง</p>
              <p>2130 ฿</p>
              <p>07 มกราคม 2567 เวลา 10.00</p>
            </div>

            <div className="flex items-center mt-2 ml-4">
              <Link to="/OrderConfirmation">
              <button
                type="button"
                className="btn btn-success"
                style={{ marginRight: "1rem" }}
              >
                สำเร็จงาน
              </button>
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancel}
              >
                ยกเลิกงาน
              </button>
            </div>
          </div>
        </div>
      

      <div className="flex mt-4 ml-4 font-bold w-full">
        <div className="icon">
          <img src="./car_location.svg" />
        </div>
        <div className="mt-auto w-full leading-none ml-2">
          <p className="mt-0 text-[#15BC11]">Near Soi Vibhavadi Rangsit 20</p>
          <p className="text-[#004AAD]">คุณอเล็กซ์ หวังไป๋ : รอยืนยัน</p>

          <div className="w-[270px] h-auto bg-[#E5E5E5] rounded-2xl p-4 leading-none">
            <p>รถสไลด์ขนาดกลาง</p>
            <p>2130 ฿</p>
            <p>07 มกราคม 2567 เวลา 10.00</p>
          </div>

          <div className="flex items-center mt-2 ml-4">
            <button
              type="button"
              className="btn btn-success"
              style={{ marginRight: "1rem" }}
            >
              สำเร็จงาน
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              ยกเลิกงาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusList;
