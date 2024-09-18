"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomTab from "@/components/custom-tab";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { ADMINS, getAvailableTabs, PAGE_TABS, SUPER_ADMIN } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { FiscalYearInfo, MyMissionPlan } from "./_partials";
import { Dictionary } from "@/@types/dictionary";
import { useDispatch } from "react-redux";
import AllEmployeeMissionPlan from "./_partials/all-employee-mission-plan";

const { ADMIN } = routesPath;

const SingleMissionPlan = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const ui = searchParams.get("ui");
  const id = searchParams.get("id"); //The fiscial year ID
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const user_info: Dictionary = useAppSelector((state) => state?.auth?.user);

  return (
    <DashboardLayout
      headerTitle={active_fy_info?.title}
      back
      onBack={() => router.push(`${ADMIN.MAIN_MISSION_PLAN}?ui=mission-plan`)}
    >
      <div
        style={{ backgroundColor: "rgba(244, 244, 244, 1)" }}
        className="p-5 w-full global_sticky_class flex justify-between items-center"
      >
        {/* user_info?.role */}
        <div className="flex flex-end w-full items-center">
          <div className="w-full">
            <CustomTab
              options={PAGE_TABS.ADMINS}
              slug="ui"
            />
            {/* <CustomTab
              options={getAvailableTabs({
                role: user_info?.role as string,
                isLineManager: user_info?.is_line_manager as boolean,
              })}
              slug="ui"
            /> */}
          </div>
        </div>
      </div>

      {ui === "mission-plan" && (
        <>
          {ADMINS?.includes(user_info?.role) && <FiscalYearInfo />}
          {/* {user_info?.role !== SUPER_ADMIN && <MyMissionPlan />} */}
        </>
      )}

      {ui === "all-employees" && <AllEmployeeMissionPlan />}
    </DashboardLayout>
  );
};

export default SingleMissionPlan;
