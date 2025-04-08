import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserNavBar from "./UserNavBar";

function UserLayout() {
  const location = useLocation();

  // map เส้นทางไปยังชื่อหัว
  const headerTitles = {
    "/UserHome": "สวัสดี เจน",
    "/ShopReccommend": "ร้านแนะนำ",
    "/OrderInfoInputPage": "ค้นหาสถานที่",
  };

  const currentPath = location.pathname;
  const title = headerTitles[currentPath] || "Home";

  return (
    <AppWrapper>
      <div className="flex flex-col h-full">
        <UserHeader title={title} />
        <Outlet />
        <UserNavBar />
      </div>
    </AppWrapper>
  );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-red-300 shadow-xl overflow-auto">
      {children}
    </div>
  );
}

export default UserLayout;
