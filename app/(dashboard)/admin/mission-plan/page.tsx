"use client"
import Image from "next/image";
import { StatsIcon } from "@/public/assets/icons";
import { GrayPlusIcon } from "@/public/assets/icons";
import React, { useState } from "react";
import Link from "next/link";
import CustomTab from "@/components/custom-tab";
import { PAGE_TABS } from "./_data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";

// import { DashboardLayout } from "../dashboard/_components/dashboard-layout";
// import DashboardNavContent from "../dashboard/_components/dashboard-layout/dashboard-nav-content";
import YearMissionPlanCard from "./_components/year-mission-plan-card";
import { AllEmployees } from "./_tabs";
import { allemployeeColumns, allemployeeData } from "./_data/all-employee-table-data";
import { EmptyState } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import DashboardLayout from "../../_layout/DashboardLayout";

// Mocking authenticated user role
// ROLES = 
const AUTH_USER_ROLE = {
  ADMIN: "admin",
  MANAGIN_DIRECTOR: "director",
  LINE_MANAGER: "line-manager",
  EMPLOYEE: "employee",

};

export default function Page() {
  // Set allMissionPlan state to empty array to simulate empty state
  const [allMissionPlan, setAllMissionPlan] = useState(['Mission Plan 1'])
  {/* Change AUTH_USER_ROLE here to simulate the different empty state */}
  const [authUserRole, setAuthUserRole] = useState(AUTH_USER_ROLE.LINE_MANAGER)


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
  // const data = useAppSelector((state) => state?.auth?.user);
  const ui = searchParams.get("ui");

  return (
    <DashboardLayout>
      <div className="p-5 w-full">
        {/* Change the PAGE_TABS here to simulate the different tabs */}
        <CustomTab options={PAGE_TABS.MANAGIN_DIRECTOR} slug="ui" />
      </div>

      <div className="flex flex-col p-5 w-full">
        {
          ui == "mission-plan" &&
          (allMissionPlan.length === 0 ?
            <>
              {authUserRole === AUTH_USER_ROLE.ADMIN && (
                <EmptyState
                  text="Create your Mission plan by using the button below"
                  handleClick={() => router.push("mission-plan/kickstart?ui=financial-year")}
                  btnText="Kickstart Financial Year"
                />
              )}
              {authUserRole !== AUTH_USER_ROLE.ADMIN && (
                <EmptyState
                  text="Create your Mission plan by using the button below"
                >
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => router.push("mission-plan/create?ui=overview")}
                    >Create Mission Plan </Button>
                  {authUserRole === AUTH_USER_ROLE.MANAGIN_DIRECTOR &&  <Button variant="outline"> Assign Task </Button>}
                  </div>
                </EmptyState>
              )}

            </>

            :
            <div className="w-full grid grid-cols-4 gap-4">
              {kickstartcard}
              {
                Array.from({length: 7}, (i, idx) => (
                   <YearMissionPlanCard key={idx} state="completed" handleClick={() => router.push(`${location}/2023?ui=${ui}`)} />
                ))
              }
            </div>)
        }

        {/* This section shows screens base on active tab*/}
        {ui == "all-employees" && <AllEmployees data={allemployeeData} columns={allemployeeColumns} />}
      </div>
    </DashboardLayout>
  );
}
