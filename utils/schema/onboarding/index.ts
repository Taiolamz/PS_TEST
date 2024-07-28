import * as yup from "yup";

export const OnbaordingSchema = yup.object().shape({
  vision: yup.string().required("Vision is required"),
  mision: yup.string().required("Mision is required"),
});
