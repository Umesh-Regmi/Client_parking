import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../schema/booking";

const BookingForm = ({ onSubmit }) => {
  console.log(onSubmit)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      vehicle: { type: "car" },
      status: "booked",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">


      <div>
        <input
          {...register("vehicle.number")}
          placeholder="Vehicle Number"
          className={`w-full px-4 py-2 rounded-md border ${
            errors.vehicle?.number ? "border-red-500" : "border-indigo-300"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.vehicle?.number && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicle.number.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium text-indigo-700">Vehicle Type</label>
        <select
          {...register("vehicle.type")}
          className="w-full px-4 py-2 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-indigo-700">Vehicle Model</label>

        <input
          {...register("vehicle.model")}
          placeholder="Vehicle Model"
          className="w-full px-4 py-2 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-indigo-700">Booking Status</label>
        <select
          {...register("status")}
          className="w-full px-4 py-2 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="booked">Booked</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
