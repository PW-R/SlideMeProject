import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

function StoreMapPicker({ onSelect }) {
  const [search, setSearch] = useState("");
  const [marker, setMarker] = useState(null);

  const handleSearch = async () => {
    const results = await provider.search({ query: search });
    if (results.length > 0) {
      const { y: lat, x: lng } = results[0];
      setMarker([lat, lng]);
      onSelect({ lat, lng });
    } else {
      alert("ไม่พบสถานที่");
    }
  };

  return (
    <div className="mt-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ค้นหาที่อยู่ร้าน"
        className="p-2 border rounded w-full"
      />
      <button onClick={handleSearch} className="mt-2 bg-green-500 text-white px-4 py-1 rounded">
        ค้นหา
      </button>

      <div style={{ height: "300px", marginTop: "10px" }}>
        <MapContainer center={[13.7563, 100.5018]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker && (
            <>
              <Marker position={marker} />
              <ChangeMapView coords={marker} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 16);
  return null;
}

export default StoreMapPicker;
