"use client";

import { CheckIcon, SmallManceLogo } from "@/public/assets/icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { checklistSidebar } from "../../checklist-steps";

const ChecklistSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-primary w-[235px]  h-screen overflow-auto customScrollbar">
      <Image src={SmallManceLogo} alt="mance logo" className="m-auto mt-5" />
      <div className="flex flex-col gap-6 mt-14">
        <p className="font-normal pl-10 text-custom-gray-scale-white text-base">
          Checklist
        </p>
        <div className={`flex flex-col gap-3 pl-3 `}>
          {checklistSidebar.map((chi, idx) => {
            const { title, items, path } = chi;
            const isHightLighted = pathname.includes(path);
            return (
              <div
                key={idx}
                className={`${
                  isHightLighted
                    ? "bg-custom-transparent  border-0 pb-3 rounded-l-sm"
                    : ""
                }`}
              >
                <div className="flex gap-3 items-center m-3">
                  <Image src={CheckIcon} alt="check" />
                  <p className="text-custom-gray-scale-white font-light text-xs">
                    {title}
                  </p>
                </div>
                <div className={`flex flex-col gap-3 mt-3 pl-8 `}>
                  {items?.map((chi, idx) => (
                    <div
                      key={idx}
                      className="text-custom-gray-scale-white font-light text-[11px]"
                    >
                      <div className="flex gap-2 items-center">
                        <p>•</p>
                        {chi}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChecklistSidebar;
