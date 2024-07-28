"use client";
import { ChangePasswordModal } from "@/components/atoms/modals";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import LoadingModal from "@/components/atoms/modals/loading";
import { InputOTPGenerator } from "@/components/otp-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/redux/services/auth/authApi";
import { timeToMinuteSecond } from "@/utils/helpers";
import useTimeout from "@/utils/hooks/useTimeout";
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
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [OTP, setOTP] = useState<any>("")

  const [forgotPassword, { isLoading: isSendingPasswordResetLink, isSuccess: isSentPasswordResetLink }] = useForgotPasswordMutation()

  const { timeLeft, startTimer, isTimerElapsed } = useTimeout({ initialTime: 30 });

  const handleFormSubmit = async () => {
    forgotPassword({ ...formik.values })
      .unwrap()
      .then((payload) => {
        setPasswordResetData(payload)
      })
  }

  const formik = useFormik({
    initialValues: { email: "" },
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

      {/* Email Sent Modal */}
      <ConfirmationModal
        show={false}
        handleClose={() => null}
        hasCloseButton={false}
        icon="/svgs/mail-sent.svg"
        title="Sent! check your email"
        message="Mail sent! Check your inbox to get your recovery otp and create your a new password."
        handleClick={() => {
          // resetRegistration()
          setShowVerifyOTP(true)
        }}
        actionBtnTitle="Continue"
      />

      {/* Verification Modal */}
      <ConfirmationModal
        show={showVerifyOTP}
        handleClose={() => setShowVerifyOTP(false)}
        hasCloseButton={false}
        title="Verify your email address"
        message={<span>A Six digit recovery OTP code has been sent to your email <span className="font-semibold">{formik.values.email}</span></span>}
        handleClick={() => null}
        actionBtnTitle="Verify OTP"
        actionBtnLoading={false}
        disableActionBtn={OTP.length < 6}
        content={
          <div className="my-8 flex justify-center flex-col items-center">
            <InputOTPGenerator length={6} onChange={(code) => setOTP(code)} />
          </div>
        }
        footerContent={<>
          {
            !isTimerElapsed ? (
              <div className="text-[#CC0905] text-center text-sm font-normal mt-8"> {timeToMinuteSecond(timeLeft)} mins remaining</div>
            ) : (
              <span className="block text-center font-normal mt-8 text-sm text-[#6E7C87]">Didn’t get the code? <Button
                disabled={false}
                variant="link" className="px-0 text-primary font-normal"
                onClick={() => null}
              >Resend</Button> </span>
            )
          }
        </>}
      />
      <ChangePasswordModal
        show={false}
        handleClose={() => null}
        handleClick={() => null}
      />
      <LoadingModal
        show={false}
        handleClose={() => null}
      />
    </div>
  );
};

export default ResetPassword;
