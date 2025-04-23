import { Link, useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import RoutingMachine from "./RoutingMachine";
import "bootstrap-icons/font/bootstrap-icons.css";

function PendingOrderLocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const offerData = location.state;

  const position =
    offerData?.startLat && offerData?.startLng
      ? [offerData.startLat, offerData.startLng]
      : [13.736717, 100.523186];

  const handleMessage = () => {
    navigate("/DriverMessage");
  };

  // กำหนด icon ของ marker
  const customIcon = L.divIcon({
  html: '<i class="bi bi-geo-alt-fill text-danger fs-3"></i>',
  className: '', 
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});
  L.Marker.prototype.options.icon = customIcon;

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Header */}
      <div className="fixed w-full max-w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/ListDriver">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-lg font-bold">ดำเนินงาน</h1>
      </div>

      {/* Content */}
      <div className="pt-[125px] pb-[80px]">
        {/* แผนที่ */}
        <div className="w-full h-[270px] min-h-[270px]">
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "270px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RoutingMachine
              start={[offerData?.startLat, offerData?.startLng]}
              end={[offerData?.endLat, offerData?.endLng]}
            />
            <Marker position={[offerData?.startLat, offerData?.startLng]}>
              <Popup>
                จุดเริ่มต้น
                <br />
                {offerData?.startLocation}
              </Popup>
            </Marker>

            <Marker position={[offerData?.endLat, offerData?.endLng]}>
              <Popup>
                จุดปลายทาง
                <br />
                {offerData?.endLocation}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* ราคา */}
        <div className="text-center mt-2">
          <p className="text-[#0dc964] text-xl font-bold">
            {offerData?.total} THB
          </p>
        </div>

        <hr className="border-gray-300 mx-2 my-2" />

        {/* จุดเริ่มต้น */}
        <div className="flex items-start px-6 py-1">
          <p className="text-[16px] text-black leading-tight">
            {offerData?.startLocation}
          </p>
        </div>

        {/* จุดสิ้นสุด */}
        <div className="flex items-start px-6 py-1">
          <p className="text-[16px] text-black leading-tight">
            {offerData?.endLocation}
          </p>
        </div>

        {/* ปุ่มโทร/แชท */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <button className="bg-[#0dc964] w-[50px] h-[50px] rounded-full shadow text-white">
            <i className="bi bi-telephone-fill text-lg"></i>
          </button>
          <button
            className="bg-[#0dc964] w-[50px] h-[50px] rounded-full shadow text-white"
            onClick={handleMessage}
          >
            <i className="bi bi-chat-dots-fill text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingOrderLocation;
