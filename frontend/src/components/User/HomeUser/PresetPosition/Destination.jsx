import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapViewSearch from "../../MapViewSearch";


function Destination() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [map, setMap] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() && map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: query,
        fields: ["formatted_address", "geometry", "name"],
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSearchResults(results);
        }
      });
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectResult = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setSelectedLocation({ lat, lng });
    setPlaceName(place.name);
    setAddress(place.formatted_address);
    setSearchResults([]);
    setInfoWindowOpen(true);
  };

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  // ฟังก์ชั่นสำหรับย้อนกลับ
  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirmDestination = () => {
    const selectedData = {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      name: placeName, // ชื่อสถานที่
      address: address,
    };
    sessionStorage.setItem("destination", JSON.stringify(selectedData));
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
                  <p>{result.name}</p>
                  <p>{result.formatted_address}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MapView */}
        <MapViewSearch
          selectedLocation={selectedLocation}
          address={address}
          showInfoWindow={infoWindowOpen}
          onInfoClose={() => setInfoWindowOpen(false)}
          onMapLoad={onMapLoad}
        />

        {/* ตำแหน่งที่เลือก */}
        <div className="w-full h-[170px] bg-amber-50 flex flex-col gap-3 items-center justify-center mt-2 mb-4 px-6">
          <div className="mb-0 text-center">
            <p className="font-bold text-2xl mb-0">ตำแหน่งที่เลือก</p>
            <p className="font-bold text-lg mb-0">
              {placeName || "ยังไม่เลือกสถานที่"}
            </p>
            <p className="text-sm mb-0">{address}</p>
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
