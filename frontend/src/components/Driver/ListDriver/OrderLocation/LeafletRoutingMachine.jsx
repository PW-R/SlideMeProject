import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder"; 

const LeafletRoutingMachine = ({ onRouteStart }) => {
  const map = useMap();
  const markerOneRef = useRef(null);
  const routingControlRef = useRef(null);

  const defaultIcon = L.icon({
    iconUrl: "/pic/tow-truck.png",
    iconSize: [25, 25],
  });

  useEffect(() => {
    if (!markerOneRef.current) {
      markerOneRef.current = L.marker([13.736717, 100.523186], {
        icon: defaultIcon,
      }).addTo(map);
    }

    let destinationMarker = null;

    const handleMapClick = (e) => {
      console.log("Map clicked at:", e.latlng);

      if (destinationMarker) {
        destinationMarker.setLatLng(e.latlng);
      } else {
        destinationMarker = L.marker(e.latlng).addTo(map);
      }

      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(13.736717, 100.523186),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [{ color: "#EF1D33", opacity: 1, weight: 3 }],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder?.nominatim?.(),
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
      })
        .on("routesfound", function (e) {
          const routeCoordinates = e.routes[0].coordinates;
          const totalSteps = routeCoordinates.length;

          if (onRouteStart) {
            onRouteStart(totalSteps);
          }

          routeCoordinates.forEach((c, i) => {
            setTimeout(() => {
              markerOneRef.current.setLatLng([c.lat, c.lng]);
            }, (10000 / totalSteps) * i);
          });
        })
        .addTo(map);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map]);

  return null;
};

export default LeafletRoutingMachine;
