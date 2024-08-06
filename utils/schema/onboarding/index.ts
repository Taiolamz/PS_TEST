import * as yup from "yup";

export const OnbaordingSchema = yup.object().shape({
  // vision: yup.string().required("Vision is required"),
  // mission: yup.string().required("Mission is required"),
  // brand_colour: yup.string().required("Mission is required"),
  // end_fy: yup.string().required("Mission is required"),
  // start_fy: yup.string().required("Mission is required"),
  // probation_duration: yup.string().required("Mission is required"),
  // opening_time: yup.string().required("Mission is required"),
  fy_title: yup.string().required("Fiscal Year Title is required"),
  // closing_time: yup.string().required("Mission is required"),
  // hierarchy: yup.string().required("Mission is required"),
  // staff_levels: yup.array().required("Level is required"),
});
