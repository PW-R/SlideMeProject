import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//Login and Register
import DriverorUser from "./components/LoginandRegister/DriverorUser";
import LoginUser from "./components/LoginandRegister/LoginUser";
import LoginDriver from "./components/LoginandRegister/loginDriver";
// User
import UserLayout from "./components/User/UserLayout";

import ShopReccommend from "./components/User/HomeUser/ShopReccommend";
import InputInfo from "./components/User/HomeUser/InputInfo/OrderInfoInputPage";

//Driver

import HomeCustomize from "./components/Driver/HomeDriver/HomeCustomize";
import ListDriver from "./components/Driver/ListDriver/ListDriver";
import "./index.css";
import "./App.css";

import UserHome from "./components/User/HomeUser/UserHome";


function App() {
  return (
    <div className="app">
      <div className="app-router">
        <HashRouter>
          <Routes>
            <Route path="/" element={<DriverorUser />}>
              <Route path="UserHome" element={<UserHome/>} />
              <Route path="ShopReccommend" element={<ShopReccommend />} />
              <Route path="OrderInfoInputPage" element={<InputInfo />} />
              <Route path="HomeCustomize" element={<HomeCustomize />} />
              <Route path="LoginUser" element={<LoginUser />} />
              <Route path="LoginDriver" element={<LoginDriver/>} />
      
            </Route>
          </Routes>
        </HashRouter>

        {/* <h1 className="text-red-500">TailwindCSS! RED</h1> */}

      </div>
    </div>
  );
}

export default App;
