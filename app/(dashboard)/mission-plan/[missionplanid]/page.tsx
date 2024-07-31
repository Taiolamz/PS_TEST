"use client";
import React from "react";
import MissionAllTab from "../_components/mission-plan-tab-button";
import MissionPlanTab from "./misson-plan-tab";
import { useRouter, useSearchParams } from "next/navigation";
import AllEmployeeTab from "./all-employee-tab";
import { PAGE_TABS } from "../_data";
import CustomTab from "@/components/custom-tab";
import { useAppSelector } from "@/redux/store";
import { DashboardLayout } from "../../dashboard/_components/dashboard-layout";
import DashboardNavContent from "../../dashboard/_components/dashboard-layout/dashboard-nav-content";

export default function MissionPlanId() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const data = useAppSelector((state) => state?.auth?.user);
  const ui = searchParams.get("ui");
  return (
    <DashboardLayout
      dynamiccontent={
        <DashboardNavContent
          title="Mission Plan 2023"
          showBack
        />
      }
    >
      
      <div className="flex flex-col p-5 w-full">
        Mission Plan Details
      </div>
    </DashboardLayout>
  );
}
