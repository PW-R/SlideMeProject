// ตัวอย่าง MapViewSearch ที่ใช้ Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function MapSearch({ selectedLocation, showInfoWindow, onMapLoad }) {
  const defaultCenter = [13.7563, 100.5018]; // Bangkok

  const mapRef = useMapEvents({
    load: () => onMapLoad(mapRef),
  });

  return (
    <MapContainer
      center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultCenter}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      whenCreated={onMapLoad}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
          {showInfoWindow && (
            <Popup>
              <b>{selectedLocation.name}</b><br />
              {selectedLocation.address}
            </Popup>
          )}
        </Marker>
      )}
    </MapContainer>
  );
}
