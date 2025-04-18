import { Link } from "react-router-dom";
function OrderHistoryList() {
  return (
    <div style={{ overflow: "hidden" }} className="pb-32">
      <div className="w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000] relative">
        {/* ปุ่มย้อนกลับ */}
        <Link to="/ListDriver">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>

        {/* หัวข้อ Order History */}
        <div className="text-white text-center">
          <h1 className="text-lg font-bold">Order History</h1>
        </div>
      </div>

      <Link to={"/OrderhistoryDetail"}>
        <div className="flex mt-4 ml-4 font-bold w-full">
          <div className="icon">
            <img src="./car_icon.svg" />
          </div>
          <div className="ml-4 mt-auto w-full ">
            <p className="mt-0 !gap-0">Don Muang Toll Way</p>
            <p className="">#45567389</p>
            <i className="bi bi-cash-coin"> 2310 ฿</i>
            <p>01/11/2560 | 13.30</p>
            <hr className="w-[150px] !border-t-2 border-![#13703E] mr-0" />
          </div>
        </div>
      </Link>

      <div className="flex mt-2 ml-4 font-bold w-full">
        <div className="icon">
          <img src="./car_icon.svg" />
        </div>
        <div className="ml-4 mt-auto w-full ">
          <p className="mt-0 !gap-0">336, Khwaeng Phon</p>
          <p className="">#45567391</p>
          <i className="bi bi-cash-coin"> 3540 ฿</i>
          <p>07/11/2560 | 15.45</p>
          <hr className="w-[150px] !border-t-2 border-![#13703E] mr-0" />
        </div>
      </div>

      <div className="flex mt-2 ml-4 font-bold w-full">
        <div className="icon">
          <img src="./car_icon.svg" />
        </div>
        <div className="ml-4 mt-auto w-full ">
          <p className="mt-0 !gap-0">Near Soi Vibhavadi Rangsit 20</p>
          <p className="">#45567397</p>
          <i className="bi bi-cash-coin"> 4500 ฿</i>
          <p>16/11/2560 | 12.00</p>
          <hr className="w-[150px] !border-t-2 border-![#13703E] mr-0" />
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryList;
