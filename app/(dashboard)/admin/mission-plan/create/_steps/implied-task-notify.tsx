import { Button } from "@/components/ui/button";
import React from "react";

const ImpliedTaskNotify = ({ onProceed }: { onProceed: () => void }) => {
  const attentionIcon = (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_17869_310764)">
        <path
          d="M32 0C14.35 0 0 14.35 0 32C0 49.65 14.35 64 32 64C49.65 64 64 49.65 64 32C64 14.35 49.65 0 32 0ZM29.29 11.84C29.29 10.34 30.51 9.14 32 9.14C33.5 9.14 34.71 10.34 34.71 11.84V38.41C34.71 39.91 33.49 41.11 32 41.11C30.5 41.11 29.29 39.91 29.29 38.41V11.84ZM32 53.54C29.85 53.54 28.09 51.82 28.09 49.7C28.09 47.57 29.84 45.85 32 45.85C34.15 45.85 35.91 47.57 35.91 49.7C35.91 51.82 34.15 53.54 32 53.54Z"
          fill="#F04844"
        />
      </g>
      <defs>
        <clipPath id="clip0_17869_310764">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="p-3">
      <div className="flex flex-col gap-5 justify-center items-center text-center">
        <figure>{attentionIcon}</figure>
        <p>Note!</p>
        <p className="text-[#5B6871] text-[15px] font-normal">
          Set weight to the newly transfer implied tasks, Weight must add up to
          100%{" "}
        </p>
        <Button
          variant={"outline"}
          className="border-primary text-primary"
          onClick={onProceed}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default ImpliedTaskNotify;
