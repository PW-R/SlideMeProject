import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserNavBar from "./UserNavBar";

function UserLayout() {
  const location = useLocation();

  const hideNavBarRoutes = [
    "/StartPosition",
    "/Destination",
    "/DriverDetail/:orderId",
    "/OrderStatusListUser",
    "/Receipt/:orderId",
    "/PaymentCompleted/:orderId",
    "/UserMassage",
  ];
  const shouldHideNavBar = hideNavBarRoutes.some(route =>
    location.pathname.startsWith(route.replace(/:orderId/, ""))
  );

  return (
    <AppWrapper>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-auto scrollbar-hide">
          <Outlet />
        </div>
        {!shouldHideNavBar && <UserNavBar />}
      </div>
    </AppWrapper>
  );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-red-300 shadow-xl overflow-auto relative">
      {children}
    </div>
  );
}

export default UserLayout;
