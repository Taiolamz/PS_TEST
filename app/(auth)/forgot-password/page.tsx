"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/redux/services/auth/authApi";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup"

type Props = {};

enum NotWorkEmails {
  GMAIL = "gmail.com",
  YAHOO = "yahoo.com",
  OUTLOOK = "outlook.com",
  HOTMAIL = "hotmail.com",
  // Add other non-work email domains here
}

const ResetPassword = () => {
  const [passwordResetData, setPasswordResetData] = useState({})

  const [forgotPassword, {isLoading: isSendingPasswordResetLink, isSuccess: isSentPasswordResetLink}] = useForgotPasswordMutation()

  const handleFormSubmit = async () => {
    forgotPassword({...formik.values})
    .unwrap()
    .then((payload) => {
      setPasswordResetData(payload)
    })
  }

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: yup.object().shape({
      email: yup.string().email("Enter a valid email").required("Enter your email address")
    }),
    onSubmit: handleFormSubmit
  })

  return (
    <div className="max-w-[26.5625rem] flex flex-col gap-4 lg:mr-20">
      <h1 className="text-2xl font-semibold text-[#162238]">Reset Password</h1>
      <p className="text-foreground text-[0.8125rem] text-[#6E7C87]">{`Enter your registered account email address & we'll send you a recovery OTP to reset your password e.g yourmail@gmail.com`}</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Input
                label="Email"
                id=""
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                touched={formik.touched.email}
                error={formik.errors.email}
                placeholder="Input email"
              />
            </div>
            <div className="ml-auto">
              <Button
                loading={isSendingPasswordResetLink}
                disabled={isSendingPasswordResetLink}
                loadingText="Send"
                type="submit"
                className="px-8 rounded-sm"
              >
                Send
              </Button>
            </div>
          </div>
        </form>
    </div>
  );
};

export default ResetPassword;
