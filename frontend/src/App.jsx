import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//Login and Register
import DriverorUser from "./components/LoginandRegister/DriverorUser";
import LoginUser from "./components/LoginandRegister/LoginUser";
import LoginDriver from "./components/LoginandRegister/LoginDriver";
import RegisterDirver from "./components/LoginandRegister/RegisterDirver";
import Forgotpass from "./components/LoginandRegister/Forgotpass";



// User
import UserLayout from "./components/User/UserLayout";
import ShopReccommend from "./components/User/HomeUser/ShopReccommend";
import InputInfo from "./components/User/HomeUser/InputInfo/OrderInfoInputPage";
import UserHome from "./components/User/HomeUser/UserHome";

//Driver
import DriverLayout from "./components/Driver/DriverLayout";
import HomeCustomize from "./components/Driver/HomeDriver/HomeCustomize";
import ListDriver from "./components/Driver/ListDriver/ListDriver";
import DriverNotificationList from "./components/Driver/NotificationDriver/NotificationList";
import OrderHistoryList from "./components/Driver/ListDriver/OrderHistory/OrderHistoryList";
import OrderStatusList from "./components/Driver/ListDriver/OrderStatus/OrderStatusList";
import IncomingOrder from "./components/Driver/ListDriver/IncomingOrder/IC_OrderList";
import CreateAndjoin from "./components/Driver/CreatestoreAndJoin/CreateAndjoin";
import CreateStore from "./components/Driver/CreatestoreAndJoin/Createstore";
import JoinStore from "./components/Driver/CreatestoreAndJoin/joinStore";

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
            <Route path="/Forgotpass" element={<Forgotpass />} />
            

            {/* User */}
            <Route  element={<UserLayout />}>
              <Route path="UserHome" element={<UserHome />} />
              <Route path="ShopReccommend" element={<ShopReccommend />} />
              <Route path="OrderInfoInputPage" element={<InputInfo />} />
            </Route>

            {/* Driver */}
            <Route  element={<DriverLayout />}>
            <Route path="/HomeCustomize" element={<HomeCustomize />} />
            <Route path="/ListDriver" element={<ListDriver />} />
            <Route path="/DriverNotificationList" element={<DriverNotificationList />} />\
            <Route path="/OrderHistoryList" element={<OrderHistoryList />} />
            <Route path="/OrderStatusList" element={<OrderStatusList />} />
            <Route path="/IncomingOrder" element={<IncomingOrder />} />
            <Route path="/CreateAndjoin" element={<CreateAndjoin />} />
            <Route path="/Createstore" element={<CreateStore />} />
            <Route path="/Joinstore" element={<JoinStore />} />
            </Route>
           

            
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
