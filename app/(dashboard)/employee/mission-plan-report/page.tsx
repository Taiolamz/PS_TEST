"use client";

import DashboardLayout from "../../_layout/DashboardLayout";
import CustomTab from "@/components/custom-tab";
import { REPORT_PAGE_TABS } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import {
  Approvals,
  Downlines,
  MeasureOfSuccess,
  MyReport,
  TaskOutcome,
} from "./_partials";

const MissionPlanReport = () => {
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const getView = () => {
    switch (ui) {
      case "measure_of_success":
        return <MeasureOfSuccess />;
      case "task_outcome":
        return <TaskOutcome />;
      case "approvals":
      case "approvals-successs":
        return <Approvals />;
      case "downlines":
        return <Downlines />;
      default:
        return <MyReport />;
    }
  };

  return (
    <DashboardLayout headerTitle="Welcome Hassan !">
      <div className="pb-10 overflow-x-hidden">
        <div className="bg-[#F6F8F9] ">
          <p className="text-[#3E4345] pl-8 py-3">
            {ui === "approvals"
              ? "Get all pending approvals done."
              : " Let’s see how well you are hitting your goals!"}
          </p>
        </div>
        {/* <div className=""> */}
        <div className="p-5 mt-5">
          <CustomTab options={REPORT_PAGE_TABS.EMPLOYEE} slug="ui" />
          {getView()}
        </div>
        {/* </div> */}
      </div>
    </DashboardLayout>
  );
};

export default MissionPlanReport;
