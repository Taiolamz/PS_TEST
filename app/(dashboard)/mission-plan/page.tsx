"use client"
import Image from "next/image";
import { StatsIcon } from "@/public/assets/icons";
import { GrayPlusIcon } from "@/public/assets/icons";
import React, { useState } from "react";
import Link from "next/link";
import EmptyKickstart from "./kickstart/_component/empty-kickstart";
import CustomTab from "@/components/custom-tab";
import { PAGE_TABS } from "./_data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { DashboardLayout } from "../dashboard/_components/dashboard-layout";
import DashboardNavContent from "../dashboard/_components/dashboard-layout/dashboard-nav-content";
import YearMissionPlanCard from "./_components/year-mission-plan-card";
import { AllEmployees } from "./_tabs";
import { allemployeeColumns, allemployeeData } from "./_data/all-employee-table-data";

export default function Page() {
  // Remove mission plan one from this state to simulate empty state
  const [allMissionPlan, setAllMissionPlan] = useState(['Mission Plan 1'])


  const kickstartcard = (
    <Link
      href="mission-plan/kickstart?ui=financial-year"
      className=" h-[140px] border bg-transparent rounded-[5px] border-custom-gray group hover:border-primary transition-all duration-300 p-4 cursor-pointer"
    >
      <div className="flex justify-between">
        <Image className="" src={StatsIcon} alt="plus" />
        <Image
          className="group-hover:scale-[1.02] transition-all duration-300"
          src={GrayPlusIcon}
          alt="plus"
        />
      </div>
      <div className="text-custom-gray-scale-400 mt-5 font-normal text-base ">
        Kickstart New <br /> Mission Plan
      </div>
    </Link>
  );

  const location = usePathname()
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = useAppSelector((state) => state?.auth?.user);
  const ui = searchParams.get("ui");

  return (
    <DashboardLayout
      dynamiccontent={<DashboardNavContent title="Mission Plan" />}
    >
      <div className="p-5 w-full">
        <CustomTab options={PAGE_TABS.MANAGIN_DIRECTOR} slug="ui" />
      </div>

      <div className="flex flex-col p-5 w-full">
        {
          ui == "mission-plan" &&
         ( allMissionPlan.length === 0 ? 
          <EmptyKickstart href="mission-plan/kickstart?ui=financial-year" /> :
            <div className="w-full grid grid-cols-4 gap-4">
              {kickstartcard}
              <YearMissionPlanCard state="completed" handleClick={() => router.push(`${location}/2023?ui=${ui}`)} />
              <YearMissionPlanCard state="completed" handleClick={() => router.push(`${location}/2023?ui=${ui}`)} />
              <YearMissionPlanCard state="in-progress" handleClick={() => router.push(`${location}/2023?ui=${ui}`)} />
              <YearMissionPlanCard state="completed" handleClick={() => router.push(`${location}/2023?ui=${ui}`)} />
              <YearMissionPlanCard state="in-progress" handleClick={() => router.push(`${location}/2023?ui=${ui}`)} />
            </div>)
        }
        { ui == "all-employees" &&  <AllEmployees data={allemployeeData} columns={allemployeeColumns}/> }
        {/* AllEmployeeTab */}
      </div>
    </DashboardLayout>
  );
}
