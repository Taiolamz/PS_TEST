"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { DefaultCheckIcon, DefaultRightArrowIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { checklistDetails } from "../checklist-steps";

const ChecklistOverviewContent = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-[768px]">
      <div className="flex gap-2 items-center justify-between bg-primary p-3 px-5 pl-8">
        <div className="flex flex-col gap-1">
          <p className="text-custom-gray-scale-white font-semibold text-lg">
            Complete your checklist
          </p>
          <p className="text-custom-gray-scale-white font-light text-[11px]">
            Get your acccount running, by completing the following steps
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-warning text-sm">0% completed</p>
          <Progress value={0} className="w-[150px] bg-custom-bg" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-1">
        {checklistDetails?.map((chi, idx) => {
          const { title, subTitle, items, isAllChecked, path } = chi;
          return (
            <Link
              href={path}
              key={idx}
              className="bg-custom-gray-scale-white p-10 pl-8 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <Checkbox
                    checked={isAllChecked}
                    className="border-[1px] shadow-none rounded-full h-5 w-5 border-custom-gray mt-[.1rem]"
                  />
                  <div className="flex flex-col">
                    <p className="text-custom-dark-gray font-medium text-base leading-5">
                      {title}
                    </p>
                    <p className="text-custom-gray-scale-400 font-light text-[11px]">
                      {subTitle}
                    </p>
                  </div>
                </div>
                <Image
                  src={DefaultRightArrowIcon}
                  alt="default right arrow"
                  className="hover:translate-x-[3px] transition-all duration-300"
                />
              </div>
              <div className="pl-5 flex flex-col gap-3 mt-5">
                {items?.map((chi, idx) => {
                  const { isChecked, label } = chi;
                  return (
                    <div key={idx} className="flex gap-2 items-center">
                      <DefaultCheckIcon fill={isChecked ? "#008080" : ""} />
                      <p className="font-light text-xs">{label}</p>
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistOverviewContent;
