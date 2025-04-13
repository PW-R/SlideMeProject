import { Link } from "react-router-dom";
function ListDriver() {
  return (
    <div className="listDriver-container">
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center">รายการ</h1>
      </div>

      <div className="flex flex-col gap-4 items-center text-center mt-5 ">

        <Link to="/OrderHistoryList">
          <div className="w-[300px] h-[70px] bg-[#68E797] text-white border-none rounded-[15px] hover:bg-[#25D150] transition duration-300">
            ประวัติการทำงาน
          </div>
        </Link>
          
          <Link to="/LocationStore">
          <div className="w-[300px] h-[70px] bg-[#68E797] text-white border-none rounded-[15px] hover:bg-[#25D150] transition duration-300">
            Location
          </div>
          </Link>
    
        <Link to="/OrderStatusList">
          <div className="w-[300px] h-[70px] bg-[#68E797] text-white border-none rounded-[15px] hover:bg-[#25D150] transition duration-300">
            สถานะงาน
          </div>
        </Link>

        <div className="w-[300px] h-[70px] bg-[#68E797] text-white border-none rounded-[15px] hover:bg-[#25D150] transition duration-300">
          งานที่สามารถรับได้
        </div>
        <div className="w-[300px] h-[70px] bg-[#68E797] text-white border-none rounded-[15px] hover:bg-[#25D150] transition duration-300">
          ตารางงาน
        </div>
      </div>
    </div>
  );
}

export default ListDriver;
