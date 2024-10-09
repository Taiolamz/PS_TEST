import MetricFrame from "@/components/card/frame";
import { PageLoader } from "@/components/custom-loader";
import { ReusableProgress } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/public/assets/icons";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetStaffMeasureOfSuccessQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useAppSelector } from "@/redux/store";
import {
  capitalizeFirstLetter,
  convertStringToNumber,
  getProgressColorByValue,
} from "@/utils/helpers";
import routesPath from "@/utils/routes";
import Image from "next/image";
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

const MeasureOfSucessProgress = () => {
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

  // const measureOfSuccessProgressDetails = [
  //   {
  //     label: "Revenue",
  //     progress: 65,
  //     value: "$1,000,000,000,000",
  //     value_color: "#FFC043",
  //     color: "yellow",
  //   },
  //   {
  //     label: "Platinum Customer Acquisition",
  //     progress: 40,
  //     value: "15",
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  //   {
  //     label: "Completed Projects",
  //     progress: 73,
  //     value: "500",
  //     value_color: "#008080",
  //     color: "green",
  //   },
  //   {
  //     label: "Product Launch",
  //     progress: 73,
  //     value: "3",
  //     value_color: "#008080",
  //     color: "green",
  //   },
  //   {
  //     label: "MVP Adoption",
  //     progress: 35,
  //     value: "70%",
  //     value_color: "#EC1410",
  //     color: "red",
  //   },
  // ];

  // const id = "344ac"; //dummy ID;
  const { EMPLOYEE } = routesPath;

  const user = useAppSelector(selectUser);

  const { data, isLoading, isFetching } = useGetStaffMeasureOfSuccessQuery(
    user?.id,
    {
      skip: !user?.id,
    }
  );

  const mosData: MosData[] = data?.data?.measures?.measures_of_success ?? [];
  const achievedMos = data?.data?.measures?.achieved_total;

  const centeredClass =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center";

  return (
    <MetricFrame className="flex flex-col gap-4 relative min-h-[700px] ">
      <div className="flex justify-between ">
        <p className="text-[#252C32] font-medium">My Measures Of Success</p>
        <Link href={EMPLOYEE.MOS_REPORT(data?.data?.measures?.mission_plan_id)}>
          <Button className="flex gap-3 items-center group">
            <p className="font-medium">See Details</p>
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
          <div className="flex gap-2 items-center">
            <span
              style={{
                color: getProgressColorByValue(
                  convertStringToNumber(achievedMos)
                ),
              }}
              className="font-bold text-2xl"
            >
              {achievedMos as string}
            </span>{" "}
            <span className="text-[#6E7C87] font-bold text-sm">Achieved</span>
          </div>

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
            {/* {measureOfSuccessProgressDetails.map((chi, idx) => {
          const { label, progress, value, color, value_color } = chi;
          return (
            <div key={idx}>
              <div className="flex flex-col gap-1">
                <p className="text-[#5A5B5F] font-medium text-sm">{label}</p>
                <ReusableProgress
                  color={color as "red"}
                  valuePosition="float-right"
                  value={progress}
                  height={16}
                  borderRadius={2}
                  hasBackground={false}
                  valueColor={value_color}
                  progressClass="rounded-[2px]"
                />
                <ReusableProgress
                  value={0}
                  className="!bg-[#EBF7FF]"
                  borderRadius={2}
                />
                <p className="text-[#6B51DF] text-xs font-medium">{value}</p>
              </div>
            </div>
          );
        })} */}
            {mosData && mosData?.length > 0 ? (
              mosData?.map((chi, idx) => {
                const { achieved, measure, target, unit, weight, id } = chi;
                return (
                  <div key={idx || id}>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#5A5B5F] font-medium text-sm">
                        {capitalizeFirstLetter(measure)}
                      </p>
                      <ReusableProgress
                        color={getProgressColorByValue(
                          convertStringToNumber(achieved)
                        )}
                        // color={color as "red"}
                        valuePosition="float-right"
                        value={convertStringToNumber(achieved)}
                        height={16}
                        borderRadius={2}
                        hasBackground={false}
                        valueColor={getProgressColorByValue(
                          convertStringToNumber(achieved)
                        )}
                        // valueColor={value_color}
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
              })
            ) : (
              <div className={centeredClass}>
                <Image src={FileIcon} alt="file" />
                <p className="text-[var(--text-color2)] text-center font-light">
                  No Record Found.
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

export default MeasureOfSucessProgress;
