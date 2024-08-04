"use client";
import { useAcceptEmployeeInvitationMutation, useGetInvitedEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { useAppSelector } from "@/redux/store";
import { checkUserRole } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

export const useEmployeeInvite = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const passwordValidationMessage = `
  Must have 8 characters.
  Must include capital and small letters.
  Must include one number/special character.
`;
  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .test("password-validation", passwordValidationMessage, (value) => {
        if (!value) return false; // Ensure value is not undefined or null
        const hasMinLength = value.length >= 8;
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumberOrSpecialChar =
          /[0-9]/.test(value) || /[@$!%*?&]/.test(value);
        return (
          hasMinLength && hasLowercase && hasUppercase && hasNumberOrSpecialChar
        );
      }),
  });

  const passwordCriteria = [
    { label: "Must have 8 characters", regex: /.{8,}/ },
    {
      label: "Must include capital and small letters",
      regex: /^(?=.*[a-z])(?=.*[A-Z])/,
    },
    {
      label: "Must include one number/special character",
      regex: /^(?=.*[0-9])|(?=.*[@$!%*?&])/,
    },
  ];

  const [passwordValidations, setPasswordValidations] = useState(
    passwordCriteria.map((criterion) => ({ ...criterion, checked: false }))
  );

  const handlePasswordChange = (password: string) => {
    const updatedValidations = passwordCriteria.map((criterion) => ({
      ...criterion,
      checked: criterion.regex.test(password),
    }));
    setPasswordValidations(updatedValidations);
  };

  const [acceptEmployeeInvitation, { isLoading: isAcceptingInvitation }] =
    useAcceptEmployeeInvitationMutation();

  const {
    data: invitedUsersData,
    isLoading: isLoadingInvitedUsers,
    isFetching: isFetchingInvitedUsers,
  } = useGetInvitedEmployeesQuery("01j4en6b771yestq0vc6y7zhqf+");

  const invitedUsers = invitedUsersData ?? [];

  console.log(invitedUsers, "invited users");

  const handleSubmit = async () => {
    const payload = {
      ...formik.values,
    };
    await acceptEmployeeInvitation(payload)
      .unwrap()
      .then(() => {
        toast.success("Logged in Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            if (checkUserRole(user?.role as string) === "ADMIN") {
              router.push(routesPath?.ADMIN.OVERVIEW);
            } else {
              router.push(routesPath?.EMPLOYEE.OVERVIEW);
            }
          }, 2000);
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return {
    formik,
    passwordValidations,
    handlePasswordChange,
    loading: isAcceptingInvitation,
  };
};
