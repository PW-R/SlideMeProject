import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import Geocoder from "./Geocoder"; // Assuming this is a component for geocoding
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

function MapStatus({ origin, destination, onRouteCalculated }) {
  const mapRef = useRef(null);

  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });
  const [loadingRoute, setLoadingRoute] = useState(true);
  const [routeError, setRouteError] = useState(null);

  // Icon: ต้นทาง
  const originIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `<div style="background-color: #F84C4C; width: 32px; height: 32px; border-radius: 50%;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Icon: ปลายทาง
  const customIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" stroke="gray" stroke-width="0.5" />
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // คำนวณเส้นทางเมื่อ origin/destination มา
  useEffect(() => {
    if (origin?.lat && origin?.lng && destination?.lat && destination?.lng && mapRef.current) {
      const map = mapRef.current;
      setLoadingRoute(true);
      setRouteError(null);

      // ลบ marker และเส้นทางเก่า
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer.options.icon) {
          map.removeLayer(layer);
        }
      });

      // สร้าง RoutingControl สำหรับคำนวณเส้นทาง
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(origin.lat, origin.lng),
          L.latLng(destination.lat, destination.lng),
        ],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "blue", weight: 6 }] },
        createMarker: () => null, // ไม่ต้องการให้แสดงมาร์คเกอร์
      });

      // เมื่อคำนวณเส้นทางเสร็จ
      routingControl.on("routesfound", (event) => {
        setLoadingRoute(false);
        if (event.routes.length === 0) {
          setRouteError("ไม่พบเส้นทาง");
        } else {
          const route = event.routes[0];
          const distanceKm = (route.summary.totalDistance / 1000).toFixed(2) + " กม.";
          const durationMin = Math.ceil(route.summary.totalTime / 60) + " นาที";

          const routeData = {
            distance: distanceKm,
            duration: durationMin,
          };

          setRouteInfo(routeData);
          onRouteCalculated?.(routeData);
        }
      });

      // เมื่อคำนวณเส้นทางไม่สำเร็จ
      routingControl.on("routeerror", () => {
        setLoadingRoute(false);
        setRouteError("ไม่สามารถคำนวณเส้นทางได้");
      });

      routingControl.addTo(map);
      const controlContainer = routingControl.getContainer();
      if (controlContainer) {
        controlContainer.style.display = "none";
      }

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [origin, destination, onRouteCalculated]);

  // เช็คว่า origin และ destination มีค่าไหม
  if (!origin?.lat || !origin?.lng || !destination?.lat || !destination?.lng) {
    return <p>Loading map...</p>;
  }

  return (
    <div>
      <MapContainer
        center={[origin.lat, origin.lng]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup>ตำแหน่งต้นทาง</Popup>
        </Marker>
        <Marker position={[destination.lat, destination.lng]} icon={customIcon}>
          <Popup>ตำแหน่งปลายทาง</Popup>
        </Marker>

        <div className="leaflet-container">
          <Geocoder origin={origin} destination={destination} />
        </div>

      </MapContainer>

      {loadingRoute && <p>กำลังคำนวณ...</p>}
      {routeInfo && !loadingRoute && (
        <div>
          <p>ระยะทาง: {routeInfo.distance}</p>
          <p>เวลา: {routeInfo.duration}</p>
        </div>
      )}
      {routeError && <p>{routeError}</p>}
    </div>
  );
}

export default MapStatus;
