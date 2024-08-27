"use client";

import React from "react";
import Preview from "../view/_partials/preview";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useAppSelector } from "@/redux/store";
import { useGetLineManagerMissionPlanQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { PageLoader } from "@/components/custom-loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { isObjectEmpty } from "@/utils/helpers";
import { EmptyState } from "@/components/fragment";
import { EmptyFileIcon } from "@/public/assets/icons";

const LineManagerMissionPlan = () => {
  const router = useRouter();

  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );

  const {
    data: lineManagerMissionPlan,
    isLoading: isLoadingLineManagerMissionPlan,
    isFetching: isFetchingLineManagerMissionPlan,
    isSuccess: fetchedLineManagerMissionPlan,
    isError: errorLineManagerMissionPlan,
  } = useGetLineManagerMissionPlanQuery({ fiscalYear: active_fy_info.id });

  return (
    <DashboardLayout
      headerTitle={active_fy_info?.title}
      back
      // onBack={() => router.push(ADMIN.MISSION_PLAN)}
    >
      <div className="p-5">
        {isLoadingLineManagerMissionPlan ? (
          <div className="h-[75vh] grid place-content-center">
            <PageLoader />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-base font-medium">
                Line Manager Mission Plan
              </h2>
              <Button
                className="h-full px-6 py-[0.45rem] text-sm bg-transparent border border-primary text-[var(--primary-color)] shadow-none rounded-sm hover:bg-[var(--primary-accent-color)]"
                onClick={() => router?.back()}
              >
                Close
              </Button>
            </div>
            {errorLineManagerMissionPlan ||
            isObjectEmpty(lineManagerMissionPlan) ? (
              <EmptyState icon={EmptyFileIcon}>
                <p className="text-custom-gray-scale-400 font-medium text-sm -mt-3">
                  No Mission plan found
                </p>
              </EmptyState>
            ) : (
              <Preview
                data={lineManagerMissionPlan?.data}
                type="lineManagerPreview"
              />
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LineManagerMissionPlan;
