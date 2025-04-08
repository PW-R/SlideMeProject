import { HashRouter, Routes, Route } from "react-router-dom";

// User
import UserLayout from "./components/User/UserLayout";
import UserHome from "./components/User/HomeUser/UserHome";
import ShopReccommend from "./components/User/HomeUser/ShopReccommend";
import InputInfo from "./components/User/HomeUser/InputInfo/OrderInfoInputPage";

import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-router">
        <HashRouter>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route path="UserHome" element={<UserHome />} />
              <Route path="ShopReccommend" element={<ShopReccommend />} />
              <Route path="OrderInfoInputPage" element={<InputInfo />} />
            </Route>
          </Routes>
        </HashRouter>

        {/* <h1 className="text-red-500">TailwindCSS! RED</h1> */}

      </div>
    </div>
  );
}

export default App;
