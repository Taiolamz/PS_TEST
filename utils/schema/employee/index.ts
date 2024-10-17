import * as yup from "yup";

export const formSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  middle_name: yup.string().optional(),
  last_name: yup.string().required("Last name is required"),
  maiden_name: yup.string().optional(),
  date_of_birth: yup.date().optional(),
  gender: yup.string().optional(),
  resumption_date: yup.date().optional(),
  level: yup.string().required("Grade level is required"),
  // subsidiary_id: yup.string().required("Subsidiary is required"),
  // department_id: yup.string().required("Department is required"),
  // branch_id: yup.string().required("Branch is required"),
  // unit_id: yup.string().required("Unit is required"),
  designation: yup.string().optional(),
  staff_number: yup.string().optional(),
  new_employee: yup.string().required("New employee status is required"),
  email: yup
    .string()
    .min(1, "Work Email is required")
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("work Email is required"),
  line_manager_email: yup
    .string()
    .min(1, "Line Manager Email is required")
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Line Manager Email is required"),
  phone_number: yup
    .string()
    .optional()
    // .matches(/^\d+$/, "Phone number must be digits only")
    .max(14, "Phone number cannot exceed 14 digits"),
  role_id: yup.string().required("Role is required"),
});
