"use client";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import { InputOTPGenerator } from "@/components/otp-generator";
import { Button } from "@/components/ui/button";
import routesPath from "@/utils/routes";
import { RegistrationSchema } from "@/utils/schema";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useFormik } from "formik";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmployeeInformation from "./_steps/employee-information";
import OrganizationInformation from "./_steps/organization-information";
import { useAdminResendOTPMutation, useAdminVerifyOTPMutation, useRegisterMutation } from "@/redux/services/auth/authApi";
import Cookies from "js-cookie"
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { resetAuth } from "@/redux/features/auth/authSlice";
import useTimeout from "@/utils/hooks/useTimeout";
import { timeToMinuteSecond } from "@/utils/helpers";
import LoadingModal from "@/components/atoms/modals/loading";

const { LOGIN, ONBOARDING, REGISTER } = routesPath

const SignupPage = () => {

  const [register, { isLoading: isRegistering, isSuccess: isRegistered, reset: resetRegistration }] = useRegisterMutation()
  const [adminVerifyOTP, { isLoading: isVerifyingOTP, isSuccess: OTPVerified, reset: resetVerifyOTP }] = useAdminVerifyOTPMutation()
  const [resendOTP, { isLoading: isResendingOTP, isSuccess: OTPResent, reset: resetResendOTP }] = useAdminResendOTPMutation()
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [OTP, setOTP] = useState<any>("")

  const location = usePathname()
  const searchParams = useSearchParams()
  const ui = searchParams.get('ui')
  const router = useRouter()

  const disptach = useAppDispatch()

  const handleFormSubmit = async () => {
    if (ui === "organization-information") {
      formik.setErrors({})
      formik.setTouched({})
      router.push(`${location}?ui=employee-information`)
    }
    if (ui === "employee-information") {
      register({ ...formik.values })
        .unwrap()
        .then((payload) => {
          toast.success('Account Registered Successfully')
        })
      // router.push(`${location}?ui=employee-information`)
    }
  }

  const handleResendOTP = async () => {
    resendOTP({})
      .unwrap()
      .then(() => {
        toast.success('Verification code has been successfully sent to your email address')
        startTimer();
      });
  };

  const handleVerifyOTP = (OTP) => {
    adminVerifyOTP({ code: OTP })
      .unwrap()
      .then(() => {
        toast.success('OTP Verified Successfully')
        setShowVerifyOTP(false)
      })
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      designation: "",
      organization_name: "",
      employees_range: "",
      country: "",
      state: "",
      address: "",
      city: ""
    },
    validationSchema: RegistrationSchema[ ui === 'organization-information' ? 0 : 1],
    onSubmit: handleFormSubmit
  })

  const { timeLeft, startTimer, isTimerElapsed } = useTimeout({ initialTime: 30 });

  useEffect(() => {
    // router.push(`${REGISTER}`)
    Cookies.remove('token')
    disptach(resetAuth())
  }, [])

  return (
    <section className="w-4/6">
      <h1 className="text-2xl font-semibold mb-4 text-[#162238]">
        Register your account
      </h1>
      <div className="h-[calc(100vh_-_6rem)] pb-10 scroll-hidden overflow-y-auto px-4 lg:mr-32">
        <form onSubmit={formik.handleSubmit}>
          {ui === "organization-information" && <OrganizationInformation formik={formik} />}
          {ui === "employee-information" && <EmployeeInformation formik={formik} />}


          <div className="mt-10">
            <Button
              className="w-full"
              type="submit"
              loading={isRegistering}
              disabled={isRegistering}
            // loadingText="Create Account"
            >{`${ui === 'employee-information' ? 'Create Account' : 'Next'}`}</Button>
            <div>
              <p className="mt-[18px] mb-6 text-foreground text-[0.8125rem]">
                By clicking the button above, you agree to our confidential information
                policies and use of terms. For more information, check out our{" "}
                <span className="text-primary">Privacy Policy</span>
              </p>
              <p className="mt-[18px] mb-6 text-foreground text-[0.8125rem]">
                Already have a Mance account?{" "}
                <Link href={LOGIN} className="text-primary">Log in</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      {/* Email Sent */}
      <ConfirmationModal
        show={isRegistered}
        handleClose={() => resetRegistration()}
        hasCloseButton
        icon="/svgs/mail-sent.svg"
        title="Check your mailbox !"
        message={<span>We’ve sent an email to <span className="font-semibold">{formik.values.email}</span>  with an OTP to confirm your account. Check your inbox to  activate your account.</span>}
        handleClick={() => {
          resetRegistration()
          setShowVerifyOTP(true)
        }}
        actionBtnTitle="Verify Email"
        footerContent={<>
          {
            !isTimerElapsed ? (
              <div className="text-[#CC0905] text-center text-sm font-normal mt-8"> {timeToMinuteSecond(timeLeft)} mins remaining</div>
            ) : (
              <span className="block text-center font-normal mt-8 text-sm text-[#6E7C87]">Didn’t get the code? <Button
                disabled={isResendingOTP}
                variant="link" className="px-0 text-primary font-normal"
                onClick={() => handleResendOTP()}
              >Resend</Button> </span>
            )
          }
        </>}
      />
      {/* Verify Email */}
      <ConfirmationModal
        show={showVerifyOTP}
        handleClose={() => setShowVerifyOTP(false)}
        hasCloseButton={false}
        title="Verify your email address"
        message={<span>A Six digit OTP code has been sent to your email <span className="font-semibold">{formik.values.email}</span></span>}
        handleClick={() => handleVerifyOTP(OTP)}
        actionBtnTitle="Verify OTP"
        actionBtnLoading={isVerifyingOTP}
        disableActionBtn={OTP.length < 6 || isVerifyingOTP}
        content={
          <div className="my-8 flex justify-center flex-col items-center">
            <InputOTPGenerator length={6} onChange={(code) => setOTP(code)} />
            {/* <p className="text-[#CC0905] text-xs mb-2 mt-[1.625rem]">
              0:20 mins remaining
            </p> */}
          </div>
        }
        footerContent={<>
          {
            !isTimerElapsed ? (
              <div className="text-[#CC0905] text-center text-sm font-normal mt-8"> {timeToMinuteSecond(timeLeft)} mins remaining</div>
            ) : (
              <span className="block text-center font-normal mt-8 text-sm text-[#6E7C87]">Didn’t get the code? <Button
                disabled={isResendingOTP}
                variant="link" className="px-0 text-primary font-normal"
                onClick={() => handleResendOTP()}
              >Resend</Button> </span>
            )
          }
        </>}
      />
      {/* Welcome */}
      <ConfirmationModal
        show={OTPVerified}
        handleClose={() => resetVerifyOTP()}
        hasCloseButton={false}
        icon="/svgs/mail-verified.svg"
        title="Welcome, You’re all set !"
        message={<span>Your email address <span className="font-semibold">{formik.values.email}</span>  has been verified. Now, this will be associated with your account. Click on the button below to continue</span>}
        handleClick={() => {
          resetVerifyOTP()
          router.push(`${ONBOARDING}?ui=get-started&step=1`)
        }}
        actionBtnTitle={<div className="flex items-center gap-1">
          <span>Setup Organization</span>
          <ArrowRightIcon />
        </div>
        }
        footerContent={<p className="mt-6 font-normal text-[#9AA6AC] text-[11px] text-center">
          For more enquiries, contact support
          <span className="text-primary">@mancesupport.com</span>
        </p>}
      />
      <LoadingModal
        show={isResendingOTP}
        handleClose={() => null}
      />
    </section>
  );
};

export default SignupPage;
