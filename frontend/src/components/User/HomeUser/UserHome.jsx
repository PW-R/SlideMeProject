import { Link } from "react-router-dom";

function UserHome() {

  return (
    <div>
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white">สวัสดี เจน</h1>
      </div>

      <Link to="/UserLayout/OrderInfoInputPage">
        <button>ค้นหาผู้ให้บริการใกล้ฉัน</button>
      </Link>
      <br />
      <Link to="/UserLayout/ShopReccommend">
        <button>ร้านแนะนำ</button>
      </Link>
    </div>
  );
}

export default UserHome;
