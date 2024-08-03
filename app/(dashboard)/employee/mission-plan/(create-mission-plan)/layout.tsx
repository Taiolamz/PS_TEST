"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";

interface prop {
  children: React.ReactNode;
}

const prevPath = "/employee/mission-plan/";
const navItems = [
  { name: "Mission Plan Overview", path: `${prevPath}mission-plan-overview` },
  { name: "Mission Statement", path: `${prevPath}mission-statement` },
  { name: "Measure of Success", path: `${prevPath}measure-of-success` },
  { name: "Set Strategic Intent", path: `${prevPath}set-strategic-intent` },
  { name: "Specified Task", path: `${prevPath}specified-task` },
  { name: "Implied Task", path: `${prevPath}implied-task` },
  { name: "Freedom & Constraints", path: `${prevPath}freedom-constraints` },
];

export default function CreateMissionPlan({ children }: prop) {
  let pathname = usePathname();
  return (
    <DashboardLayout headerTitle="Mission Plan">
      <div className="flex items-start fixed w-full">
        <div className=" w-[15%]  border-r  border-grayDivider border-[1px] h-screen  overflow-hidden">
          <div className="text-grayText text-sm font-500 p-[1rem]">
            <h4>Create Mission Plan</h4>
          </div>
          <div className="flex flex-col gap-[5px] text-xs mt-[2px]">
            {navItems.map(({ name, path }, index) => {
              if (pathname === "/employee/mission-plan/approval-flow") {
                pathname = "/employee/mission-plan/freedom-constraints";
              }

              const isHightLighted = pathname === path;
              return (
                <Link
                  href={path}
                  key={index}
                  className={` px-[1rem] py-[8px] hover:bg-[var(--bg-primary-05)] hover:text-primary transition-colors duration-500 ease-in-out ${
                    isHightLighted
                      ? `bg-[var(--bg-primary-05)] hover:bg-[var(--bg-primary-05)] text-primary shadow-none`
                      : "text-grayScale"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-fit pl-[20px] pt-[20px] h-fit overflow-hidden">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
