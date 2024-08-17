"use client";

import { SmallManceLogo, ZojatechIcon } from "@/public/assets/icons";
import Image from "next/image";
import React, { ReactNode } from "react";

interface Prop {
  children: ReactNode;
  headerText?: string;
  subText?: ReactNode;
  height?: string;
  orgLogo: string;
  orgName: string;
}

const EmployeeInviteLayout = ({
  children,
  headerText,
  subText,
  height,
  orgLogo,
  orgName,
}: Prop) => {
  return (
    <div className="bg-primary w-screen h-screen py-10 flex flex-col items-center justify-center">
      <Image
        src={SmallManceLogo}
        alt="mance logo"
        className="w-[108px] h-[23px]"
      />
      <div
        className={`flex flex-col gap-3 mt-8 bg-custom-gray-scale-white p-8 rounded-lg w-[581px] ${
          height || "h-[804px]"
        } scroll-hidden overflow-auto `}
      >
        <>
          <div className="flex justify-center gap-3 items-center ">
            <Image
              src={orgLogo}
              alt={`${orgName || "logo"}`}
              width={80}
              height={80}
            />

            <p className="font-medium text-lg text-custom-blue-color capitalize">
              {orgName || "---------"}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-1">
            <p className="text-custom-dark-gray-300 font-medium text-xl">
              {headerText || "Join our organization"}
            </p>
            <p className="text-custom-secondary font-normal text-sm">
              {subText || (
                <>
                  Welcome to{" "}
                  <span className="text-custom-blue-color text-xs">
                    {orgName || "---------"}
                  </span>
                  , We are thrilled to have you join our team.
                </>
              )}
            </p>
          </div>
        </>

        {children}
      </div>
    </div>
  );
};

export default EmployeeInviteLayout;
