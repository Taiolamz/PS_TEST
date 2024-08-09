"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomTab from "@/components/custom-tab";
import { useAppSelector } from "@/redux/store";
import { getAvailableTabs, SUPER_ADMIN } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  allemployeeColumns,
  allemployeeData,
} from "../_data/all-employee-table-data";
import { AllEmployees } from "../_tabs";
import { FiscalYearInfo, MyMissionPlan } from "./_partials";
import { Dictionary } from "@/@types/dictionary";
import Link from "next/link";

const { ADMIN } = routesPath;

const SingleMissionPlan = () => {
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const { isPreview } = useAppSelector((state) => state?.mission_plan_preview);
  const user_info: Dictionary = useAppSelector((state) => state?.auth?.user);

  const searchParams = useSearchParams();
  // const data = useAppSelector((state) => state?.auth?.user);
  const ui = searchParams.get("ui");
  const router = useRouter();

  //   console.log(isPreview, "isPreview");
  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] text-sm bg-transparent border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

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
        <CustomTab
          options={getAvailableTabs({
            role: user_info?.role as string,
            isLineManager: user_info?.is_line_manager as boolean,
          })}
          slug="ui"
        />
         {isPreview && (
        <div className="flex gap-[10px]">
          <div className={`${btn}`}>
            <Link href="#">View Presentation Mode</Link>
          </div>
          <div className={`${btn}`}>
            <Link href={`${ADMIN.CREATE_MISSION_PLAN}?ui=overview`}>Edit Mission Plan</Link>
          </div>
        </div>
      )}
      </div>

      {ui === "mission-plan" && (
        <>
          {user_info?.role === SUPER_ADMIN && <FiscalYearInfo />}
          {user_info?.role !== SUPER_ADMIN && <MyMissionPlan />}
        </>
      )}
      {ui === "all-employees" && (
        <div className="p-5">
          <AllEmployees data={allemployeeData} columns={allemployeeColumns} />
        </div>
      )}
     
    </DashboardLayout>
  );
};

export default SingleMissionPlan;
