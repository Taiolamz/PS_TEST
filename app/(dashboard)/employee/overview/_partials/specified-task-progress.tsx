import { AchievementProgress, Legend } from "@/components/fragment";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardSpecifiedTaskSummaryQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { toWholeNumber } from "@/utils/helpers";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SpecifiedTaskProgress() {
  const { data, isLoading, isError } = useGetDashboardSpecifiedTaskSummaryQuery(
    {}
  );
  return isError ? (
    <section className="bg-white rounded-[5px] max-h-[426px] h-full w-full text-sm text-center place-content-center grid text-[var(--text-color2)]">
      No Specified Task Progress
    </section>
  ) : isLoading ? (
    <Skeleton className="rounded-[5px] max-h-[426px] h-full w-full bg-[var(--primary-accent-color)]" />
  ) : data?.data?.specified_tasks?.length === 0 ? (
    <section className="bg-white rounded-[5px] max-h-[426px] h-full w-full text-sm text-center place-content-center grid text-[var(--text-color2)]">
      No Specified Task Progress
    </section>
  ) : (
    <section className="bg-white rounded-[5px] px-5 pt-3 pb-8 space-y-5">
      {/* header */}
      <header className="flex mb-3 justify-between items-center">
        <h3 className="">Specified Task Progress</h3>
        <Link
          href={"#"}
          className="inline-flex items-center text-[var(--primary-color)] text-[13px] h-fit"
        >
          See all <ChevronRightIcon className="size-4" />
        </Link>
      </header>
      <div className="text-[var(--text-color)] mb-5 inline-flex gap-x-4">
        <p className="text-sm">
          Total Task:{" "}
          <span className="text-black">
            {data?.data?.specified_tasks_count || 0}
          </span>
        </p>
        <div className="inline-flex space-x-2 text-xs text-[var(--text-color)]">
          <span className="inline-flex items-center gap-x-1.5">
            <span className="block bg-[var(--primary-color)] size-1.5 rounded-[1px]" />
            Specified Task
          </span>
          <span className="inline-flex items-center gap-x-1.5">
            <span className="block bg-[var(--primary-accent-color)] size-1.5 rounded-[1px]" />
            Implied Task
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="space-y-6">
        {data?.data?.specified_tasks?.map((item: any, idx: number) => (
          <AchievementProgress
            title={
              <span className="inline-flex items-center gap-x-2 !text-black mb-3">
                Task {idx + 1}: {item?.task || ""}
                <span className="text-xs font-light text-[var(--text-color)]">
                  {item?.end_date}
                </span>
                <Legend
                  title={item?.status || ""}
                  barWidth={6}
                  barHeight={6}
                  color={returnStatusColor(item?.status)}
                  rounded
                />
              </span>
            }
            color="base"
            progress_value={toWholeNumber(item?.completed) || 0}
            target={item?.implied_task?.task || ""}
            targetColor="var(--text-color)"
            targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
            key={idx}
          />
        ))}
      </div>
    </section>
  );
}

const statusColors: {
  [key: string]: "default" | "green" | "red" | "blue" | "yellow";
} = {
  "In Progress": "blue",
  Completed: "green",
  "Under Review": "yellow",
  Overdue: "red",
};

const returnStatusColor = (
  status: string
): "default" | "green" | "red" | "blue" | "yellow" => {
  return statusColors[status] || "default";
};
