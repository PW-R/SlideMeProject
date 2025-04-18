import {Link} from "react-router-dom";
function IC_OrderList() {
    return (
      <div>
        <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
           {/* ปุ่มย้อนกลับ */}
        <Link to="/ListDriver">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
          <h1 className="text-white text-center">งานที่สามารถรับได้</h1>
        </div>

        <Link to="/IncomingOrderInfo">
          <div className="flex mt-4 ml-4 font-bold w-full">
            <div className="icon">
              <img src="./car_location.svg" />
            </div>
            <div className="mt-auto w-full leading-none ml-2">
              <p className="mt-0 text-[#15BC11]">Don Muang Toll Way, Khwaeng</p>
              <p className="text-[#004AAD]">#2334336</p>

              <div className="w-[270px] h-auto bg-[#E5E5E5] rounded-2xl p-4 leading-none">
                <p>รถสไลด์ขนาดกลาง</p>
                <p>2130 ฿</p>
                <p>13 ตุลาคม 2567 เวลา 13.00</p>
              </div>
            </div>
          </div>
          </Link>

      </div>
    );
}

export default IC_OrderList;