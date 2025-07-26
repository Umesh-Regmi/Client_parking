import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./routing-machine";

// 🧭 New import

// 🛠️ Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const parkingIcon = new L.Icon({
  iconUrl: "/icons/car.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const userIcon = new L.Icon({
  iconUrl: "/icons/user-location.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});
function SetMapCenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 14);
  }, [coords, map]);
  return null;
}

function FixMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function MapWithRouting() {
  const [userLocation, setUserLocation] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation({ lat: 27.7172, lng: 85.324 }) // fallback
    );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/parking")
      .then((res) => setParkingSpots(res.data))
      .catch((err) => {
        console.error("Error loading spots:", err);
        alert("Failed to load spots.");
      });
  }, []);

  if (!userLocation) return <p>📡 Locating you...</p>;

  return (
    <div style={{ height: "700px", width: "100vw" }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FixMapResize />
        <SetMapCenter coords={[userLocation.lat, userLocation.lng]} />

        {/* 👤 User Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* 🅿️ Parking Spots */}
        {parkingSpots.map((spot) => (
          <Marker
            key={spot._id}
            position={[spot.coordinates.lat, spot.coordinates.lng]}
            icon={parkingIcon}
            eventHandlers={{
              click: () =>
                setSelectedSpot({
                  lat: spot.coordinates.lat,
                  lng: spot.coordinates.lng,
                }),
            }}
          >
            <Popup>
              <strong>{spot.spotNumber ?? spot.name ?? "Parking Spot"}</strong>
              <br />
              Total Slots: {spot.totalSlots}
              <br />
              Price :{" "}
              {spot.price ? `${spot.price} "Rs per hour"` : "not available"}
              <br />
              Available Slots: {spot.availableSlots}
              <br />
              EV: {spot.hasEvCharging ? "Yes" : "No"}
              <br />
              Café: {spot.hasCafeNearby ? "Yes" : "No"}
              <br />
              Petrol Pump: {spot.hasPetrolPumpNearby ? "Yes" : "No"}
              <br />
              <em>Click to show street path</em>
            </Popup>
          </Marker>
        ))}

        {/* 🚗 Routing Path */}
        {selectedSpot && (
          <RoutingMachine from={userLocation} to={selectedSpot} />
        )}
      </MapContainer>
    </div>
  );
}
