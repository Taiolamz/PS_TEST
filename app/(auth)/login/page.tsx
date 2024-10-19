"use client";

import { Dictionary } from "@/@types/dictionary";
import ConfirmationModal from "@/components/atoms/modals/confirm";
import LoadingModal from "@/components/atoms/modals/loading";
import { InputOTPGenerator } from "@/components/otp-generator";
import TogglePassword from "@/components/toggle-password";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAdminResendOTPMutation, useAdminVerifyOTPMutation, useLoginMutation } from "@/redux/services/auth/authApi";
import { checkUserRole, timeToMinuteSecond } from "@/utils/helpers";
import useTimeout from "@/utils/hooks/useTimeout";
import routesPath from "@/utils/routes";
import { LoginSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const { REGISTER, FORGOT_PASSWORD, ADMIN, EMPLOYEE, ONBOARDING } = routesPath;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [authUser, setAuthUser] = useState<Dictionary>({});

  const [login, { isLoading, error: apiError }]: any = useLoginMutation();

  const router = useRouter();

  const { timeLeft, startTimer, isTimerElapsed } = useTimeout({
    initialTime: 300,
  });

  const navigateToAuthScreen = (role: string) => {
    if (checkUserRole(role as string) === "ADMIN") {
      router.push(ADMIN.OVERVIEW);
    } else {
      router.push(EMPLOYEE.OVERVIEW);
    }
  }


  const [
    adminVerifyOTP,
    {
      isLoading: isVerifyingOTP,
      isSuccess: OTPVerified,
      reset: resetVerifyOTP,
    },
  ] = useAdminVerifyOTPMutation();
  const [
    resendOTP,
    { isLoading: isResendingOTP, isSuccess: OTPResent, reset: resetResendOTP },
  ] = useAdminResendOTPMutation();
  const [OTP, setOTP] = useState<any>("");

  const handleVerifyOTP = (OTP: any) => {
    adminVerifyOTP({ code: OTP })
      .unwrap()
      .then(() => {
        setShowVerifyOTP(false);
      });
  };

  const handleResendOTP = async () => {
    resendOTP({})
      .unwrap()
      .then(() => {
        toast.success(
          "Verification code has been successfully sent to your email address"
        );
        startTimer();
      });
  };

  const handleFormSubmit = async () => {
    login({ ...values })
      .unwrap()
      .then((param: any) => {
        const role = param?.data?.user?.role;
        const hasVerifiedEmail = param?.data?.user?.email_verified_at;
        setAuthUser(param?.data)
        if (!hasVerifiedEmail) {
          setShowVerifyOTP(true)
          startTimer();
          return
        }
        navigateToAuthScreen(role)

      })
      .catch(() => {
        // console.log(apiError)
      });
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="flex flex-col items-start w-4/6 bg-white">
      <div className="text-left font-semibold text-2xl mb-4 mx-auto w-[25rem]">
        Welcome Back,
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-6 mx-auto w-[25rem]"
      >
        <div className="mb-10 space-y-6">
          <div>
            <Input
              label="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              touched={touched.email}
              error={errors.email}
              placeholder="Input email"
            />
          </div>
          <div className="relative">
            <Input
              label="Password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              touched={touched.password}
              error={errors.password}
              placeholder="Input Password"
              type={showPassword ? "text" : "password"}
            />
            <TogglePassword
              showPassword={showPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
              className="top-8"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* <div className="flex items-center space-x-2">
            <Checkbox
              checked={values.remember}
              id="remember_me"
              onCheckedChange={() =>
                setFieldValue("remember", !values.remember)
              }
            />
            <label
              htmlFor="remember_me"
              className="text-sm font-medium ml-1 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div> */}
          <Link
            href={FORGOT_PASSWORD}
            className="text-primary font-normal text-xs ml-auto mt-[-2rem]"
          >
            Forgot Password
          </Link>
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            loadingText="Login"
            className={cn(
              "w-full",
              !isValid || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            )}
          >
            Log In
          </Button>
          <span className="text-sm text-center block mt-4">
            {" "}
            Don&apos;t have an account?{" "}
            <Link href={REGISTER} className="text-primary hover:underline">
              Register
            </Link>
          </span>
        </div>
      </form>
      <ConfirmationModal
        show={showVerifyOTP}
        handleClose={() => setShowVerifyOTP(false)}
        hasCloseButton={false}
        title="Verify your email address"
        message={
          <span>
            A Six digit OTP code has been sent to your email{" "}
            <span className="font-semibold">{values.email}</span>
          </span>
        }
        handleClick={() => {
          handleVerifyOTP(OTP);
        }}
        actionBtnTitle="Verify OTP"
        actionBtnLoading={isVerifyingOTP}
        disableActionBtn={OTP.length < 6 || isVerifyingOTP}
        content={
          <div className="my-8 flex justify-center flex-col items-center">
            <InputOTPGenerator length={6} onChange={(code) => setOTP(code)} />
            <div className="text-[#CC0905] text-center text-sm font-normal mt-8">
              {timeToMinuteSecond(timeLeft)} mins remaining
            </div>
          </div>
        }
        footerContent={
          <>
            <span className="block text-center font-normal mt-8 text-sm text-[#6E7C87]">
              Didn’t get the code?{" "}
              <Button
                disabled={isResendingOTP || !isTimerElapsed}
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
      <ConfirmationModal
        show={OTPVerified}
        handleClose={() => resetVerifyOTP()}
        hasCloseButton={false}
        icon="/svgs/mail-verified.svg"
        title="Welcome, You’re all set !"
        message={
          <span>
            Your email address <span className="font-semibold">{values.email}</span> has
            been verified. Now, this will be associated with your account. Click
            on the button below to continue
          </span>
        }
        handleClick={() => {
          resetVerifyOTP();
          setShowVerifyOTP(false)
          // navigateToAuthScreen(authUser?.user?.role)
          router.push(`${ONBOARDING}?ui=get-started&step=1`);
        }}
        actionBtnTitle={
          <div className="flex items-center gap-1">
            <span>Setup Organization</span>
            <ArrowRightIcon />
          </div>
        }
        footerContent={
          <p className="mt-6 font-normal text-[#9AA6AC] text-[11px] text-center">
            For more enquiries, contact support
            <span className="text-primary">@mancesupport.com</span>
          </p>
        }
      />
      <LoadingModal show={isResendingOTP} handleClose={() => null} />
    </div>
  );
}
