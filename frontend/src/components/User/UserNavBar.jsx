// import { useState } from "react";
import { Link } from "react-router-dom";

function UserNavBar() {
  return (
    <div className="UserNavBar">
      <Link to="UserHome">
        <button>
          <i className="bi bi-house-door"></i>
          หน้าหลัก
        </button>
      </Link>

      <Link to="#">
        <button>
          <i className="bi bi-list"></i>
          รายการ
        </button>
      </Link>

      <Link to="#">
        <button>
          <i className="bi bi-bell"></i>
          แจ้งเตือน
        </button>
      </Link>

      <Link to="#">
        <button>
          <i className="bi bi-person-circle"></i>
          บัญชี
        </button>
      </Link>
    </div>
  );
}

export default UserNavBar;
