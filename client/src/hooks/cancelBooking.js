import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api';

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId) => {
      const { data } = await API.delete(`/booking/${bookingId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myBookings']);
    },
  });
};
