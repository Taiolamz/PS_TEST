import * as yup from "yup";

export const OnboardingSchema = yup.object().shape({
  fy_title: yup.string().required("Fiscal Year Title is required"),
  head_organization_email: yup
    .string()
    .email("Invalid email address")
    .notRequired(),
  head_organization_first_name: yup
    .string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "First name should not include special characters"
    )
    .notRequired(),
  head_organization_last_name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Last name should not include special characters")
    .notRequired(),
});
