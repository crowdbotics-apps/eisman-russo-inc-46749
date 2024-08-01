
import React, { useState, useEffect, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import moment from "moment";

const libraries = ["places"];

const CustomGoogleMap = ({
  markers = [],
  position = { lat: 0, lng: 0 },
  setPosition = () => {},
  directionsResponse = null,
  setDirectionsResponse = () => {},
  filteredRoutes = [],
  handleReverseGeocode = () => {},
  mapHeight = "400px",
  mapWidth = "100%",
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [serviceRequestData, setServiceRequestData] = useState(false);
  const [serviceData, setServiceData] = useState();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);

  const directionsRenderer = useRef(null);
  const directionsService = useRef(null);
  const customMarkers = useRef([]);

  useEffect(() => {
    if (position) {
      const { lat, lng } = position;
      if (!isFinite(lat) || !isFinite(lng)) {
        console.error("Invalid position coordinates: ", position);
      }
    }
  }, [position]);

  useEffect(() => {
    if (isLoaded) {
      directionsRenderer.current = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
      directionsService.current = new window.google.maps.DirectionsService();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (map && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });
      map.fitBounds(bounds);
    }
  }, [map, markers]);


  const handleMarkerClick = async (marker) => {
    setInfoWindowPosition({ lat: marker.lat, lng: marker.lng });
    setInfoWindowShown(true);
    setServiceRequestData(true);
  };
  
  const handleClose = () => {
    setInfoWindowShown(false);
    setServiceData(null);
  };

     // Time Formater
  function formatTime(timestamp) {
      return moment.unix(timestamp).utc().format('hh:mm A');
  }

  const eventHandlers = {
    dragend: async (e, markerIndex) => {
      const latLng = e.latLng;
      const lat = latLng.lat();
      const lng = latLng.lng();
      const updatedMarkers = markers.map((marker, index) =>
        index === markerIndex ? { ...marker, lat, lng } : marker
      );
      setPosition({ lat, lng });
      await handleReverseGeocode(lat, lng);
    },
  };


const calculateRoute = async () => {
  if (!isLoaded) {
    console.error("Google Maps API is not loaded");
    return;
  }

  const route = [];
  const locationMap = new Map();

  filteredRoutes[0].route.steps.forEach((step) => {
    if (step.location && step.detail) {
      step.detail = {
        ...step.detail,
        stepType: step.type,
        arrival: formatTime(step.arrival),
      };
  
      const locationKey = `${step.location[1]},${step.location[0]}`;
      if (locationMap.has(locationKey)) {
        const existingMarker = locationMap.get(locationKey);
        existingMarker.details.push(step.detail);
        // Sort the details based on date and time
        existingMarker.details.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.start_time}`);
          const dateB = new Date(`${b.date} ${b.start_time}`);
          return dateA - dateB;
        });
      } else {
        const newMarker = {
          lat: step.location[1],
          lng: step.location[0],
          details: [step.detail],
        };
        locationMap.set(locationKey, newMarker);
      }
    }
  });
  

  locationMap.forEach((marker) => {
    route.push(marker);
  });
  if (route.length < 2) {
    alert("Not enough points to calculate a route");
    return;
  }

  const origin = route[0];
  const destination = route[route.length - 1];
  const waypoints = route.slice(1, -1).map((route) => ({
    location: { lat: route.lat, lng: route.lng },
    stopover: true,
  }));

  try {
    const results = await directionsService.current.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    if (results.routes && results.routes.length > 0) {
      // Calculate distance and duration
      setDistance(
        (
          results.routes[0].legs.reduce(
            (total, leg) => total + leg.distance.value,
            0
          ) / 1000
        ).toFixed(2) + " km"
      ); // Total distance in km

      setDuration(
        Math.round(
          results.routes[0].legs.reduce(
            (total, leg) => total + leg.duration.value,
            0
          ) / 60
        ) + " mins"
      ); // Total duration in minutes

      // Clear previous directions and custom markers
      if (directionsRenderer.current) {
        directionsRenderer.current.setMap(null);
        directionsRenderer.current.setDirections({ routes: [] });
      }

      customMarkers.current.forEach((marker) => marker.setMap(null));
      customMarkers.current = [];

      // Set new directions
      directionsRenderer.current.setDirections(results);
      directionsRenderer.current.setMap(map); // Reattach the renderer to the map
      setDirectionsResponse(results); // Update state

      // Custom markers and infowindows
      results.routes[0].legs.forEach((leg, index) => {
        const markerLabel = String.fromCharCode("A".charCodeAt(0) + index);
        const marker = new window.google.maps.Marker({
          position: leg.start_location,
          map: map,
          label: markerLabel,
          details: route[index]?.details,
        });

        customMarkers.current.push(marker);

        // Add click event listener to the marker
        marker.addListener("click", () => {
          handleMarkerClick({
            lat: leg.start_location.lat(),
            lng: leg.start_location.lng(),
            details: marker.details,
          });
        });
      });

      // Add the final destination marker
      const finalMarkerLabel = String.fromCharCode(
        "A".charCodeAt(0) + results.routes[0].legs.length
      );
      const finalMarker = new window.google.maps.Marker({
        position: results.routes[0].legs[results.routes[0].legs.length - 1]
          .end_location,
        map: map,
        label: finalMarkerLabel,
        details: route[route.length - 1]?.details,
      });

      customMarkers.current.push(finalMarker);

      // Add click event listener to the final marker
      finalMarker.addListener("click", () => {
        handleMarkerClick({
          lat: finalMarker.getPosition().lat(),
          lng: finalMarker.getPosition().lng(),
          details: finalMarker.details,
        });
      });
    } else {
      console.warn("No routes found");
    }
  } catch (error) {
    console.error("Error calculating route:", error);
  }
};
  

  useEffect(() => {
    if (isLoaded && markers.length > 1 && filteredRoutes.length > 0) {
      calculateRoute();
    }
  }, [filteredRoutes, isLoaded]);

  useEffect(() => {
    if (directionsRenderer.current && map) {
      directionsRenderer.current.setMap(map);
    }
  }, [map]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMap
          center={position}
          zoom={15}
          mapContainerStyle={{ width: mapWidth, height: mapHeight }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          {directionsResponse ? (
            <DirectionsRenderer
              options={{ suppressMarkers: true, suppressInfoWindows: true }}
              directions={directionsResponse}
            />
          ) : (
            <>
              {markers.map((marker, index) => (
               <>
                <MarkerF
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  draggable={marker.draggable}
                  onClick={() => handleMarkerClick(marker)}
                  onDragEnd={(e) => eventHandlers.dragend(e, index)}
                />
               </>
              ))}
            </>
          )}

          {infoWindowShown && infoWindowPosition && (
            <InfoWindowF
              position={infoWindowPosition}
              onCloseClick={handleClose}
            />
             
          
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default CustomGoogleMap;


