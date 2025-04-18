import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";

const MapViewSearch = ({
  mapCenter = { lat: 13.736717, lng: 100.523186 },
  zoom = 15,
  selectedLocation,
  startLocation,
  endLocation,
  onMapLoad,
  onRouteCalculated,
  //   showInfoWindow = false,
  //   onInfoClose,
}) => {
  const [directions, setDirections] = useState(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  // const [places, setPlaces] = useState([]); // สถานที่ที่ค้นหามา
  // const [searchQuery, setSearchQuery] = useState(""); // คำค้นหา

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  // const handlePlaceSelect = (autocomplete) => {
  //   const place = autocomplete.getPlace();
  //   if (place.geometry) {
  //     // สามารถอัปเดตตำแหน่งของแผนที่ได้ที่นี่
  //     setSelectedLocation({
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng(),
  //     });
  //   }
  // };

  // const onSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  const parseLocation = (location) =>
    location
      ? { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }
      : null;

  useEffect(() => {
    if (!directionsService.current || !directionsRenderer.current) return;

    const parsedStart = parseLocation(startLocation);
    const parsedEnd = parseLocation(endLocation);

    if (!parsedStart || !parsedEnd) return;

    const origin = new window.google.maps.LatLng(
      parsedStart.lat,
      parsedStart.lng
    );
    const destination = new window.google.maps.LatLng(
      parsedEnd.lat,
      parsedEnd.lng
    );

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING, // หรือ WALKING, BICYCLING, TRANSIT
    };

    directionsService.current.route(request, (result, status) => {
      if (status === "OK") {
        setDirections(result);
        if (onRouteCalculated) {
          // ส่งระยะทางและเวลาไปยัง parent component
          const distance = result.routes[0].legs[0].distance.text; // ระยะทาง เช่น "3.4 km"
          const duration = result.routes[0].legs[0].duration.text; // เวลาที่ใช้ เช่น "10 mins"
          onRouteCalculated(distance, duration); // ส่งข้อมูลกลับไป
        }
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, [startLocation, endLocation, onRouteCalculated]);

  return (
    <div>
      {/* <div>
        {distance && duration && (
          <div>
            <p>ระยะทาง: {distance}</p>
            <p>เวลาเดินทาง: {duration}</p>
          </div>
        )}
      </div> */}

      {/* ฟังก์ชัน Autocomplete */}
      {/* <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.addListener("place_changed", () =>
            handlePlaceSelect(autocomplete)
          );
        }}
      >
        <input
          type="text"
          placeholder="Search places"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Autocomplete> */}

      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={selectedLocation || mapCenter}
        zoom={zoom}
        onLoad={onMapLoad}
        options={mapOptions}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
        {parseLocation(startLocation) && (
          <Marker position={parseLocation(startLocation)} />
        )}
        {parseLocation(endLocation) && (
          <Marker position={parseLocation(endLocation)} />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
        {/* กรอบสีขาวที่จะแสดงรายละเอียดสถานที่ใน map */}
        {/* {selectedLocation && showInfoWindow && (
        <InfoWindow position={selectedLocation} onCloseClick={onInfoClose}>
          <div>
            <h3>{address}</h3>
          </div>
        </InfoWindow>
      )} */}
      </GoogleMap>
    </div>
  );
};

export default MapViewSearch;
