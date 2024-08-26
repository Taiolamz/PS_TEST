"use client";

import React from "react";
import Preview from "../view/_partials/preview";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetLineManagerMissionPlanQuery } from "@/redux/services/mission-plan/missionPlanApi";

const LineManagerMissionPlan = () => {
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

  const {
    data: lineManagerMissionPlan,
    isLoading: isLoadingLineManagerMissionPlan,
    isFetching: isFetchingLineManagerMissionPlan,
    isSuccess: fetchedLineManagerMissionPlan,
  } = useGetLineManagerMissionPlanQuery({ fiscalYear: active_fy_info.id });

  return (
    <DashboardLayout
      headerTitle={active_fy_info?.title}
      back
      // onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
      <div className="p-5">
        {/* <Preview
          data={{
            mission_statement: [],
            boundaries: [],
            measure_of_success: [],
            specified_tasks: [],
            strategic_intents: [],
          }}
          //   type="lineManagerPreview"
        /> */}
      </div>
    </DashboardLayout>
  );
};

export default LineManagerMissionPlan;
