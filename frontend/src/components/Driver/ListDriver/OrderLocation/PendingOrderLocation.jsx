import { Link } from "react-router-dom";

const mockOrder = {
  price: 2130,
  from: {
    label: "กรุง ออร์ แอร์ 61 ถ. หลังสวน แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
    icon: "bi bi-geo-alt-fill",
    color: "text-red-500"
  },
  to: {
    label: "บัวรถโสติเคร์ 67/8 หมู่ที่ 7 ตำบลมหาสวัสดิ์ อำเภอบางกรวย นนทบุรี 11130",
    icon: "bi bi-geo-alt",
    color: "text-green-500"
  },
  mapImage: "/mock_map.png"
};

function PendingOrderLocation() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="fixed w-full max-w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/OrderInfoInputPage">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-lg font-bold">ดำเนินงาน</h1>
      </div>

      {/* Content */}
      <div className="pt-[125px] pb-[80px]">
        {/* แผนที่ */}
        <div className="w-full h-[270px]">
          <img
            src={mockOrder.mapImage}
            alt="Map"
            className="w-[300px] h-full object-cover mx-auto"
          />
        </div>

        {/* ราคา */}
        <div className="text-center mt-2">
          <p className="text-[#0dc964] text-xl font-bold">{mockOrder.price} THB</p>
        </div>

        <hr className="border-gray-300 mx-2 my-2" />

        {/* จุดเริ่มต้น */}
        <div className="flex items-start px-6 py-1">
          <i className={`${mockOrder.from.icon} ${mockOrder.from.color} mr-2`}></i>
          <p className="text-[16px] text-black leading-tight">{mockOrder.from.label}</p>
        </div>

        {/* จุดสิ้นสุด */}
        <div className="flex items-start px-6 py-1">
          <i className={`${mockOrder.to.icon} ${mockOrder.to.color} mr-2`}></i>
          <p className="text-[16px] text-black leading-tight">{mockOrder.to.label}</p>
        </div>

        {/* ปุ่มโทร/แชท */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <button className="bg-[#0dc964] w-[50px] h-[50px] rounded-full shadow text-white">
            <i className="bi bi-telephone-fill text-lg"></i>
          </button>
          <button className="bg-[#0dc964] w-[50px] h-[50px] rounded-full shadow text-white">
            <i className="bi bi-chat-dots-fill text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingOrderLocation;
