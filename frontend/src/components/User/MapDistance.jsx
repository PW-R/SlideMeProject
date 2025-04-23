// import React, { useState, useEffect, useRef } from "react";
// import {
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   DirectionsRenderer,
//   LoadScript,
//   Autocomplete,
// } from "@react-google-maps/api";

// const MapDistance = ({
//   mapCenter = { lat: 13.736717, lng: 100.523186 },
//   zoom = 15,
//   selectedLocation,
//   startLocation,
//   endLocation,
//   onRouteCalculated,
//   //   showInfoWindow = false,
//   //   onInfoClose,
// }) => {
//   const [directions, setDirections] = useState(null);
//   const directionsService = useRef(null);
//   const directionsRenderer = useRef(null);
//   // const [places, setPlaces] = useState([]); // สถานที่ที่ค้นหามา
//   // const [searchQuery, setSearchQuery] = useState(""); // คำค้นหา

//   const mapOptions = {
//     disableDefaultUI: true,
//     zoomControl: false,
//     mapTypeControl: false,
//     streetViewControl: false,
//     fullscreenControl: false,
//     gestureHandling: "greedy",
//     draggable: true,
//   };

//   // const handlePlaceSelect = (autocomplete) => {
//   //   const place = autocomplete.getPlace();
//   //   if (place.geometry) {
//   //     // สามารถอัปเดตตำแหน่งของแผนที่ได้ที่นี่
//   //     setSelectedLocation({
//   //       lat: place.geometry.location.lat(),
//   //       lng: place.geometry.location.lng(),
//   //     });
//   //   }
//   // };

//   // const onSearchChange = (event) => {
//   //   setSearchQuery(event.target.value);
//   // };

//   const parseLocation = (location) =>
//     location
//       ? { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }
//       : null;

//   const [mapReady, setMapReady] = useState(false);

//   useEffect(() => {
//     if (!mapReady || !directionsService.current || !directionsRenderer.current)
//       return;

//     const parsedStart = parseLocation(startLocation);
//     const parsedEnd = parseLocation(endLocation);

//     if (!parsedStart || !parsedEnd) return;

//     const origin = new window.google.maps.LatLng(
//       parsedStart.lat,
//       parsedStart.lng
//     );
//     const destination = new window.google.maps.LatLng(
//       parsedEnd.lat,
//       parsedEnd.lng
//     );

//     const request = {
//       origin,
//       destination,
//       travelMode: window.google.maps.TravelMode.DRIVING, // หรือ WALKING, BICYCLING, TRANSIT
//     };

//     if (directionsService.current && directionsRenderer.current) {
//       directionsService.current.route(request, (result, status) => {
//         if (status === "OK") {
//           // เช็กว่าค่าที่ได้ใหม่แตกต่างจากเดิมมั้ย
//           setDirections((prev) => {
//             if (JSON.stringify(prev) === JSON.stringify(result)) return prev;
//             return result;
//           });

//           if (onRouteCalculated) {
//             const distance = result.routes[0].legs[0].distance.text;
//             const duration = result.routes[0].legs[0].duration.text;
//             onRouteCalculated(distance, duration);
//           }
//         } else {
//           console.error("Error fetching directions:", status);
//         }
//       });
//     }
//   }, [mapReady, startLocation, endLocation, onRouteCalculated]);

//   useEffect(() => {
//     if (directionsRenderer.current && directions) {
//       directionsRenderer.current.setDirections(directions);
//     }
//   }, [directions]);

//   const onLoadMap = (map) => {
//     directionsService.current = new window.google.maps.DirectionsService();
//     directionsRenderer.current = new window.google.maps.DirectionsRenderer({
//       suppressMarkers: true,
//       preserveViewport: true, // ป้องกัน directionsRenderer จากการ zoom/pan เอง
//       draggable: false,
//       polylineOptions: {
//         strokeColor: "#2E86DE",
//         strokeOpacity: 0.9,
//         strokeWeight: 8,
//       },
//     });
//     directionsRenderer.current.setMap(map);
//     setMapReady(true);
//   };

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={{ height: "500px", width: "100%" }}
//         defaultCenter={selectedLocation || mapCenter}
//         zoom={zoom}
//         onLoad={onLoadMap}
//         options={mapOptions}
//       >
//         {parseLocation(startLocation) && (
//           <Marker
//             position={parseLocation(startLocation)}
//             icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" // หมุดต้นทาง สีแดง
//           />
//         )}
//         {parseLocation(endLocation) && (
//           <Marker
//             position={parseLocation(endLocation)}
//             icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png" // หมุดปลายทาง สีเขียว
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapDistance;
