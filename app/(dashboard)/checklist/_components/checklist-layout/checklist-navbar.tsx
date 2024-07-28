"use client";

import { ManceLoader } from "@/components/custom-loader";
import { ModalButtonOpen } from "@/components/dashboard/pages";
import { Button } from "@/components/ui/button";
// import { useUserStore } from "@/providers/user-store-provider";
import { DoubleGrayLeftArrow } from "@/public/assets/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ChecklistNavbar = ({
  title,
  step,
  btnDisabled,
  onProceedBtn,
  showBtn,
  shouldProceed,
  onCancel,
  loading,
}: DashboardSettingsNavType) => {
//   const setUser = useUserStore((state) => state.setUser);

//   const handleGetUserDetails = useCallback(() => {
//     const user = JSON.parse(localStorage.getItem("user-details") as string);
//     setUser(user);
//   }, [setUser]);

//   useEffect(() => {
//     handleGetUserDetails();
//   }, [handleGetUserDetails]);

  const router = useRouter();
  const goBack = () => router.back();
  const btnClass =
    "font-normal py-0 px-4 h-[32px]  transition-all duration-300 ";
  const CustomBtn = (
    <div className="flex gap-3 items-center">
      <ModalButtonOpen>
        <Button
          variant="outline"
          className={`border-primary text-primary font-light  hover:text-primary ${btnClass}`}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </ModalButtonOpen>
      <div className={`${btnDisabled || loading ? "cursor-not-allowed" : ""}`}>
        <ModalButtonOpen>
          <Button
            onClick={onProceedBtn}
            className={`${btnClass}  font-light ${
              (btnDisabled && !shouldProceed) || loading
                ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
                : ""
            } `}
            disabled={
              (btnDisabled && !shouldProceed) || loading ? btnDisabled : false
            }
          >
            {loading ? <ManceLoader /> : shouldProceed ? "Proceed" : "Save"}
          </Button>
        </ModalButtonOpen>
      </div>
    </div>
  );
  return (
    <div className="absolute h-[45px] right-0 p-3 w-[calc(100%-235px)] px-8 pr-16 bg-custom-light-gray">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="flex gap-3 items-center">
            <Image
              src={DoubleGrayLeftArrow}
              alt="arrow back"
              className="hover:-translate-x-1 transition-all duration-300 cursor-pointer"
              onClick={goBack}
            />
            <p className="text-custom-dark-gray font-medium text-base ">
              {title || "Subsidiaries"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-primary font-normal text-xs">
              {step || "1 of 4"}
            </p>
          </div>
        </div>
        {showBtn ? CustomBtn : null}
      </div>
    </div>
  );
};

export default ChecklistNavbar;
