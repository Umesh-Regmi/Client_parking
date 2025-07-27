import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  user: yup.string().required("User ID is required"),
  parkingSpot: yup.string().required("Parking Spot ID is required"),
  slotNumber: yup
    .number()
    .typeError("Slot number must be a number")
    .required("Slot number is required")
    .positive()
    .integer(),
  startTime: yup.date().required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End time must be after start time")
    .required("End time is required"),
  vehicle: yup.object().shape({
    number: yup.string().required("Vehicle number is required"),
    type: yup
      .string()
      .oneOf(["car", "bike", "truck", "van", "other"])
      .required(),
    model: yup.string().nullable(),
  }),
  status: yup
    .string()
    .oneOf(["booked", "cancelled", "completed"])
    .required("Status is required"),
});
