import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./routing-machine";
import NavBar from "./nav";
import ParkingDetailsModal from "./models/parking-detail-model";
import BookingModal from "./models/booking-modal";
import { useBookParkingSpot } from "../hooks/useBooking";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useParkingSpots } from "../hooks/useParkingSpot";
import { useParkingSpotById } from "../hooks/useParkingSpotById";

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
  const [selectedSpotId, setSelectedSpotId] = useState(null);
const { data: parkingSpots = [], isLoading: isLoadingSpots, isError: isSpotsError } = useParkingSpots();

  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
 const {
  data: selectedSpotDetails,
  isLoading: isSpotLoading,
  // isError: isSpotError,
} = useParkingSpotById(selectedSpotId);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetalViewOpen, setIsDetalViewOpen] = useState(false);
const { user } = useAuth();

  const queryClient = useQueryClient();

  useEffect(()=>{
    if(selectedSpotId && !isSpotLoading){
      setIsDetalViewOpen(true)
    }

  },[isSpotLoading,selectedSpotId])

  function handleBookNow(spot) {
    setIsBookingOpen(true); // open booking form modal
    // toast.success("Booking confirmed!");
    setSelectedSpot({
      lat: spot.coordinates.lat,
      lng: spot.coordinates.lng,
    });
  }

const {
  mutate: bookParking,
  // isLoading,
  // isSuccess,
  // isError,
  // error,
} = useBookParkingSpot();

  function handleBookingSubmit(data) {
  bookParking({...data,userId:user?.id,parkingSpotId:selectedSpotDetails._id}, {
    onSuccess: () => {
      toast.success("Booking submitted successfully!");
      setIsBookingOpen(false);
      queryClient.invalidateQueries(["bookings","parkingSpots"]); // optional: refetch bookings
    },
    onError: (err) => {
      console.error(err);
      toast.error("Booking failed. Try again.");
    },
  });
}

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
  const filtered = parkingSpots.filter((spot) =>
    (spot.name || spot.spotNumber || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  setFilteredSpots(filtered);
}, [searchTerm, parkingSpots]);

  if (!userLocation) return <p>📡 Locating you...</p>;
if (isLoadingSpots) return <p>Loading parking spots...</p>;
if (isSpotsError) return <p>Error loading parking spots.</p>;
  return (
    <div className="w-full z-10">
      <NavBar />
      {/* 🔍 Search Input */}
      <div className="w-full px-4 py-2 z-10">
        <input
          type="text"
          placeholder="Search parking spot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        />
      </div>

      {/* 🗺️ Map */}
      <div className="z-10" style={{ height: "700px", width: "100vw" }}>
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Let user pick location by clicking */}
          <LocationPicker
            userLocation={userLocation}
            setUserLocation={setUserLocation}
          />

          <FixMapResize />
          <SetMapCenter coords={[userLocation.lat, userLocation.lng]} />

          {/* 👤 User Marker */}
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>You are here</Popup>
          </Marker>

          {/* 🅿️ Filtered Parking Spots */}
          {filteredSpots.map((spot) => (
            <Marker
              key={spot._id}
              position={[spot.coordinates.lat, spot.coordinates.lng]}
              icon={parkingIcon}
              eventHandlers={{
               click: () => {
              setSelectedSpotId(spot._id); // or `spot.id`
            },
              }}
            >
              <Popup>
                <strong>
                  {spot.spotNumber ?? spot.name ?? "Parking Spot"}
                </strong>
                <br />
                Total Slots: {spot.totalSlots}
                <br />
                Price: {spot.price ? `${spot.price} Rs/hr` : "N/A"}
                <br />
                Available: {spot.availableSlots}
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

          {/* 🧭 Direction */}
          {selectedSpot && (
            <RoutingMachine from={userLocation} to={selectedSpot} />
          )}
        </MapContainer>
      </div>

      {/* 🔽 Search Results (Optional below map) */}
      <div className="px-4 py-2 space-y-2">
        {filteredSpots.map((spot) => (
          <div
            key={spot._id}
            onClick={() =>
              setSelectedSpot({
                lat: spot.coordinates.lat,
                lng: spot.coordinates.lng,
              })
            }
            className="cursor-pointer p-2 bg-white rounded shadow hover:bg-blue-100 transition"
          >
            {spot.name ?? spot.spotNumber} – Available:{" "}
            {spot.availableSlots ?? "N/A"}
          </div>
        ))}
      </div>
      {/* Parking Details Modal */}
      {isDetalViewOpen && !isBookingOpen && (
        <ParkingDetailsModal
          spot={selectedSpotDetails}
          onClose={() => {
            setIsDetalViewOpen(false),
            setSelectedSpotId(null);
          }}
          onBook={handleBookNow}
        />
      )}
      {/* Booking Form Modal */}
      {isBookingOpen && (
        <BookingModal
          handleBookingSubmit={handleBookingSubmit}
          setIsBookingOpen={setIsBookingOpen}
        />
      )}
    </div>
  );
}

function LocationPicker({ setUserLocation }) {
  // useMapEvents lets us listen to map events
  useMapEvents({
    click(e) {
      setUserLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}
