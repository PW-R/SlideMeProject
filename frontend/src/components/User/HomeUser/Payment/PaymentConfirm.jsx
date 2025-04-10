import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function PaymentConfirm() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/OrderInfoInputPage">
          <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white">เรียกรถสไลด์</h1>
      </div>

      <div className="pt-[115px] h-[750px] flex flex-col">
        <div className="m-6">
          {/* เลือกตำแหน่ง */}
          <div className="grid grid-cols-[1fr_8fr] gap-4">
            {/* icon */}
            <div className="flex flex-col items-start justify-center relative gap-15">
              <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
              <div className="absolute top-[1.5rem] left-[0.6rem] h-[70px] w-[2px] bg-[#D9D9D9] z-0"></div>
              <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
            </div>
            <div className="flex flex-col gap-4 ">
              <Link to="/StartPosition" className="w-full">
                <div className="h-[52px] rounded-xl bg-gray-100 text-gray-600 px-3 py-3 text-left">
                  ตำแหน่งต้นทาง
                </div>
              </Link>
              <Link to="/Destination" className="w-full">
                <div className="h-[52px] rounded-xl bg-gray-100 text-gray-600 px-3 py-3 text-left">
                  ตำแหน่งปลายทาง
                </div>
              </Link>
            </div>
          </div>

          {/* 3 ปุ่ม  */}
          <div className="grid grid-cols-3 mt-6 gap-2">
            <button
              style={{ fontSize: "13px", borderRadius: "10px" }}
              className="bg-[#0DC964] text-white w-[100px] h-[30px] text-[10px] flex items-center justify-center hover:bg-[#43af56] transition"
            >
              ข้อมูลผู้ให้บริการ
            </button>
            <button
              style={{ fontSize: "13px", borderRadius: "10px" }}
              className="bg-[#0DC964] text-white w-[100px] h-[30px] text-[10px] flex items-center justify-center hover:bg-[#43af56] transition"
            >
              โทรหาผู้ให้บริการ
            </button>
            <button
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
                <p className="mb-0 text-end">2,230</p>
            </div>
            <div className="grid grid-cols-[3fr_1fr]">
                <p className="mb-0">ค่าอุปกรณ์</p>
                <p className="mb-0 text-end">500</p>
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
              style={{ fontSize: "13px", borderRadius: "10px" }}
              className="bg-[#FFC4FF] text-black w-full h-[30px] flex items-center justify-center hover:bg-[#FFA3BA] transition"
            >
              คูปองส่วนลด
            </button>
          </div>

          {/* ปุ่มชำระเงิน-ยกเลิก */}
          <div className="flex justify-center gap-4">
            <button
              style={{ fontSize: "13px", borderRadius: "10px" }}
              className="bg-[#0DC964] text-white w-full h-[30px] flex items-center justify-center hover:bg-[#43af56] transition"
            >
              ชำระเงิน
            </button>
            <button
              style={{ fontSize: "13px", borderRadius: "10px" }}
              className="bg-[#EF1D33] text-white w-full h-[30px] flex items-center justify-center hover:bg-[#ef1d32] transition"
            >
              ยกเลิก
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PaymentConfirm;
