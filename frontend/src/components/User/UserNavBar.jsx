// import { useState } from "react";
import { Link } from "react-router-dom";

function UserNavBar() {

  return (
    <div className="flex justify-center items-center absolute bottom-5 left-1/2 transform -translate-x-1/2 gap-8 p-0 rounded-4xl bg-[#0dc964] w-[300px] h-[60px]" >
      <Link to="UserHome">
        <button className="flex flex-col items-center border-none bg-transparent">
          <i className="bi bi-house-door mt-3 text-white text-2xl"></i>
          <p className="text-white text-xs no-underline">หน้าหลัก</p>
        </button>
      </Link>

      <Link to="ListPendingOrder">
        <button className="flex flex-col items-center border-none bg-transparent">
          <i className="bi bi-list mt-3 text-white text-2xl"></i>
          <p className="text-white text-xs no-underline">รายการ</p>
        </button>
      </Link>

      <Link to="NotiUser">
        <button className="flex flex-col items-center border-none bg-transparent">
          <i className="bi bi-bell mt-3 text-white text-2xl"></i>
          <p className="text-white text-xs no-underline">แจ้งเตือน</p>
        </button>
      </Link>

      <Link to="UserAccount">
        <button className="flex flex-col items-center border-none bg-transparent">
          <i className="bi bi-person-circle mt-3 text-white text-2xl"></i>
          <p className="text-white text-xs no-underline">บัญชี</p>
        </button>
      </Link>
    </div>
  );
}

export default UserNavBar;
