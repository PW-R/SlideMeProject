import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { PositionProvider } from "./components/User/MAP/PositionContext";

import { useLoadScript } from "@react-google-maps/api";
// import MapViewSearch from "./components/User/MapViewSearch";
// import MapDistance from "./components/User/MapDistance";
const libraries = ["places"];

//Login and Register
import DriverorUser from "./components/LoginandRegister/DriverorUser";
import LoginUser from "./components/LoginandRegister/LoginUser";
import LoginDriver from "./components/LoginandRegister/LoginDriver";
import RegisterDirver from "./components/LoginandRegister/RegisterDirver";
import Forgotpass from "./components/LoginandRegister/Forgotpass";

// Account
import UserAccount from "./components/Account/UserAccount"
import PresetPosition from "./components/Account/UserAccount/PresetPosition";
import EditUserProfile from "./components/Account/UserAccount/EditUserProfile";

// User
import RegisterUser from "./components/LoginandRegister/RegisterUser";
import UserLayout from "./components/User/UserLayout";
import UserMassage from "./components/User/UserMessage";
import UserHome from "./components/User/HomeUser/UserHome";
import StartPosition from "./components/User/HomeUser/PresetPosition/StartPosition";
import Destination from "./components/User/HomeUser/PresetPosition/Destination";
import ShopReccommend from "./components/User/HomeUser/ShopReccommend";
import InputInfo from "./components/User/HomeUser/InputInfo/OrderInfoInputPage";
import DCSS from "./components/User/HomeUser/DCSS/DCSS";
import PaymentConfirm from "./components/User/HomeUser/Payment/PaymentConfirm";
import PaymentCompleted from "./components/User/HomeUser/Payment/PaymentCompleted";
import Receipt from "./components/User/HomeUser/Payment/Receipt";
import DriverDetail from "./components/User/HomeUser/DCSS/DriverDetail";
import ShopDetail from "./components/User/HomeUser/DCSS/ShopDetail";
import UseCoupon from "./components/User/HomeUser/Payment/UseCoupon";
import OrderStatusListUser from "./components/User/ListUser/PendingOrder/OrderStatusList";
import AllCoupon from "./components/User/HomeUser/AllCoupon";
import ListPendingOrder from "./components/User/ListUser/ListPendingOrder";
import Review from "./components/User/ListUser/PendingOrder/Review";
import ListOrderHistory from "./components/User/ListUser/ListOrderHistory";
import NotiUser from "./components/User/NotificationUser/NotiUser";


//Driver
import DriverLayout from "./components/Driver/DriverLayout";
import HomeCustomize from "./components/Driver/HomeDriver/HomeCustomize";
import ListDriver from "./components/Driver/ListDriver/ListDriver";
import DriverNotificationList from "./components/Driver/NotificationDriver/NotificationList";
import OrderHistoryList from "./components/Driver/ListDriver/OrderHistory/OrderHistoryList";
import OrderStatusList from "./components/Driver/ListDriver/OrderStatus/OrderStatusList";
import IncomingOrder from "./components/Driver/ListDriver/IncomingOrder/ICOrderList";
import CreateAndjoin from "./components/CreatestoreAndJoin/CreateAndjoin";
import CreateStore from "./components/CreatestoreAndJoin/Createstore";
import JoinStore from "./components/CreatestoreAndJoin/joinStore";
import LocationStore from "./components/Driver/ListDriver/OrderLocation/LocationStore";
import OrderhistoryDetail from "./components/Driver/ListDriver/OrderHistory/OrderhistoryDetail";
import StoreAccount from "./components/Account/StoreAccount";
import DriverAccount from "./components/Account/DriverAccount";
import EditDriverAccount from "./components/Account/DriverAccount/EditDriverAccount";
import RoleEmployee from "./components/Driver/EmployeeSystem/RoleEmployee";
import RequestJoin from "./components/Driver/EmployeeSystem/RequestJoin";
import OrderInfo from "./components/Driver/ListDriver/OrderStatus/OrderInfo";
import ICOrderList from "./components/Driver/ListDriver/IncomingOrder/ICOrderList";
import IncomingOrderInfo from "./components/Driver/ListDriver/IncomingOrder/IncomingOrderInfo";
import OrderPayment from "./components/Driver/ListDriver/IncomingOrder/OrderPayment";
import OrderConfirmation from "./components/Driver/ListDriver/IncomingOrder/OrderConfirmation";
import OrderSchedue from "./components/Driver/ListDriver/OrderSchedue";
import PendingOrderLocation from "./components/Driver/ListDriver/OrderLocation/PendingOrderLocation";
import DriverMessage from "./components/Driver/DriverMessage";
import StoreMapPicker from "./components/CreatestoreAndJoin/StoreMapPicker";


import "./index.css";
import "./App.css";

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCA8YK8fH-zeQ7WM8237ERUOFDbQlIx89E", // อย่าลืมเก็บ API Key ไว้อย่างปลอดภัย
    libraries: libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <PositionProvider>
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
                <Route path="/DCSS/:orderId" element={<DCSS />} />
                <Route path="DriverDetail/:orderId" element={<DriverDetail />} />
                <Route path="ShopDetail/:orderId" element={<ShopDetail />} />
                <Route
                  path="PaymentConfirm/:orderId"
                  element={<PaymentConfirm />}
                />
                <Route path="PaymentCompleted/:orderId" element={<PaymentCompleted />} />
                <Route path="Receipt/:orderId" element={<Receipt />} />
                <Route path="UseCoupon/:orderId" element={<UseCoupon />} />
                <Route
                  path="OrderStatusListUser/:orderId"
                  element={<OrderStatusListUser />}
                />
                <Route path="ListPendingOrder" element={<ListPendingOrder />} />
                <Route path="ListOrderHistory" element={<ListOrderHistory />} />
                <Route path="NotiUser" element={<NotiUser />} />
                <Route path="UserAccount" element={<UserAccount />} />
                <Route path="PresetPosition" element={<PresetPosition />} />
                <Route path="EditUserProfile" element={<EditUserProfile />} />
                <Route path="Review" element={<Review />} />
                <Route path="UserMassage" element={<UserMassage />} />
                <Route path="AllCoupon" element={<AllCoupon />} />
              </Route>
            {/* Map */}
              <Route path="/StoreMapPicker" element={<StoreMapPicker/>} />

            {/* Driver */}
            <Route element={<DriverLayout />}>
              <Route path="/HomeCustomize" element={<HomeCustomize />} />
              <Route path="/ListDriver" element={<ListDriver />} />
              <Route path="/DriverNotificationList" element={<DriverNotificationList />}/>
              <Route path="/OrderHistoryList" element={<OrderHistoryList />} />
              <Route path="/OrderStatusList" element={<OrderStatusList />} />
              <Route path="/IncomingOrder" element={<IncomingOrder />} />
              <Route path="/LocationStore" element={<LocationStore />} />
              <Route path="/OrderhistoryDetail" element={<OrderhistoryDetail />} />
              <Route path="/StoreAccount" element={<StoreAccount />} />
              <Route path="/DriverAccount" element={<DriverAccount />} />
              <Route path="/EditDriverAccount" element={<EditDriverAccount />} />
              <Route path="/RoleEmployee" element={<RoleEmployee />} />
              <Route path="/RequestJoin" element={<RequestJoin />} />
              <Route path="/OrderInfo" element={<OrderInfo />} />
              <Route path="/ICOrderList" element={<ICOrderList />} />
              <Route path="/IncomingOrderInfo" element={<IncomingOrderInfo />} />
              <Route path="/OrderPayment" element={<OrderPayment />} />
              <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
              <Route path="/OrderSchedue" element={<OrderSchedue />} />
              <Route path="/PendingOrderLocation" element={<PendingOrderLocation />} />
              <Route path="DriverMessage" element={<DriverMessage />} />
              
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
    </PositionProvider>
  );
}

export default App;
