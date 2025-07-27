import { useNavigate } from 'react-router';
import { useMyBookings } from '../../hooks/useMyBookings';
import { useAuth } from '../../hooks/useAuth';
import NavBar from '../../components/nav';
import { useCancelBooking } from '../../hooks/cancelBooking';

export default function MyBookings() {
  const { user } = useAuth();
  const { data: bookings = [], isLoading, isError, error } = useMyBookings(user?.id);
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const navigate = useNavigate();

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(id);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading bookings...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">{error.message}</div>;

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-6">
        <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-semibold mb-6 text-center">My Bookings</h2>
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer  px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>

        {bookings?.length === 0 ? (
          <p className="text-center text-gray-600">No bookings yet.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{booking.parkingSpot.name}</h3>
                  <span className={`capitalize text-sm  ${booking.status === 'cancelled' ? 'text-yellow-500' : booking.status === 'completed'?  'text-green-500' :'text-blue-500'} font-medium`}>
                    {booking.status || 'Booked'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(booking.createdAt).toLocaleString()}
                </p>
                <p>
                    Booking Id: <span className='font-bold italic text-indigo-500'>{booking.bookingId}</span>
                </p>

                <div className='w-full flex justify-end'>
                    {booking.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="cursor-pointer ml-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    disabled={isCancelling}
                  >
                    {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}