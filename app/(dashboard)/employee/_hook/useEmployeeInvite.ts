"use client";
import {
  useAcceptEmployeeInvitationMutation,
  useGetInvitedEmployeesQuery,
} from "@/redux/services/employee/employeeApi";
import { useAppSelector } from "@/redux/store";
import { checkUserRole } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    // first_name: yup.string().required("First name is required"),
    // last_name: yup.string().required("Last name is required"),
    // email: yup
    //   .string()
    //   .email("Invalid email address")
    //   .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .test("password-validation", passwordValidationMessage, (value) => {
        if (!value) return false;
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

  const [
    acceptEmployeeInvitation,
    { isLoading: isAcceptingInvitation, isSuccess: isInvitationSuccess },
  ] = useAcceptEmployeeInvitationMutation();

  const searchParams = useSearchParams();
  const invitedID = searchParams.get("id");

  const { data: invitedUsersData, isLoading: isLoadingInvitedUsers } =
    useGetInvitedEmployeesQuery(String(invitedID));

  const invitedUser = invitedUsersData ?? [];

  const handleSubmit = async () => {
    const payload = {
      email: (invitedUser as InvitedUser).email,
      first_name: (invitedUser as InvitedUser).first_name,
      last_name: (invitedUser as InvitedUser).last_name,
      password: formik.values.password,
    };
    const id = invitedID;

    try {
      await acceptEmployeeInvitation({ id, payload }).unwrap();
      toast.success("Account Created Successfully");
      setTimeout(() => {
        toast.dismiss();
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Failed to accept invitation:", error);
      toast.error("Failed to create account");
    }
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
    invitedUser,
    isLoadingInvitedUsers,
    isInvitationSuccess,
  };
};
