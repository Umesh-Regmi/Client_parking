// hooks/useParkingSpots.js
import { useQuery } from "@tanstack/react-query";
import API from "../api";

export const useParkingSpots = () => {
  return useQuery({
  queryKey: ["parkingSpots"],
  queryFn: async () => {
    const { data } = await API.get("/parking");
    return data;
  },
  staleTime: 1000 * 60 * 5, // 5 min
  retry: 1,
});
};
