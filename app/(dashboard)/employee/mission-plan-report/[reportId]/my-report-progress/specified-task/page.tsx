"use client";

import React, { useState } from "react";
import TeamPerformanceBar from "../../../_partials/_my_report/_fragment/team-performance-bar";
import ReportFilter from "../../../_partials/_my_report/_fragment/report-filter";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import SpecifiedTaskDetailView from "../_partials/specified-task-detail-view";

const SpecifiedTaskProgress = () => {
  const [fiscalYear, setFiscalYear] = useState("");
  const [missionCycle, setMissionCycle] = useState("");
  const options = [
    {
      label: "Option one",
      value: "Option one",
    },
    {
      label: "Option two",
      value: "Option two",
    },
    {
      label: "Option three",
      value: "Option three",
    },
  ];
  return (
    <DashboardLayout
      headerTitle="Specified Task Overview"
      childClass="px-5 pb-10"
      back
    >
      <div className=" overflow-x-hidden px-5">
        <ReportFilter
          fiscalYearVal={fiscalYear}
          setFiscalYearVal={setFiscalYear}
          missionCycleVal={missionCycle}
          setMissionCycleVal={setMissionCycle}
          fiscalOptions={options}
          cycleOptions={options}
        />
      </div>
      <TeamPerformanceBar dntShowImg />
      <SpecifiedTaskDetailView />
    </DashboardLayout>
  );
};

export default SpecifiedTaskProgress;
