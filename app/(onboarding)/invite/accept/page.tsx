"use client";

import { Input } from "@/components/ui/input";
import { DefaultCheckIcon } from "@/public/assets/icons";
import Image from "next/image";
import React, { useState } from "react";
import { useEmployeeInvite } from "../../../(dashboard)/employee/_hook/useEmployeeInvite";
import TogglePassword from "@/components/toggle-password";
import { ManceLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import EmployeeInviteLayout from "../../onboarding/_components/invite-layout";

const OrganizationInvite = () => {
  const { formik, passwordValidations, handlePasswordChange, loading } =
    useEmployeeInvite();
  const [showPassword, setShowPassword] = useState(false);
  const btnClass = "font-normal py-0 h-[32px]  transition-all duration-300 ";
  return (
    <EmployeeInviteLayout>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="flex flex-col gap-4 mt-6"
      >
        <Input
          label="First Name"
          labelClass="pb-0"
          type="text"
          placeholder="First Name"
          id="first_name"
          name="first_name"
          onChange={formik.handleChange}
          isRequired
        />
        <Input
          label="Last Name"
          labelClass="pb-0"
          type="text"
          placeholder="Last Name"
          id="last_name"
          name="last_name"
          onChange={formik.handleChange}
          isRequired
        />

        <Input
          label="Email"
          labelClass="pb-0"
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          isRequired
        />

        <div className="relative">
          <Input
            isRequired
            labelClass="pb-0"
            label="Password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              handlePasswordChange(e.target.value);
            }}
            touched={formik.touched.password}
            error={formik.errors.password}
            placeholder="Input Password"
            type={showPassword ? "text" : "password"}
          />
          <TogglePassword
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
            className="top-10"
          />
        </div>
        <div className="flex flex-col gap-3">
          {passwordValidations.map((chi, idx) => {
            const { label, checked } = chi;
            return (
              <div className="flex gap-2 items-center" key={idx}>
                <DefaultCheckIcon
                  fill={checked ? "var(--primary-color)" : ""}
                />
                <p
                  className={`font-light text-xs transition duration-300 text-custom-gray-scale-300 ${
                    checked ? "text-primary" : ""
                  }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-5 items-center mt-8">
          <div
            className={`${
              !formik.isValid || !formik.dirty || loading
                ? "cursor-not-allowed"
                : ""
            }`}
          >
            <Button
              className={` ${btnClass}  font-light ${
                !formik.isValid || !formik.dirty || loading
                  ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
                  : ""
              } `}
              disabled={!formik.isValid || !formik.dirty || loading}
            >
              {loading ? <ManceLoader /> : "Create an account"}
            </Button>
          </div>
          {/* <Button
            variant="outline"
            className={`border-primary px-10 text-primary font-light  hover:text-primary ${btnClass}`}
            // onClick={onCancel}
          >
            Back
          </Button> */}
        </div>
        <p className="text-custom-gray-scale-400 font-light text-xs">
          By clicking the button above, you agree to our confidential
          information policies <br /> and use of terms. For more information,
          check out{" "}
          <span className="cursor-pointer text-primary">
            our Privacy Policy
          </span>
        </p>
      </form>
    </EmployeeInviteLayout>
  );
};

export default OrganizationInvite;
