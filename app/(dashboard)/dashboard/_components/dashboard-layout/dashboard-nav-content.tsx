"use client";
import { DoubleGrayLeftArrow } from "@/public/assets/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardNavContent({
  title,
  showBack,
  handleGoBack,
}: {
  title: string;
  showBack?: boolean;
  handleGoBack?: () => void;
}) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="flex gap-4 items-center">
      {showBack ? (
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleGoBack ? handleGoBack : goBack}
        >
          <Image
            src={DoubleGrayLeftArrow}
            alt="arrow back"
            className="hover:-translate-x-1 transition-all duration-300 cursor-pointer"
          />
          <p className=" text-custom-gray-scale-400 font-normal text-sm">
            Back
          </p>
        </div>
      ) : null}
      <div className="flex gap-2 items-center">
        <p className="text-custom-dark-gray font-semibold text-base ">
          {title}
        </p>
      </div>
    </div>
  );
}
