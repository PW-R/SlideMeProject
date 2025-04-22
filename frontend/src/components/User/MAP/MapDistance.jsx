import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef, useState } from "react";

import L from "leaflet";
import LeafletGeocoder from "./LeafletGeocoder";
import "leaflet/dist/leaflet.css";

import { usePosition } from "./PositionContext";

function MapDistance({ onRouteCalculated }) {
  const mapRef = useRef(null);

  const { origin, destination } = usePosition();
  // const origin = startLat && startLng ? [startLat, startLng] : null;
  // const destination = endLat && endLng ? [endLat, endLng] : null;
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });
  const [route, setRoute] = useState(null);

  const [loadingRoute, setLoadingRoute] = useState(true);
  const [routeError, setRouteError] = useState(null);

  console.log("origin:", origin);
  console.log("destination:", destination);

  // สร้างไอคอนสำหรับต้นทางเป็นวงกลมสีแดง
  const originIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `<div style="background-color: #F84C4C; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // ไอคอนสำหรับปลายทาง
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

  // คำนวณเส้นทาง
  useEffect(() => {
    console.log("origin:", origin);
    console.log("destination:", destination);
    if (
      origin?.position?.lat &&
      origin?.position?.lng &&
      destination?.position?.lat &&
      destination?.position?.lng &&
      mapRef.current
    ) {
      console.log("เริ่มคำนวณเส้นทาง");

      const map = mapRef.current;
      setLoadingRoute(true); // เริ่มต้นการคำนวณ
      setRouteError(null);

      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer.options.icon) {
          map.removeLayer(layer);
        }
      });

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(origin.position.lat, origin.position.lng),
          L.latLng(destination.position.lat, destination.position.lng),
        ],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "blue", weight: 6 }] },
        createMarker: () => null, // ไม่ให้ leaflet สร้าง marker เอง
        name: "RoutingControl",
        show: false,
      });

      routingControl.on("routesfound", (event) => {
        console.log("เส้นทางคำนวณเสร็จ:", event.routes);
        setLoadingRoute(false);
        if (event.routes.length === 0) {
          setRouteError("ไม่พบเส้นทาง");
        } else {
          const route = event.routes[0];

          const distanceKm =
            (route.summary.totalDistance / 1000).toFixed(2) + " กม.";
          const durationMin = Math.ceil(route.summary.totalTime / 60) + " นาที";

          const routeData = {
            distance: distanceKm,
            duration: durationMin,
          };

          setRoute(routeData); // เก็บข้อมูลเส้นทางใน state

          if (onRouteCalculated) {
            onRouteCalculated(routeData); // ส่งข้อมูลเส้นทางไปที่ parent component
          }

          console.log("🧭 เส้นทางคำนวณแล้ว:", distanceKm, durationMin);
          console.log("📡 ค่าที่จะส่งไป DCSS:", {
            distance: distanceKm,
            duration: durationMin,
          });
        }
      });

      routingControl.on("routeerror", () => {
        console.log("เกิดข้อผิดพลาดในการคำนวณเส้นทาง");
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

  // useEffect(() => {
  //   const removeControlPanels = () => {
  //     const containers = document.querySelectorAll(
  //       ".leaflet-routing-container"
  //     );
  //     containers.forEach((container) => (container.style.display = "none"));
  //   };

  //   removeControlPanels();
  // }, [origin, destination]);

  // useEffect(() => {
  //   console.log("Loading route status:", loadingRoute);
  // }, [loadingRoute]);

  if (
    !origin?.position?.lat ||
    !origin?.position?.lng ||
    !destination?.position?.lat ||
    !destination?.position?.lng
  ) {
    return <p>Loading map...</p>; // หรือแสดง loading spinner
  }

  // if (loadingRoute) {
  //   return <p>กำลังคำนวณ...</p>; // แสดงข้อความระหว่างที่กำลังคำนวณ
  // }

  return (
    <div>
      <MapContainer
        center={[origin.position.lat, origin.position.lng]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {origin?.position && (
          <Marker
            position={[origin.position.lat, origin.position.lng]}
            icon={originIcon}
          >
            <Popup>ตำแหน่งต้นทาง</Popup>
          </Marker>
        )}
        {destination?.position && (
          <Marker
            position={[destination.position.lat, destination.position.lng]}
            icon={customIcon}
          >
            <Popup>ตำแหน่งปลายทาง</Popup>
          </Marker>
        )}

        <div className="leaflet-container">
          <LeafletGeocoder origin={origin} destination={destination} />
        </div>
      </MapContainer>
      {/* จะแสดงข้อความกำลังคำนวณระหว่างที่เส้นทางยังไม่พร้อม */}
      {loadingRoute && <p>กำลังคำนวณ...</p>}

      {/* แสดงข้อมูลระยะทางและเวลาเมื่อเส้นทางคำนวณเสร็จ */}
      {route && !loadingRoute && (
        <div>
          <p>ระยะทาง: {route.distance}</p>
          <p>เวลา: {route.duration}</p>
        </div>
      )}

      {/* แสดงข้อผิดพลาดถ้ามี */}
      {routeError && <p>{routeError}</p>}
    </div>
  );
}

export default MapDistance;
