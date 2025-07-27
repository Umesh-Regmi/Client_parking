import { useQuery } from "@tanstack/react-query";
import API from "../api";

export const useMyBookings = (userId, options = {}) => {
  return useQuery({
    queryKey: ["myBookings", userId],
    queryFn: async () => {
      const { data } = await API.get(`/booking/user/${userId}`);
      console.log(data)
      return data;
    },
    enabled: !!userId,
    ...options,
  });
};
