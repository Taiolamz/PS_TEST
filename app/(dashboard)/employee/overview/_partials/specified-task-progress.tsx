import { AchievementProgress, Legend } from "@/components/fragment";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetStaffSpecifiedTaskQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useAppSelector } from "@/redux/store";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SpecifiedTaskProgress() {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetStaffSpecifiedTaskQuery({
    id: user?.id,
  });
  return isError ? (
    <section className="bg-white rounded-[5px] max-h-[350px] h-full w-full text-sm text-center place-content-center grid text-[var(--text-color2)]">
      No Specified Task Progress
    </section>
  ) : isLoading ? (
    <Skeleton className="rounded-[5px] max-h-[350px] h-full w-full bg-[var(--primary-accent-color)]" />
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
          Total Task: <span className="text-black">{20}</span>
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
        <AchievementProgress
          title={
            <span className="inline-flex items-center gap-x-2 !text-black mb-3">
              Task 1: Complete Hifi Design
              <span className="text-xs font-light text-[var(--text-color)]">
                10/12/2024
              </span>
              <Legend
                title="In Review"
                barWidth={6}
                barHeight={6}
                color="blue"
                rounded
              />
            </span>
          }
          color="base"
          progress_value={50}
          target="Revenue (150,000,000$)"
          targetColor="var(--text-color)"
          targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
        />

        <AchievementProgress
          title={
            <span className="inline-flex items-center gap-x-2 !text-black mb-3">
              Task 2: Complete Hifi Design
              <span className="text-xs font-light text-[var(--text-color)]">
                10/12/2024
              </span>
              <Legend
                title="In Progress"
                barWidth={6}
                barHeight={6}
                color="yellow"
                rounded
              />
            </span>
          }
          color="base"
          progress_value={65}
          target="Revenue (150,000,000$)"
          targetColor="var(--text-color)"
          targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
        />

        <AchievementProgress
          title={
            <span className="inline-flex items-center gap-x-2 !text-black mb-3">
              Task 3: Complete Hifi Design
              <span className="text-xs font-light text-[var(--text-color)]">
                10/12/2024
              </span>
              <Legend
                title="Overdue"
                barWidth={6}
                barHeight={6}
                color="red"
                rounded
              />
            </span>
          }
          color="base"
          progress_value={75}
          target="Revenue (150,000,000$)"
          targetColor="var(--text-color)"
          targetClassName="!h-4 pl-2 mt-3 bg-[var(--primary-accent-color)]"
        />
      </div>
    </section>
  );
}
