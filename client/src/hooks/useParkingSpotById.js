import { useQuery } from "@tanstack/react-query";
import API from "../api";

export const useParkingSpotById = (id, options = {}) => {
  return useQuery({
    queryKey: ["parkingSpot", id],
    queryFn: async () => {
      const { data } = await API.get(`/parking/${id}`);
      return data;
    },
    enabled: !!id, // only run if ID is truthy
    ...options,
  });
};