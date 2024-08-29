"use client";

import TogglePassword from "@/components/toggle-password";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/services/auth/authApi";
import { checkUserRole } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { LoginSchema } from "@/utils/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { REGISTER, FORGOT_PASSWORD, ADMIN, EMPLOYEE } = routesPath;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error: apiError }]: any = useLoginMutation();

  const router = useRouter();

  const handleFormSubmit = async () => {
    login({ ...values })
      .unwrap()
      .then((param: any) => {
        const role = param?.data?.user?.role;

        if (checkUserRole(role as string) === "ADMIN") {
          router.push(ADMIN.OVERVIEW);
        } else {
          router.push(EMPLOYEE.OVERVIEW);
        }
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
    <div className="flex flex-col items-start w-[25rem] w-4/6 bg-white">
      <div className="text-left font-semibold text-2xl mb-4">Welcome Back,</div>
      <form  onSubmit={handleSubmit} className="mt-6 w-full">
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
    </div>
  );
}
