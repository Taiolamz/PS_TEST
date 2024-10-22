import MetricFrame from "@/components/card/frame";
import { PageLoader } from "@/components/custom-loader";
import { LottieAnimation, ReusableProgress } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { LottieEmptyState } from "@/lottie";
import { FileIcon } from "@/public/assets/icons";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetStaffSpecifiedTaskQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useAppSelector } from "@/redux/store";
import {
  capitalizeFirstLetter,
  convertStringToNumber,
  getProgressColorByValue,
  toWholeNumber,
} from "@/utils/helpers";
import routesPath from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SpecifedTaskData = {
  id: string;
  task: string;
  completed: string;
};

const SpecifiedTaskProgress = ({ id }: { id?: string }) => {
  const arrowRight = (
    <svg
      width="18"
      height="9"
      viewBox="0 0 18 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8347 8.8457L12.805 7.83096L15.0681 5.56794H0.500977V4.12346H15.0681L12.8197 1.86045L13.8494 0.845703L17.8347 4.8457L13.8347 8.8457Z"
        fill="white"
      />
    </svg>
  );

  const progressRange = [
    {
      color: "#EC1410",
      value: "0% - 35%",
    },
    {
      color: "#FFC043",
      value: "40% - 65%",
    },
    {
      color: "#07A287",
      value: "70% - 100%",
    },
  ];

  const { EMPLOYEE } = routesPath;

  const user = useAppSelector(selectUser);
  // Filter
  const { fiscal_year, mission_cycle } = useAppSelector(
    (state) => state.employee_mission_plan_filter
  );

  const userId = id ? id : user?.id;

  const { data, isLoading, isFetching } = useGetStaffSpecifiedTaskQuery(
    {
      id: userId,
      params: { fiscal_year: fiscal_year, cycle: mission_cycle },
    },
    {
      skip: !user?.id,
    }
  );

  const specifiedTaskData: SpecifedTaskData[] =
    data?.data?.specified_tasks?.specified_tasks ?? [];
  const completedTask = data?.data?.specified_tasks?.completed_total;

  const centeredClass =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center";

  const isButtonDisabled = isLoading || isFetching;

  return (
    <MetricFrame className="flex flex-col gap-4 w-full relative min-h-[700px]">
      <div className="flex justify-between ">
        <div className="flex flex-col gap-1">
          <p className="text-[#252C32] font-medium">
            My Specified Task Progress
          </p>
          {specifiedTaskData && specifiedTaskData.length > 0 ? (
            <p className="text-[#6E7C87] text-xs font-normal">
              FY 2023, Q1 Progress
            </p>
          ) : null}
        </div>
        {specifiedTaskData && specifiedTaskData.length > 0 ? (
          <Link
            href={
              data?.data?.specified_tasks?.staff_member_id
                ? EMPLOYEE.SPECIFIED_TASK_REPORT(
                    data?.data?.specified_tasks?.staff_member_id || ""
                  )
                : "#"
            }
            className={isButtonDisabled ? "cursor-not-allowed" : ""}
            passHref
          >
            <Button
              disabled={isButtonDisabled}
              className="flex gap-3 items-center group"
            >
              <p className="font-medium">See Progress Details</p>
              <figure className="group-hover:translate-x-1 transition-all ease-linear">
                {arrowRight}
              </figure>
            </Button>
          </Link>
        ) : null}
      </div>

      {isLoading || isFetching ? (
        <div className={centeredClass}>
          <PageLoader />
        </div>
      ) : (
        <>
          {specifiedTaskData && specifiedTaskData.length > 0 ? (
            <>
              <div className="flex justify-between items-center mt-5 border-b pb-2">
                <div className="flex gap-2 items-center">
                  <span
                    style={{
                      color: getProgressColorByValue(
                        convertStringToNumber(completedTask || "0%")
                      ),
                    }}
                    className="text-[#EC1410] font-bold text-2xl"
                  >
                    {toWholeNumber(completedTask) || 0}%
                  </span>
                  <span className="text-[#6E7C87] font-bold text-sm">
                    Completed
                  </span>
                </div>

                {/* -----PROGRESS RANGE(%) ------ */}
                <div className="flex gap-3 items-center border rounded-[4px] border-[#E6E6E6] p-2 px-3">
                  {progressRange.map((chi, idx) => {
                    const { color, value } = chi;
                    return (
                      <div key={idx} className="flex gap-2 items-center">
                        <span
                          style={{ backgroundColor: color }}
                          className="w-[30px] h-[6px] rounded-[1.06px]"
                        ></span>
                        <p className="text-[#9AA6AC] text-[10px] font-normal">
                          {value}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* -----PROGRESS RANGE(%) ------ */}
              </div>

              {/* ------- PROGRESS DETAILS --------- */}
              <div className="flex flex-col gap-5 mt-5">
                {specifiedTaskData.map((chi, idx) => {
                  const { id, task, completed } = chi;
                  return (
                    <div key={id || idx}>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#5A5B5F] font-medium text-sm">
                          {capitalizeFirstLetter(task)}
                        </p>
                        <ReusableProgress
                          valuePosition="float-left"
                          value={convertStringToNumber(completed)}
                          height={16}
                          borderRadius={2}
                          color={getProgressColorByValue(
                            convertStringToNumber(completed)
                          )}
                          className="!bg-[#EBF7FF]"
                          progressClass="rounded-[2px]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={centeredClass}>
              <LottieAnimation
                animationData={LottieEmptyState}
                height={"8rem"}
              />
              <p className="text-sm text-[var(--text-color2)]">
                No Specified Task
              </p>
            </div>
          )}
        </>
      )}

      {/* ------- PROGRESS DETAILS --------- */}
    </MetricFrame>
  );
};

export default SpecifiedTaskProgress;
