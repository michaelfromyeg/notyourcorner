import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapViewProps {
  locations: { Title: string; URL: string; Coordinates: [number, number] }[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
  const defaultIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={6}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc, index) => {
        return (
          <Marker
            key={index}
            position={loc.Coordinates as [number, number]}
            icon={defaultIcon}
          >
            <Popup>{loc.Title}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
