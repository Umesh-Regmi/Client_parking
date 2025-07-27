import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../schema/booking";
// import { bookingSchema } from "./bookingSchema";

const BookingForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      vehicle: { type: "car" },
      status: "booked",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("user")} placeholder="User ID" className="input" />
        {errors.user && <p className="text-red-500">{errors.user.message}</p>}
      </div>

      <div>
        <input
          {...register("parkingSpot")}
          placeholder="Parking Spot ID"
          className="input"
        />
        {errors.parkingSpot && (
          <p className="text-red-500">{errors.parkingSpot.message}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("slotNumber")}
          placeholder="Slot Number"
          className="input"
        />
        {errors.slotNumber && (
          <p className="text-red-500">{errors.slotNumber.message}</p>
        )}
      </div>

      <div>
        <input
          type="datetime-local"
          {...register("startTime")}
          className="input"
        />
        {errors.startTime && (
          <p className="text-red-500">{errors.startTime.message}</p>
        )}
      </div>

      <div>
        <input
          type="datetime-local"
          {...register("endTime")}
          className="input"
        />
        {errors.endTime && (
          <p className="text-red-500">{errors.endTime.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("vehicle.number")}
          placeholder="Vehicle Number"
          className="input"
        />
        {errors.vehicle?.number && (
          <p className="text-red-500">{errors.vehicle.number.message}</p>
        )}
      </div>

      <div>
        <select {...register("vehicle.type")} className="input">
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <input
          {...register("vehicle.model")}
          placeholder="Vehicle Model"
          className="input"
        />
      </div>

      <div>
        <select {...register("status")} className="input">
          <option value="booked">Booked</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
