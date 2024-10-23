"use client";
import MetricFrame from "@/components/card/frame";
import { PageLoader } from "@/components/custom-loader";
import { LottieAnimation, PercentageLabel, ReusableProgress, ReusableProgressLabel } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { LottieEmptyState } from "@/lottie";
import { useGetStaffMeasureOfSuccessQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { capitalizeFirstLetter, convertStringToNumber, getProgressColorByValue } from "@/utils/helpers";
import routesPath from "@/utils/routes";
import Link from "next/link";
import React from "react";

type MosData = {
  id: string;
  measure: string;
  target: string;
  unit: string;
  weight: string;
  achieved: string;
};

const { ADMIN, EMPLOYEE } = routesPath;
export default function MOSCard({ id }: { id: string }) {

  const { data, isLoading, isFetching } = useGetStaffMeasureOfSuccessQuery(
    {
      id: id,
      params: { fiscal_year: "", cycle: "" },
    },
    // {
    //   skip: !user?.id,
    // }
  );

  const mosData: MosData[] = data?.data?.measures?.measures_of_success ?? [];
  const achievedMos = data?.data?.measures?.achieved_total;
  const staff_member_id = data?.data?.measures?.staff_member_id;

  return (
    <>

      <MetricFrame className="flex flex-col gap-4 lg:col-span-5">
        <div className="flex justify-between ">
          <p className="text-[#252C32] font-medium">My Measures Of Success</p>
          <Link href={(mosData.length || isLoading || isFetching) ? ADMIN.MISSION_PLAN_REPORT_MEASURE_OF_SUCCESS(staff_member_id) : ""}>
            <Button disabled={isLoading || isFetching || !mosData.length} className="flex gap-3 items-center group">
              <p className="font-medium">See Details</p>
              <figure className="group-hover:translate-x-1 transition-all">
                {arrowRight}
              </figure>
            </Button>
          </Link>
        </div>
        {isLoading || isFetching ? (
          <div className={"min-h-[500px] grid place-content-center"}>
            <PageLoader />
          </div>
        ) : (
          <>
            {
              mosData && mosData.length > 0 ? (
                <>
                  <ReusableProgressLabel value={Number(achievedMos?.split("%")?.[0])} title="Completed" />

                  <div className="flex justify-between items-center mt-5">
                    <div className="flex gap-2 items-center">
                      <span className="bg-[#6B51DF] w-[30px] h-[6px] rounded-[1.06px]"></span>
                      <p className="text-[#6E7C87] font-normal text-xs">FY Target</p>
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
                    {mosData.map((chi, idx) => {
                      const { achieved, measure, target, unit, id } = chi;
                      return (
                        <div key={id || idx}>
                          <div className="flex flex-col gap-1">
                            <p className="text-[#5A5B5F] font-medium text-sm">
                              {capitalizeFirstLetter(measure)}
                            </p>
                            <ReusableProgress
                              color={getProgressColorByValue(
                                convertStringToNumber(achieved)
                              )}
                              valuePosition="float-right"
                              value={convertStringToNumber(achieved)}
                              height={16}
                              borderRadius={2}
                              hasBackground={false}
                              valueColor={getProgressColorByValue(
                                convertStringToNumber(achieved)
                              )}
                              progressClass="rounded-[2px]"
                            />
                            <ReusableProgress
                              value={0}
                              className="!bg-[#EBF7FF]"
                              borderRadius={2}
                            />
                            <p className="text-[#6B51DF] text-xs font-medium">{`${target}${unit}`}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="h-[40rem] flex justify-center items-center">
                  <div>
                    <LottieAnimation animationData={LottieEmptyState} height={"8rem"} />
                    <p className="text-sm text-[var(--text-color3)]">No Record found</p>
                  </div>
                </div>
              )
            }

          </>
        )}
        {/* ------- PROGRESS DETAILS --------- */}
      </MetricFrame>


    </>
  );
}

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
