import MetricFrame from "@/components/card/frame";
import CheckUrlFragment from "@/components/fragment/ImageFallBack";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetTeamPerformanceQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useAppSelector } from "@/redux/store";
import { returnInitial, toWholeNumber } from "@/utils/helpers";
import React from "react";

const TeamPerformanceBar = () => {
  // Filter
  const { fiscal_year, mission_cycle } = useAppSelector(
    (state) => state.employee_mission_plan_filter
  );

  const {
    data: orgData,
    isLoading: loadingOrg,
    isFetching: fetchingOrg,
  } = useGetTeamPerformanceQuery({
    fiscal_year: fiscal_year || "",
    cycle: mission_cycle || "",
  });

  return (
    //  Team Performance task bar Start
    loadingOrg || fetchingOrg ? (
      <Skeleton className="w-full h-[198px] bg-[var(--primary-accent-color)] rounded-sm mt-10" />
    ) : (
      <MetricFrame className="flex flex-col gap-4 mt-10">
        <div className="flex justify-between items-center">
          <p className="">My Team Performance Task Bar</p>
          <p>Total Tasks: {orgData?.data?.my_team?.grand_total}</p>
        </div>

        {/* -------MULTI PROGRESS BAR------ */}
        <div className="mt-14">
          <div className="flex h-1.5 w-full rounded bg-[var(--input-bg)]">
            {/* in progress */}
            {orgData?.data?.my_team?.progress?.map((chi: any, idx: number) => {
              const { status, percentage } = chi;
              return (
                <span
                  className={cn(
                    "block h-full",
                    idx === 0 && "rounded-l",
                    idx === orgData?.data?.my_team.length - 1 && "rounded-l"
                  )}
                  style={{
                    width: `${toWholeNumber(percentage)}%`,
                    backgroundColor: returnStatusColor(status),
                  }}
                  key={idx}
                />
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-4 items-center mt-5 ">
              {orgData?.data?.my_team?.progress?.map((chi: any) => {
                const { status, total } = chi;
                return (
                  <div className="flex flex-col gap-2" key={chi?.status}>
                    <div className="flex gap-2 items-center">
                      <span
                        style={{
                          backgroundColor: returnStatusColor(status),
                        }}
                        className={` h-[6px] w-[6px] rounded-[1.06px]`}
                      />
                      <p className="text-[#6E7C87] text-xs">{status}</p>
                    </div>
                    <p
                      className={`text-sm ml-4`}
                      style={{ color: returnStatusColor(status) }}
                    >
                      {total}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* ------PROFILE IMAGE DISPLAY -------- */}
            <div className="flex -space-x-4">
              {orgData?.data?.my_team?.team_members
                ?.slice(0, 4)
                ?.map((chi: any, idx: number) => (
                  <div
                    key={idx}
                    className="mt-9 inline-flex items-center gap-x-4"
                  >
                    <CheckUrlFragment
                      url={chi?.photo as any}
                      height={160}
                      width={160}
                      imgClassName="rounded-full"
                      className="size-[35px] rounded-full bg-[var(--primary-accent-color)] text-white border border-[#ffff] place-content-center grid text-xs"
                    >
                      <div className="size-[35px] rounded-full bg-[var(--primary-color)] text-white border border-[#ffff] place-content-center grid text-xs">
                        {returnInitial(chi?.name)}
                      </div>
                    </CheckUrlFragment>
                  </div>
                ))}
            </div>
            {/* ------PROFILE IMAGE DISPLAY -------- */}
          </div>
        </div>
        {/* -------MULTI PROGRESS BAR------ */}
      </MetricFrame>
    )
  );
};

export default TeamPerformanceBar;

const statusColors: { [key: string]: string } = {
  "In Progress": "#FFA500",
  Completed: "#008000",
  "Under Review": "#FFD700",
  Overdue: "#FF0000",
};

const valueColor = (number: number): "red" | "yellow" | "green" => {
  if (number >= 70) {
    return "green";
  } else if (number >= 40 && number <= 69) {
    return "yellow";
  } else {
    return "red";
  }
};

const returnStatusColor = (status: string): string => {
  return statusColors[status] || "#000000";
};
