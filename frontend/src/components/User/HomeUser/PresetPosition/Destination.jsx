import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePosition } from "../../MAP/PositionContext";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function Destination() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const location = useLocation();

  const [position, setPosition] = useState(null);
  const { origin, destination, setOrigin, setDestination } = usePosition();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  // const [address, setAddress] = useState("");
  // const [placeName, setPlaceName] = useState("");
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  
  // แก้ไอคอน
  const customIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
          stroke="gray" stroke-width="0.5" />
        </svg>
      `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500); // รอ 500ms หลังจากที่ผู้ใช้หยุดพิมพ์

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // ค้นหาตำแหน่งจากชื่อสถานที่
  const handleSearch = async (query) => {
    setSearchQuery(query);

    const trimmedQuery = query.trim();

    if (!trimmedQuery || /^[^\wก-๙]+$/.test(trimmedQuery)) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmedQuery)}&addressdetails=1&limit=5&countrycodes=TH&accept-language=th,en`
      );
      const data = await res.json();

      // จัดลำดับให้ภาษาไทยก่อนภาษาอังกฤษ
      if (Array.isArray(data)) {
        // ถ้าเป็น array ให้ใช้ map ได้
        const processedResults = data.map((result) => {
          const displayName = result.display_name;
          const isThai = /[\u0E00-\u0E7F]/.test(displayName); // ตรวจสอบว่ามีภาษาไทยหรือไม่
          return {
            ...result,
            display_name: isThai ? displayName : `${displayName} (EN)`, // ภาษาไทยเป็นหลัก หากไม่มีเพิ่ม "(EN)"
          };
        });

        setSearchResults(processedResults);
      } else {
        // ถ้าไม่ใช่ array ให้แสดงข้อผิดพลาดหรือทำอย่างอื่น
        console.error("Expected an array, but got:", data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleSelectResult = (place) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);

    const selectedData = {
      position: {
        lat,
        lng,
      },
      name: place.display_name.split(",")[0],
      address: place.display_name,
      // const lat = parseFloat(place.lat);
      // const lng = parseFloat(place.lon);
      // setPosition([lat, lng]);
      // setSelectedLocation({ lat, lng });
      // setPlaceName(place.display_name.split(",")[0]); // ชื่อสถานที่ (เลือกแค่ส่วนแรก)
      // setAddress(place.display_name); // ที่อยู่เต็ม
      // setSearchResults([]);
      // setInfoWindowOpen(true);
    };
    // sessionStorage.setItem("setDestination", JSON.stringify(selectedData));
    setDestination(selectedData);
    setSearchResults([]);
    setInfoWindowOpen(true);
  };
  
  // const onMapLoad = (mapInstance) => {
  //   setMap(mapInstance);
  // };

  // ฟังก์ชั่นสำหรับย้อนกลับ
  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirmDestination = () => {
    if (!destination || !destination.position) {
      alert("กรุณาเลือกตำแหน่งก่อนยืนยัน");
      return;
    }
    // setDestination(selectedData);
    // sessionStorage.setItem("setDestination", JSON.stringify(destination));
    navigate(-1);
  };
  
  return (
    <div>
      {/* header */}
      <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <i
          onClick={handleBack}
          className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4 cursor-pointer"
        ></i>
        <h1 className="text-white">ตำแหน่งปลายทาง</h1>
      </div>

      <div className="pt-[115px] h-[840px] flex flex-col justify-between relative ">
        {/* ค้นหาตำแหน่ง */}
        <div className="absolute m-4 z-[1000] bg-white rounded-xl">
          <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ค้นหาสถานที่"
            className="w-[340px] h-[52px] rounded-xl pl-10 pr-3 py-2 text-base text-gray-900 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div
                  key={result.place_id}
                  className="search-result-item"
                  onClick={() => handleSelectResult(result)}
                >
                  <p className="font-medium">
                    {result.display_name.split(",")[0]}
                  </p>
                  <p className="text-sm text-gray-600">{result.display_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MapView */}
        <MapContainer
          center={[13.736717, 100.523186]} // Bangkok default
          zoom={13}
          style={{ height: "80vh", width: "100%" }}
          whenCreated={(map) => (mapRef.current = map)}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapClickHandler />
          {destination && destination.position && (
            <Marker
              position={[destination.position.lat, destination.position.lng]}
              icon={customIcon}
            >
              <Popup>
                <b>{destination.name}</b>
                <br />
                {destination.address}
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* ตำแหน่งที่เลือก */}
        <div className="w-full h-[170px] bg-amber-50 flex flex-col gap-3 items-center justify-center mt-2 mb-4 px-6">
          <div className="mb-0 text-center">
            <p className="font-bold text-2xl mb-0">ตำแหน่งที่เลือก</p>
            <p className="font-bold text-lg mb-0">
              {destination?.name || "ยังไม่เลือกสถานที่"}
            </p>
            <p className="text-sm mb-0">{destination?.address}</p>
          </div>
          <button
            onClick={handleConfirmDestination}
            style={{ borderRadius: "50px" }}
            className="rounded-2xl bg-[#0DC964] text-white w-[200px] h-[40px] font-bold text-l flex items-center justify-center hover:bg-[#43af56] transition"
          >
            ยืนยันตำแหน่ง
          </button>
        </div>
      </div>
    </div>
  );
}

export default Destination;
