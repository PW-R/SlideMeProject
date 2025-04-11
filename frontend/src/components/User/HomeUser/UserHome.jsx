import { Link } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";

function UserHome() {
  return (
    <div>
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">สวัสดี บัว</h1>
      </div>

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

      {/* เลือกตำแหน่ง */}
      <div className="m-6">
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

        <Link to="/OrderInfoInputPage" className="w-[300px] h-[50px] ">
          <div className="w-full h-[52px] rounded-xl bg-[#2CD64B] text-md  text-white flex items-center justify-center hover:bg-[#43af56] transition mt-4 py-2">
            ค้นหาผู้ให้บริการใกล้ฉัน
          </div>
        </Link>

        {/* 3 ปุ่ม ตำแหน่งที่ส้รางไว้ */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Link to="#" className="relative w-fit">
            <i className="bi bi-clock-history text-black text-xl absolute -top-4 -right-2 z-0 pointer-events-none"></i>
            <div className="w-[100px] h-[36px] text-[13px] text-black bg-[#66DC82] rounded-xl px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start relative z-10 cursor-pointer text-left">
              Homecar-อู่รถมั่นคง
            </div>
          </Link>
          <Link to="#" className="relative w-fit">
            <i className="bi bi-clock-history text-black text-xl absolute -top-4 -right-2 z-0 pointer-events-none"></i>
            <div className="w-[100px] h-[36px] text-[13px] text-black bg-[#66DC82] rounded-xl px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start relative z-10 cursor-pointer text-left">
              Homecar-ร้านจันทร์ฉาย
            </div>
          </Link>
          {/* ปุ่ม + สร้างตำแหน่ง*/}
          <Link to="#" className="relative w-fit">
            <div className="w-[100px] h-[36px] text-[11px] text-black bg-[#66DC82] rounded-xl px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-center cursor-pointer">
              <i className="bi bi-plus-circle text-lg flex items-center"></i>
            </div>
          </Link>
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
        
      </div>
    </div>
  );
}

export default UserHome;
