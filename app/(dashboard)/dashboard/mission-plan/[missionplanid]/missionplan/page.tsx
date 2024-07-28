import React from "react";
import Link from "next/link";
import MissionAllTab from "../../_components/mission-plan-tab-button";
import { DashboardLayout } from "../../../_components/dashboard-layout";

export default function MissionPlanId({
  params,
}: {
  params: { missionplanid: string };
}) {
  const { missionplanid } = params;
  return (
    <DashboardLayout>
      <div className="p-5 w-full">
        <MissionAllTab activeTab={"missionplan"} />
      </div>
    </DashboardLayout>
  );
}
