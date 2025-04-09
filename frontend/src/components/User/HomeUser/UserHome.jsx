import { Link } from "react-router-dom";

function UserHome() {

  return (
    <div>
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">สวัสดี เจน</h1>
      </div>

      <div className="m-6 mt-3">
        <h3>Towing Services <br />
        Help You From Stuck</h3>
        {/* รูปโลโก้ */}
      </div>
      
      {/* เลือกตำแหน่ง */}
      <div className="grid grid-cols-[1fr_8fr] gap-4 m-6">
        <div className="flex flex-col items-start justify-center relative gap-10">
          <div className="flex justify-center items-center w-5 h-5 bg-[#F84C4C] rounded-full relative z-20"></div>
          {/* เส้นสีเทา */}
          <i className="bi bi-geo-alt text-[1.5rem] text-[#0dc964] relative z-10"></i>
        </div>

        <div className="flex flex-col gap-4">
            <button className="w-full bg-gray-300 text-black px-4 py-2 rounded-xl text-left">
              ตำแหน่งต้นทาง
            </button>
            <button className="w-full bg-gray-300 text-black px-4 py-2 rounded-xl text-left">
              ตำแหน่งปลายทาง
            </button>
        </div>
      </div>

      {/* เช้คว่ามันกดได้ทั้งกรอบสีเขียวเลยมั้ย */}
      <div className="rounded-xl bg-[#2CD64B] m-6">
        <Link to="/OrderInfoInputPage">
          <button className=' w-[300px] h-[50px]'>
            <p className='text-black mb-1 '>ค้นหาผู้ให้บริการใกล้ฉัน</p>
          </button>
        </Link>
      </div>

      {/* สามปุ่ม */}
      <div className="grid grid-cols-3 gap-4 m-6 mt-8">
        {/* ปุ่ม Homecar-อู่รถมั่นคง */}
        <div className="relative w-fit">
          <i className="bi bi-clock-history text-black text-xl absolute -top-4 -right-4 z-0 pointer-events-none"></i>
          <button className="w-[100px] h-[36px] text-[13px] text-black bg-[#66DC82] rounded-[5px] px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start relative z-10 cursor-pointer text-left">
            Homecar-อู่รถมั่นคง
          </button>
        </div>

        {/* ปุ่ม Homecar-ร้านจันทร์ฉาย */}
        <div className="relative w-fit">
          <i className="bi bi-clock-history text-black text-xl absolute -top-4 -right-4 z-0 pointer-events-none"></i>
          <button className="w-[100px] h-[36px] text-[13px] text-black bg-[#66DC82] rounded-[5px] px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start relative z-10 cursor-pointer text-left">
            Homecar-ร้านจันทร์ฉาย
          </button>
        </div>

        {/* ปุ่ม + */}
        <div>
          <button className="w-[100px] h-[36px] text-[11px] text-black bg-[#66DC82] rounded-[5px] px-2 py-1 border-none overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-center cursor-pointer">
            <i className="bi bi-plus-circle text-lg flex items-center"></i>
          </button>
        </div>
      </div>
      <br />
      <Link to="/ShopReccommend">
        <button>ร้านแนะนำ</button>
      </Link>
      {/* <div className="summon-advert">
        <Carousel>
            <Carousel.Item interval={1000}>
                <img className="d-block w-100" src="./car.png" alt="First slide"/>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img className="d-block w-100" src="./car2.png" alt="Second slide"/>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img className="d-block w-100" src="./car3.png" alt="Third slide"/>
            </Carousel.Item>
        </Carousel>
      </div> */}

    </div>
  );
}

export default UserHome;
