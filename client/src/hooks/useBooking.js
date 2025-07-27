import { useMutation } from "@tanstack/react-query";
import { bookParkingSpot } from "../api/booking";

export const useBookParkingSpot = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await bookParkingSpot(data); // Adjust if full URL needed
      return res.data;
    },
  });
};