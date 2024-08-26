"use client";
import { Dictionary } from "@/@types/dictionary";
import { ChangePasswordModal } from "@/components/atoms/modals";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import LoadingModal from "@/components/atoms/modals/loading";
import { InputOTPGenerator } from "@/components/otp-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useForgotPasswordMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
} from "@/redux/services/auth/authApi";
import { timeToMinuteSecond } from "@/utils/helpers";
import useTimeout from "@/utils/hooks/useTimeout";
import routesPath from "@/utils/routes";
import { ResetPasswordSchema } from "@/utils/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

type Props = {};

enum NotWorkEmails {
  GMAIL = "gmail.com",
  YAHOO = "yahoo.com",
  OUTLOOK = "outlook.com",
  HOTMAIL = "hotmail.com",
  // Add other non-work email domains here
}

const { LOGIN } = routesPath;

const ResetPassword = () => {
  const [passwordResetData, setPasswordResetData] = useState<Dictionary>({});
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [OTP, setOTP] = useState<any>("");

  const [
    forgotPassword,
    {
      isLoading: isSendingPasswordResetLink,
      isSuccess: isSentPasswordResetLink,
      reset: resetSendPasswordReset,
    },
  ] = useForgotPasswordMutation();
  const [
    resetPassword,
    {
      isLoading: isResetingPassword,
      isSuccess: isSuccessPasswordReset,
      reset: resetPasswordReset,
    },
  ] = useResetPasswordMutation();
  const [
    verifyOTP,
    {
      isLoading: isVerifyingOTP,
      isSuccess: OTPVerified,
      reset: resetVerifyOTP,
    },
  ] = useVerifyOTPMutation();
  const [
    resendOTP,
    { isLoading: isResendingOTP, isSuccess: OTPResent, reset: resetResendOTP },
  ] = useResendOTPMutation();

  const router = useRouter();

  const { timeLeft, startTimer, isTimerElapsed } = useTimeout({
    initialTime: 300,
  });

  const handleVerifyOTP = (OTP: any) => {
    const payload = {
      code: OTP,
      email: formik.values.email,
      otpType: "password_reset",
    };
    verifyOTP(payload)
      .unwrap()
      .then((payload) => {
        setPasswordResetData(payload);
        toast.success("OTP Verified Successfully");
        setShowVerifyOTP(false);
      });
  };

  const handleResendOTP = () => {
    const payload = {
      email: formik.values.email,
      otpType: "email-verification",
    };
    resendOTP({ ...payload })
      .unwrap()
      .then((payload) => {
        toast.success("OTP Resent Successfully");
        startTimer();
      });
  };

  const handleFormSubmit = async () => {
    forgotPassword({ ...formik.values })
      .unwrap()
      .then(() => {});
  };

  const handleResetPassword = async () => {
    resetPassword({
      ...formik_pr.values,
      ...passwordResetData,
      reference: passwordResetData.data,
      email: formik.values.email,
    })
      .unwrap()
      .then(() => {
        resetPasswordReset();
        toast.success("Password Reset Successfully");
        new Promise(() => {
          toast.loading("Redirecting to login...");
          setTimeout(() => {
            toast.dismiss();
            router.push(LOGIN);
          }, 2000);
        });
      });
  };
  const formik_pr = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: handleResetPassword,
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Enter your email address"),
    }),
    onSubmit: handleFormSubmit,
  });

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
          <div className="flex items-center justify-between">
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
          <span className="text-sm text-center block mt-4">
            {" "}
            Already have an account?{" "}
            <Link href={LOGIN} className="text-primary hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>

      {/* Email Sent Modal */}
      <ConfirmationModal
        show={isSentPasswordResetLink}
        handleClose={() => resetSendPasswordReset()}
        hasCloseButton={false}
        icon="/svgs/mail-sent.svg"
        title="Sent! check your email"
        message="Mail sent! Check your inbox to get your recovery otp and create your a new password."
        handleClick={() => {
          resetSendPasswordReset();
          setShowVerifyOTP(true);
        }}
        actionBtnTitle="Continue"
      />

      {/* Verification Modal */}
      <ConfirmationModal
        show={showVerifyOTP}
        handleClose={() => setShowVerifyOTP(false)}
        hasCloseButton={false}
        title="Recover Password"
        message={
          <span>
            A Six digit recovery OTP code has been sent to your email{" "}
            <span className="font-semibold">{formik.values.email}</span>
          </span>
        }
        handleClick={() => handleVerifyOTP(OTP)}
        actionBtnTitle="Verify OTP"
        actionBtnLoading={false}
        disableActionBtn={OTP.length < 6}
        content={
          <div className="my-8 flex justify-center flex-col items-center">
            <InputOTPGenerator length={6} onChange={(code) => setOTP(code)} />
            <div className="text-[#CC0905] text-center text-sm font-normal mt-8">
              {" "}
              {timeToMinuteSecond(timeLeft)} mins remaining
            </div>
          </div>
        }
        footerContent={
          <>
            <span className="block text-center font-normal mt-8 text-sm text-[#6E7C87]">
              Didn’t get the code?{" "}
              <Button
                disabled={!isTimerElapsed}
                variant="link"
                className="px-0 text-primary font-normal"
                onClick={() => handleResendOTP()}
              >
                Resend
              </Button>{" "}
            </span>
          </>
        }
      />
      <ChangePasswordModal
        formik={formik_pr}
        show={OTPVerified}
        loading={isResetingPassword}
        handleClose={() => null}
        handleClick={() => formik_pr.handleSubmit()}
      />
      <LoadingModal
        show={isVerifyingOTP || isResendingOTP}
        handleClose={() => null}
      />
    </div>
  );
};

export default ResetPassword;
