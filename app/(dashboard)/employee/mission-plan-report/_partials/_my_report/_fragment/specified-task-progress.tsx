import MetricFrame from "@/components/card/frame";
import { PageLoader } from "@/components/custom-loader";
import { ReusableProgress } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetStaffSpecifiedTaskQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useAppSelector } from "@/redux/store";
import {
  capitalizeFirstLetter,
  convertStringToNumber,
  getProgressColorByValue,
} from "@/utils/helpers";
import routesPath from "@/utils/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SpecifedTaskData = {
  id: string;
  task: string;
  completed: string;
};

const SpecifiedTaskProgress = () => {
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

  // const specifiedTaskProgressDetails = [
  //   {
  //     label: "Create a new Process flow for Zojatech",
  //     progress: 25,
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  //   {
  //     label:
  //       "Achieve revenue from selling Zojatech Software Product to the open Market",
  //     progress: 5,
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  //   {
  //     label: "Onboard 200 new clients on Mance",
  //     progress: 35,
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  //   {
  //     label: "Get 2 Technology Partners",
  //     progress: 40,
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  //   {
  //     label: "Onboard 200 new clients on Revvex",
  //     progress: 50,
  //     value_color: "#FFC043",
  //     color: "yellow",
  //   },
  //   {
  //     label: "Onboard 200 new clients on Revvex",
  //     progress: 50,
  //     value_color: "#FFC043",
  //     color: "yellow",
  //   },
  //   {
  //     label: "Achieve 70% OLA Adherence",
  //     progress: 10,
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  //   {
  //     label: "Achieve 70% OLA Adherence",
  //     progress: 5,
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  // ];

  // const id = "344ac"; //dummy ID;
  const { EMPLOYEE } = routesPath;

  const user = useAppSelector(selectUser);

  const { data, isLoading, isFetching, refetch } =
    useGetStaffSpecifiedTaskQuery(user?.id, {
      skip: !user?.id,
    });

  const specifiedTaskData: SpecifedTaskData[] =
    data?.data?.specified_tasks?.specified_tasks ?? [];
  const completedTask = data?.data?.specified_tasks?.completed_total;

  const centeredClass =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

  return (
    <MetricFrame className="flex flex-col gap-4 w-full relative">
      <div className="flex justify-between ">
        <div className="flex flex-col gap-1">
          <p className="text-[#252C32] font-medium">
            My Specified Task Progress
          </p>
          <p className="text-[#6E7C87] text-xs font-normal">
            FY 2023, Q1 Progress
          </p>
        </div>
        <Link
          href={EMPLOYEE.SPECIFIED_TASK_REPORT(
            data?.data?.specified_tasks?.mission_plan_id
          )}
        >
          <Button className="flex gap-3 items-center group">
            <p className="font-medium">See Progress Details</p>
            <figure className="group-hover:translate-x-1 transition-all ease-linear">
              {arrowRight}
            </figure>
          </Button>
        </Link>
      </div>

      {isLoading || isFetching ? (
        <div className={centeredClass}>
          <PageLoader />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mt-5 border-b pb-2">
            <div className="flex gap-2 items-center">
              <span
                style={{
                  color: getProgressColorByValue(
                    convertStringToNumber(completedTask)
                  ),
                }}
                className="text-[#EC1410] font-bold text-2xl"
              >
                {completedTask}
              </span>{" "}
              <span className="text-[#6E7C87] font-bold text-sm">
                Completed
              </span>
            </div>

            {/* -----PROGRESS RANGE(%) ------ */}
            <div className="flex gap-3 items-center border rounded-[4px]  border-[#E6E6E6] p-2 px-3">
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
            {/* {specifiedTaskProgressDetails.map((chi, idx) => {
              const { label, progress, value_color, color } = chi;
              return (
                <div key={idx}>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#5A5B5F] font-medium text-sm">
                      {label}
                    </p>
                    <ReusableProgress
                      valuePosition="float-left"
                      value={progress}
                      height={16}
                      borderRadius={2}
                      valueColor={"white"}
                      color={color as "red"}
                      className="!bg-[#EBF7FF]"
                      progressClass="rounded-[2px]"
                    />
                  </div>
                </div>
              );
            })} */}
            {specifiedTaskData && specifiedTaskData?.length > 0 ? (
              specifiedTaskData?.map((chi, idx) => {
                const { id, task, completed } = chi;
                return (
                  <div key={idx || id}>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#5A5B5F] font-medium text-sm">
                        {capitalizeFirstLetter(task)}
                      </p>
                      <ReusableProgress
                        valuePosition="float-left"
                        value={convertStringToNumber(completed)}
                        height={16}
                        borderRadius={2}
                        // valueColor={"red"}
                        color={getProgressColorByValue(
                          convertStringToNumber(completed)
                        )}
                        className="!bg-[#EBF7FF]"
                        progressClass="rounded-[2px]"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={centeredClass}>
                <p className="text-[var(--text-color2)] text-center font-light">
                  No Specified Task  <br /> progress details
                </p>
              </div>
            )}
          </div>
        </>
      )}
      {/* ------- PROGRESS DETAILS --------- */}
    </MetricFrame>
  );
};

export default SpecifiedTaskProgress;
