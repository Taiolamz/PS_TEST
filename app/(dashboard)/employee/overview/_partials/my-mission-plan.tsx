import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyMissionPlanQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";
import React from "react";

export default function MyMissionPlanCard() {
  const { data, isLoading, isError } = useGetMyMissionPlanQuery({});

  return isError ? (
    <section className="bg-white rounded-[5px] h-[156px] w-full text-sm text-center place-content-center grid text-[var(--text-color2)]">
      No Mission Plan
    </section>
  ) : isLoading ? (
    <Skeleton className="rounded-[5px] h-[156px] w-full bg-[var(--primary-accent-color)]" />
  ) : (
    <section className="bg-white rounded-[5px] px-5 pt-3 pb-8 space-y-5">
      {/* Header/Title for card */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-base">
            {data?.data?.mission_plan_progress?.fiscal_year ||
              "My Mission Plan"}
          </p>
          <span className="text-xs text-[var(--text-color2)]">
            {formatToReadableDate(
              data?.data?.mission_plan_progress?.start_date
            )}{" "}
            -{" "}
            {formatToReadableDate(data?.data?.mission_plan_progress?.end_date)}
          </span>
        </div>
        <div className="inline-flex space-x-2 text-xs text-[var(--text-color)]">
          <span className="inline-flex items-center gap-x-1.5">
            <span className="block bg-[var(--primary-color)] size-1.5 rounded-[1px]" />
            Measure of Success
          </span>
          <span className="inline-flex items-center gap-x-1.5">
            <span className="block bg-[var(--primary-accent-color)] size-1.5 rounded-[1px]" />
            Task Performance
          </span>
        </div>
      </div>
      {/* content */}
      <main className="w-full space-y-3 transition-all duration-1000 delay-700 ease-linear">
        <div className="flex gap-x-3 font-medium text-xs text-[var(--text-color5)]">
          <div
            className={`block bg-[var(--primary-color)] rounded-tl-sm rounded-bl-sm h-4`}
            style={{
              width: `${
                Math?.round(
                  Number(
                    data?.data?.mission_plan_progress?.measure_of_success?.split(
                      "%"
                    )[0]
                  )
                ) || 0
              }%`,
            }}
          />
          {Math?.round(
            Number(
              data?.data?.mission_plan_progress?.measure_of_success?.split(
                "%"
              )[0]
            )
          ) || 0}
          %
        </div>
        <div className="flex gap-x-3 font-medium text-xs text-[var(--text-color5)]">
          <div
            className={`block bg-[var(--primary-accent-color)] rounded-tl-sm rounded-bl-sm h-4`}
            style={{
              width: `${
                Math?.round(
                  Number(
                    data?.data?.mission_plan_progress?.task_performance?.split(
                      "%"
                    )[0]
                  )
                ) || 0
              }%`,
            }}
          />
          {Math?.round(
            Number(
              data?.data?.mission_plan_progress?.task_performance?.split("%")[0]
            )
          ) || 0}
          %
        </div>
      </main>
    </section>
  );
}
