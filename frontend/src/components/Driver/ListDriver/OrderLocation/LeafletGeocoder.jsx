import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const LeafletGeocoder = () => {
  const map = useMap();

  useEffect(() => {
    import("leaflet-control-geocoder").then(() => {
      if (L.Control?.geocoder) {
        const geocoder = L.Control.geocoder({
          defaultMarkGeocode: false,
        });

        geocoder
          .on("markgeocode", function (e) {
            const latlng = e.geocode.center;
            L.marker(latlng).addTo(map);
            map.fitBounds(e.geocode.bbox);
          })
          .addTo(map);
      } else {
        console.error("Geocoder not available");
      }
    });
  }, [map]);

  return null;
};

export default LeafletGeocoder;
