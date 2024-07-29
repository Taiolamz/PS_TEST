import React from "react";
import Link from "next/link"; 
import { DashboardLayout } from "../../../_components/dashboard-layout";
import { allemployeeColumns, allemployeeData } from "./all-employee-table-data";
import MissionAllTab from "../../_components/mission-plan-tab-button";
import AllEmployeeTable from "../../_components/all-employee-table";
import AllEmployeeMissionCard from "../../_components/all-employee-mission-card";

export default function AllEmployee({
  params,
}: {
  params: { missionplanid: string };
}) {
  const { missionplanid } = params;
  return (
    <DashboardLayout>
      <div className="p-5 w-full">
        <MissionAllTab activeTab={"allemployee"} />
        <AllEmployeeMissionCard />
        <div className="pt-12">
          <AllEmployeeTable
            data={allemployeeData}
            columns={allemployeeColumns}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
