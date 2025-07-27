import * as yup from "yup";

export const bookingSchema = yup.object().shape({
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
