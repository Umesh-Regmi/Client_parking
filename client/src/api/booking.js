// /api/booking.js
// end-pont  -> /api/booking 
    // const { userId, parkingSpotId } = req.body;

import API from ".";

    export const bookParkingSpot = async (bookingData) => {
        try {
      console.log('booking data',bookingData)
    const response = await API.post("/booking", bookingData);
    return response.data;
  } catch (error) {
    console.error("Booking failed:", error?.response?.data || error.message);
    throw error;
  }
};