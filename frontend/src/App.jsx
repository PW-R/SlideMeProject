import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Login and Register
import DriverorUser from "./components/LoginandRegister/DriverorUser";
import LoginUser from "./components/LoginandRegister/LoginUser";
import LoginDriver from "./components/LoginandRegister/LoginDriver";
import RegisterDirver from "./components/LoginandRegister/RegisterDirver";
import Forgotpass from "./components/LoginandRegister/Forgotpass";

// Account
import UserAccount from "./components/Account/UserAccount"

// User
import RegisterUser from "./components/LoginandRegister/RegisterUser";
import UserLayout from "./components/User/UserLayout";
import UserHome from "./components/User/HomeUser/UserHome";
import StartPosition from "./components/User/HomeUser/PresetPosition/StartPosition";
import Destination from "./components/User/HomeUser/PresetPosition/Destination";
import ShopReccommend from "./components/User/HomeUser/ShopReccommend";
import InputInfo from "./components/User/HomeUser/InputInfo/OrderInfoInputPage";
import DCSS from "./components/User/HomeUser/DCSS/DCSS";
import PaymentConfirm from "./components/User/HomeUser/Payment/PaymentConfirm";
import ShopDetail from "./components/User/HomeUser/DCSS/ShopDetail";
import Coupon from "./components/User/HomeUser/Payment/Coupon";

import ListPendingOrder from "./components/User/ListUser/ListPendingOrder";
import ListOrderHistory from "./components/User/ListUser/ListOrderHistory";
import NotiUser from "./components/User/NotificationUser/NotiUser";

//Driver
import DriverLayout from "./components/Driver/DriverLayout";
import HomeCustomize from "./components/Driver/HomeDriver/HomeCustomize";
import ListDriver from "./components/Driver/ListDriver/ListDriver";
import DriverNotificationList from "./components/Driver/NotificationDriver/NotificationList";
import OrderHistoryList from "./components/Driver/ListDriver/OrderHistory/OrderHistoryList";
import OrderStatusList from "./components/Driver/ListDriver/OrderStatus/OrderStatusList";
import IncomingOrder from "./components/Driver/ListDriver/IncomingOrder/IC_OrderList";
import CreateAndjoin from "./components/CreatestoreAndJoin/CreateAndjoin";
import CreateStore from "./components/CreatestoreAndJoin/Createstore";
import JoinStore from "./components/CreatestoreAndJoin/joinStore";

import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-router">
        <HashRouter>
          <Routes>
            {/* Login */}
            <Route path="/" element={<DriverorUser />} />
            <Route path="/LoginDriver" element={<LoginDriver />} />
            <Route path="/LoginUser" element={<LoginUser />} />
            <Route path="/RegisterDriver" element={<RegisterDirver />} />
            <Route path="/RegisterUser" element={<RegisterUser />} />
            <Route path="/Forgotpass" element={<Forgotpass />} />
            <Route path="/CreateAndjoin" element={<CreateAndjoin />} />
            <Route path="/CreateStore" element={<CreateStore />} />
            <Route path="/JoinStore" element={<JoinStore />} />
            
            {/* User */}
            <Route element={<UserLayout />}>
              <Route path="UserHome" element={<UserHome />} />
              <Route path="StartPosition" element={<StartPosition />} />
              <Route path="Destination" element={<Destination />} />
              <Route path="ShopReccommend" element={<ShopReccommend />} />
              <Route path="OrderInfoInputPage" element={<InputInfo />} />
              <Route path="DCSS" element={<DCSS />} />
              <Route path="PaymentConfirm" element={<PaymentConfirm />} />
              <Route path="ShopDetail" element={<ShopDetail />} />
              <Route path="Coupon" element={<Coupon />} />
              
              <Route path="ListPendingOrder" element={<ListPendingOrder />} />
              <Route path="ListOrderHistory" element={<ListOrderHistory />} />
              <Route path="NotiUser" element={<NotiUser />} />
              <Route path="UserAccount" element={<UserAccount />} />
            </Route>

            {/* Driver */}
            <Route element={<DriverLayout />}>
              <Route path="/HomeCustomize" element={<HomeCustomize />} />
              <Route path="/ListDriver" element={<ListDriver />} />
              <Route
                path="/DriverNotificationList"
                element={<DriverNotificationList />}
              />
              \
              <Route path="/OrderHistoryList" element={<OrderHistoryList />} />
              <Route path="/OrderStatusList" element={<OrderStatusList />} />
              <Route path="/IncomingOrder" element={<IncomingOrder />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
