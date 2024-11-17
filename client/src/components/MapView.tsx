import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapViewProps {
  locations: { Title: string; URL: string }[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
  const defaultIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const parseCoordinates = (url: string): [number, number] | null => {
    // Match coordinates in the @lat,lng or data=!4m2!3m1! format
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (match) {
      return [parseFloat(match[1]), parseFloat(match[2])];
    }

    // Attempt fallback parsing (e.g., coordinates in other query structures)
    const queryMatch = url.match(/data=.*!(-?\d+\.\d+)!(-?\d+\.\d+)/);
    console.log(queryMatch);
    if (queryMatch) {
      return [parseFloat(queryMatch[1]), parseFloat(queryMatch[2])];
    }

    // Return null if no coordinates found
    return null;
  };

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc, index) => {
        const coordinates = parseCoordinates(loc.URL);
        if (coordinates) {
          return (
            <Marker
              key={index}
              position={coordinates as [number, number]}
              icon={defaultIcon}
            >
              <Popup>{loc.Title}</Popup>
            </Marker>
          );
        }
        return null; // Skip markers without valid coordinates
      })}
    </MapContainer>
  );
};

export default MapView;
