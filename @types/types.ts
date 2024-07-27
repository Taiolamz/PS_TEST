// import { z } from "zod";

// export const LoginAuthSchema = z.object({
//   email: z.string().email({ message: "Enter a valid email" }),
//   password: z
//     .string(),
//   remember: z.boolean(),
// });

// export const employeeSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   middleName: z.string().min(1, "Middle name is required"),
//   maidenName: z.string().min(1, "Miaden name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   gender: z.string().min(1, "Gender is required"),
//   dateOfBirth: z.string().min(1, "Date of Birth is required"),
//   resumptionDate: z.string().min(1, "Resumption Date is required"),
//   gradeLevel: z.string().optional(),
//   subsidiary: z.string().min(1, "Subsidiary is required"),
//   department: z.string().min(1, "Department is required"),
//   jobTitle: z.string().min(1, "Job Title is required"),
//   staffNumber: z.string().optional(),
//   newEmployee: z.string().min(1, "New Employee is required"),
//   workEmail: z.string().email({ message: "Invalid email" }),
//   lineManagerEmail: z.string().email({ message: "Invalid email" }),
//   branch: z.string().min(1, "Branch is required"),
//   unit: z.string().min(1, "Unit is required"),
//   phoneNumber: z.string().optional(),
//   role: z.string().optional(),
// });
