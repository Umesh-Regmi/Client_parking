// components/ParkingDetailsModal.jsx
import React from "react";
import {
  FaChargingStation,
  FaCoffee,
  FaGasPump,
  FaCar,
  FaMoneyBillWave,
  FaTimesCircle,
} from "react-icons/fa";

export default function ParkingDetailsModal({ spot, onClose, onBook }) {
  if (!spot) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <FaTimesCircle size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {spot.name ?? spot.spotNumber ?? "Parking Spot"}
        </h2>

        {/* Info List */}
        <ul className="space-y-3 text-gray-700 text-base">
          <li className="flex items-center gap-3">
            <FaCar className="text-indigo-600" />
            <span>
              Total Slots: <strong>{spot.totalSlots}</strong>
            </span>
          </li>

          <li className="flex items-center gap-3">
            <FaCar className="text-green-600" />
            <span>
              Available Slots: <strong>{spot.availableSlots}</strong>
            </span>
          </li>

          <li className="flex items-center gap-3">
            <FaMoneyBillWave className="text-yellow-600" />
            <span>
              Price: <strong>{spot.price} Rs/hour</strong>
            </span>
          </li>

          <li className="flex items-center gap-3">
            <FaChargingStation className="text-blue-600" />
            <span>EV Charging: {spot.hasEvCharging ? "Yes" : "No"}</span>
          </li>

          <li className="flex items-center gap-3">
            <FaCoffee className="text-pink-600" />
            <span>Café Nearby: {spot.hasCafeNearby ? "Yes" : "No"}</span>
          </li>

          <li className="flex items-center gap-3">
            <FaGasPump className="text-red-600" />
            <span>Petrol Pump Nearby: {spot.hasPetrolPumpNearby ? "Yes" : "No"}</span>
          </li>
        </ul>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={()=>onBook(spot)}
            className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
