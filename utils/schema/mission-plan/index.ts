import * as yup from "yup";

export const missionStatementSchema = yup.object().shape({
  missionstatement: yup.string()
    .min(5, "This field is required")
    .required("This field is required"),
});