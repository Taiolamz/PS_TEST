import * as yup from "yup";

export const OnbaordingSchema = yup.object().shape({
  fy_title: yup.string().required("Fiscal Year Title is required"),
});
