"use client";
import React from "react";
import EmployeeInviteLayout from "../component/invite-layout";
import { useRejectEmployeeInvite } from "../_hook/useRejectInvite";
import { Button } from "@/components/ui/button";
import { ManceLoader } from "@/components/custom-loader";

const RejectInvite = () => {
  const { formik, reasons, loading } = useRejectEmployeeInvite();
  const btnClass = "font-normal py-0 h-[32px]  transition-all duration-300 ";

  return (
    <EmployeeInviteLayout
      headerText="Reason for Rejection"
      height="h-[554px]"
      subText={
        <p>
          Kindly state your reasons for rejecting{" "}
          <span className="text-custom-blue-color">Zojatech’s</span> invite{" "}
        </p>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-4 mt-8">
          {reasons.map((reason) => (
            <label
              key={reason.value}
              className="flex gap-4 items-center text-custom-secondary cursor-pointer font-light text-sm"
            >
              <input
                type="radio"
                name="reason"
                value={reason.value}
                onChange={formik.handleChange}
                checked={formik.values.reason === reason.value}
                className="radio-custom"
              />
              {reason.label}
            </label>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-custom-gray-scale-400 font-light text-sm mb-4">
            Other reasons:
          </p>
          <textarea
            value={formik.values.others}
            id="others"
            name="others"
            className="border font-light text-custom-gray-scale-400 text-sm w-full p-3 h-[95px] focus:border-primary outline-none rounded-lg"
            onChange={formik.handleChange}
          />
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
              className={` ${btnClass}  font-light px-10 ${
                !formik.isValid || !formik.dirty || loading
                  ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
                  : ""
              } `}
              disabled={!formik.isValid || !formik.dirty || loading}
            >
              {loading ? <ManceLoader /> : "Send"}
            </Button>
          </div>
          <Button
            variant="outline"
            className={`border-primary px-10 text-primary font-light  hover:text-primary ${btnClass}`}
            // onClick={onCancel}
          >
            Back
          </Button>
        </div>
      </form>
    </EmployeeInviteLayout>
  );
};

export default RejectInvite;
