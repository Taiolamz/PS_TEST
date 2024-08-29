"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomTab from "@/components/custom-tab";
import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { getAvailableTabs, SUPER_ADMIN } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import {
  AllEmployeeMissionPlan,
  Approvals,
  DirectDownline,
  FiscalYearInfo,
  MyMissionPlan,
} from "./_partials";
import { Dictionary } from "@/@types/dictionary";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExportIcon } from "@/public/assets/icons";
import Image from "next/image";

const { EMPLOYEE } = routesPath;

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
  const { isPreview } = useAppSelector((state) => state?.mission_plan_preview);
  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] text-sm bg-transparent border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

  const user_hierarchy = useAppSelector(
    (state) => state?.auth?.user?.organization?.hierarchy
  );
  const newBtnClass =
    "text-custom-gray-scale-400 text-xs font-light cursor-pointer";

  const exportDrop = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border px-4 rounded-[6px] h-[33px] focus:border-0 hover:bg-white"
        >
          <div className="flex gap-3 items-center">
            <Image src={ExportIcon} alt="export" />
            <p className="text-custom-gray-scale-400 font-normal text-xs">
              Export
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border rounded-sm"
        align="end"
        style={{ width: "10rem" }}
      >
        <DropdownMenuItem className={newBtnClass}>PDF</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={newBtnClass}>CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <DashboardLayout
      headerTitle={active_fy_info?.title}
      back
      onBack={() =>
        router.push(`${EMPLOYEE.MAIN_MISSION_PLAN}?ui=mission-plan`)
      }
    >
      <div
        style={{ backgroundColor: "rgba(244, 244, 244, 1)" }}
        className="p-5 w-full global_sticky_class  items-center"
      >
        {/* user_info?.role */}
        <div className="flex flex-end w-full items-center">
          <div className="w-full">
            <CustomTab
              options={getAvailableTabs({
                role: user_info?.role as string,
                isLineManager: user_info?.is_line_manager as boolean,
              })}
              slug="ui"
            />
          </div>
          <div>{ui === "mission-plan" && exportDrop}</div>
        </div>

        {/* {isPreview && (
          <div className="flex gap-[10px] ml-auto">
            <div className={`${btn}`}>
              <Link href="#">View Presentation Mode</Link>
            </div>

            <div className={`${btn}`}>
              <Link href={`${EMPLOYEE.CREATE_MISSION_PLAN}?ui=overview`}>
                Edit Mission Plan
              </Link>
            </div>
          </div>
        )} */}
      </div>

      {ui === "mission-plan" && (
        <>
          {user_info?.role === SUPER_ADMIN && <FiscalYearInfo />}
          {user_info?.role !== SUPER_ADMIN && <MyMissionPlan />}
        </>
      )}

      {ui === "downlines" && <DirectDownline />}
      {ui === "approvals" && <Approvals />}
      {ui === "all-employees" && <AllEmployeeMissionPlan />}
    </DashboardLayout>
  );
};

export default SingleMissionPlan;
