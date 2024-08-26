import * as yup from "yup";

export const passwordValidations: string[] = [
  "Must have 8 characters",
  "Must include capital letters and small letters",
  "Must include one number and one special character",
];

export const passwordValidation = (
  password: string,
  validation: string
): boolean => {
  switch (validation) {
    case "Must have 8 characters":
      if (password.length < 8) {
        return false;
      }
      return true;
    case "Must include capital letters and small letters":
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        return true;
      }
      return false;
    case "Must include one number and one special character":
      return /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
    default:
      return false;
  }
};

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const RegistrationSchema = [
  yup.object().shape({
    organization_name: yup
      .string()
      .required("Organization name is required")
      .matches(
        /^[A-Za-z\s]+$/,
        "Organization name can only contain letters and spaces"
      ),
    employees_range: yup.string().required("Select number of employees"),
    address: yup.string().required("Address name is required"),
    city: yup.string().required("City name is required"),
    country: yup.string().required("Country name is required"),
    state: yup.string().required("State name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Must have 8 characters")
      .test(
        "minNumbersOrSymbols",
        "Must include one number and one special character",
        (value) => /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value)
      )
      .test("minLowercase", "Must include capital letters", (value) =>
        /[a-z]/.test(value)
      )
      .test("minUppercase", "Must include small letters", (value) =>
        /[A-Z]/.test(value)
      ),
    confirm_password: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), ""], "Passwords do not match"),
  }),
  yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    designation: yup.string().required("Designation name is required"),
  }),
];

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must have 8 characters")
    .test(
      "minNumbersOrSymbols",
      "Must include one number or one special character",
      (value) => /[0-9]/.test(value) || /[!@#$%^&*(),.?":{}|<>]/.test(value)
    )
    .test("minLowercase", "Must include capital letters", (value) =>
      /[a-z]/.test(value)
    )
    .test("minUppercase", "Must include small letters", (value) =>
      /[A-Z]/.test(value)
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match"),
});
