import React from 'react'
import BookingForm from '../form/booking'

const BookingModal = ({setIsBookingOpen,handleBookingSubmit}) => {
  return (
    <div  className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-[90%] shadow-lg relative">
            <button
              className="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsBookingOpen(false)}
            >
              ✕
            </button>
            <BookingForm onSubmit={handleBookingSubmit} />
          </div>
        </div>
  )
}

export default BookingModal
