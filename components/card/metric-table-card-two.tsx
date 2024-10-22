import MetricFrame from "@/components/card/frame";
import { ReusableProgress } from "@/components/fragment";
import { cn } from "@/lib/utils";
import { getPercentageColor } from "@/utils/helpers";
import React, { useEffect, useState } from "react";

interface MeasureOfSuccess {
  label: string;
  bgColor: string;
  textColor: string;
}

const MetricTableCardTwo = ({
  title,
  onClickViewChallenge,
  onClickComment,
  measureOfSuccessDetails,
  percentage,
  progressValue,
  progressColor,
  tasks,
  id,
}: {
  title?: string;
  onClickViewChallenge?: (id?: string) => void;
  onClickComment?: (id?: string) => void;
  measureOfSuccessDetails: MeasureOfSuccess[];
  percentage?: number;
  progressValue: number;
  progressColor?: "red" | "yellow" | "green";
  id?: string;
  tasks?: any[];
}) => {
  const [dropDetail, setDropDetail] = useState(true);
  const angleUp = (
    <svg
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.42811 0.971513L12.2678 6.81123L10.9052 8.17383L6.42811 3.69671L1.95099 8.17383L0.588392 6.81123L6.42811 0.971513Z"
        className={`${
          dropDetail ? "fill-[#9AA6AC]" : ""
        } transition-all duration-300`}
        fill="#008080"
      />
    </svg>
  );

  const impliedTaskHead = [
    "Period/Cycle",
    "Expected Outcome",
    "Achieved Outcome",
    "Percentage Completion",
  ];

  const topBtnBorderClass =
    "border border-[#6E7C87] p-1 px-3 rounded-sm text-[#6E7C87] cursor-pointer font-medium text-sm";
  const rowCenterClass = "flex gap-3 items-center";

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [isFirstTask, setIsFirstTask] = useState(true);
  const [isLastTask, setIsLastTask] = useState(false);

  useEffect(() => {
    setIsFirstTask(activeTaskIndex === 0);
    setIsLastTask(activeTaskIndex === (tasks as any[]).length - 1);
  }, [activeTaskIndex, tasks]);

  const handleNext = () => {
    if (activeTaskIndex < (tasks as any[]).length - 1) {
      setActiveTaskIndex(activeTaskIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeTaskIndex > 0) {
      setActiveTaskIndex(activeTaskIndex - 1);
    }
  };

  return (
    <div>
      <MetricFrame
        className={`mt-5 border border-b-0 transition-all duration-300 relative px-7 customScrollbar ${
          dropDetail ? "h-[145px] overflow-hidden" : "h-[550px]"
        }`}
      >
        <div className="flex justify-between items-center border-b border-[#E5E9EB] pb-2">
          <p className="text-[#1E1E1E] font-normal text-[17.52px]">{title}</p>
          <div className={`${rowCenterClass} !gap-5`}>
            <p
              className={topBtnBorderClass}
              onClick={() => onClickViewChallenge && onClickViewChallenge(id)}
            >
              View Challenges
            </p>
            <div
              className={`${topBtnBorderClass} flex gap-2 items-center`}
              onClick={() => onClickComment && onClickComment(id)}
            >
              <p>Comments</p>
              <p>{commentIcon}</p>
            </div>
            <div
              onClick={() => {
                setDropDetail(!dropDetail);
              }}
              className={`${
                dropDetail ? "bg-transparent border " : "bg-[#EBF8F5]"
              } group cursor-pointer grid place-items-center rounded-[15.57px] h-[31.15px] w-[31.15px] py-[7.79px] px-[5.84px]`}
            >
              <figure
                className={`${
                  dropDetail ? "rotate-90" : ""
                } transition-all duration-300`}
              >
                {angleUp}
              </figure>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between items-center border-b border-[#E5E9EB] pb-5 pt-4">
            <div className="flex gap-3 items-center">
              <p className="text-[#6E7C87] font-medium text-sm">
                Measure of success
              </p>
              <div className={rowCenterClass}>
                {measureOfSuccessDetails?.map((chi, idx) => {
                  const { label, bgColor, textColor } = chi;
                  return (
                    <div
                      className="rounded-[15.57px] p-[7.79px]"
                      key={idx}
                      style={{ backgroundColor: bgColor, color: textColor }}
                    >
                      <p className="text-[11.68px] font-bold">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-[#3E4345] font-medium text-[16px]">
                Percent completed:{" "}
              </p>
              <p
                className={cn("font-medium text-[16px]")}
                style={{ color: getPercentageColor(percentage || 0) }}
              >
                {percentage}%
              </p>
            </div>
          </div>

          <div
            className={`relative w-full transition-opacity duration-500 ${
              dropDetail ? "opacity-0 h-0" : "opacity-100 h-auto"
            }`}
          >
            {/* -----PREV/NEXT BUTTON WRAP START */}
            <div className="flex gap-6 items-center absolute right-0 mt-4 mr-6">
              <div
                className={`flex gap-2 items-center ${
                  isFirstTask ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handlePrev}
              >
                <div
                  className={`${
                    isFirstTask ? "bg-[#EEF0F2]" : "bg-primary"
                  } rounded-[46.72px] transition-all duration-300 w-[24px] h-[24px] py-[5.84px] px-[7.79px] grid place-items-center`}
                >
                  <figure>{leftAngle}</figure>
                </div>
                <p
                  className={`${
                    isFirstTask ? "text-[#E5E9EB]" : "text-primary"
                  } font-medium text-sm`}
                >
                  Prev
                </p>
              </div>

              <div
                className={`flex gap-2 items-center ${
                  isLastTask ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleNext}
              >
                <p
                  className={`${
                    isLastTask ? "text-[#E5E9EB]" : "text-primary"
                  } font-medium text-sm`}
                >
                  Next
                </p>
                <div
                  className={`${
                    isLastTask ? "bg-[#EEF0F2]" : "bg-primary"
                  } rounded-[46.72px] w-[24px] h-[24px] transition-all duration-300 py-[5.84px] px-[7.79px] grid place-items-center`}
                >
                  <figure>{rightAngle}</figure>
                </div>
              </div>
            </div>
            {/* -----PREV/NEXT BUTTON WRAP END */}

            {tasks?.map((vals, taskIdx) => {
              const { task, task_outcome, percentage: percent } = vals;
              return (
                <div key={taskIdx}>
                  {taskIdx === activeTaskIndex && (
                    <>
                      <div
                        className={`mt-2 flex justify-between transition-all duration-300 items-center `}
                      >
                        <div>
                          <p
                            className={"text-[#3E4345] font-semibold text-base"}
                          >
                            {`Implied Task ${taskIdx + 1}: ${task} - ${
                              percent || 0
                            }%`}
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-2 mt-8 ">
                        {/* -------TABLE HEADER-------- */}
                        <table className="w-full table-auto border-collapse">
                          <thead className="border-b">
                            <tr className="grid grid-cols-4 gap-1 justify-start pb-2">
                              {impliedTaskHead.map((chi, idx) => (
                                <th
                                  key={idx}
                                  className="p-2 text-left font-medium text-sm"
                                >
                                  {chi}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          {/* ------TABLE BODY-------*/}
                          <tbody>
                            <div className="h-[275px] overflow-auto customScrollbar">
                              {(task_outcome as any[])?.map((chi, idx) => {
                                const {
                                  month,
                                  expected_outcome,
                                  actual_outcome,
                                  completion_percent,
                                } = chi;
                                return (
                                  <div
                                    key={idx}
                                    className="last:border-b-0 border-b border-opacity-50"
                                    style={{
                                      borderColor: "rgba(0, 0, 0, 0.03)",
                                    }}
                                  >
                                    <tr className="grid grid-cols-4 gap-1 justify-start items-center transition-all duration-300 transform ">
                                      <td className="p-2 py-4 text-[#6E7C87] font-normal text-sm">
                                        {month}
                                      </td>
                                      <td className="p-2 py-4  text-[#6E7C87] font-normal text-sm">
                                        {expected_outcome || "---- ----"}
                                      </td>
                                      <td className="p-2 py-4  text-[#6E7C87] font-normal text-sm">
                                        {actual_outcome || "---- ----"}
                                      </td>
                                      <div className="p-2 pl-3">
                                        <ReusableProgress
                                          valuePosition="right"
                                          value={completion_percent || 0}
                                          height={6.86}
                                          className="w-[44px]"
                                          noFloatValueClass="12px"
                                          valueColor={"#6E7C87"}
                                          color={valueColor(
                                            completion_percent || 0
                                          )}
                                          progressClass="rounded-full"
                                        />
                                      </div>
                                    </tr>
                                  </div>
                                );
                              })}
                            </div>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </MetricFrame>
      <ReusableProgress
        valuePosition="float-left"
        value={progressValue}
        height={32}
        className="w-full !bg-[#EBF7FF] rounded-[3.09px]"
        floatValueClass="19.47px"
        valueColor={"#6E7C87"}
        color={progressColor}
        progressClass="rounded-[3.09px]"
      />
    </div>
  );
};

export default MetricTableCardTwo;

const valueColor = (number: number): "red" | "yellow" | "green" => {
  if (number >= 70) {
    return "green";
  } else if (number >= 40 && number <= 69) {
    return "yellow";
  } else {
    return "red";
  }
};

const leftAngle = (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.23864 11.9841L0.398926 6.1444L6.23864 0.304688L7.60124 1.66729L3.12413 6.1444L7.60124 10.6215L6.23864 11.9841Z"
      fill="white"
    />
  </svg>
);

const rightAngle = (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.87604 6.1444L0.398926 1.66729L1.76153 0.304688L7.60124 6.1444L1.76153 11.9841L0.398926 10.6215L4.87604 6.1444Z"
      fill="white"
    />
  </svg>
);

const cancelIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="12" fill="#F4F4F4" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.9429 12.0002L15.8049 9.13818C16.0656 8.87751 16.0656 8.45617 15.8049 8.1955C15.5442 7.93483 15.1229 7.93483 14.8622 8.1955L12.0002 11.0575L9.13818 8.1955C8.87751 7.93483 8.45617 7.93483 8.1955 8.1955C7.93483 8.45617 7.93483 8.87751 8.1955 9.13818L11.0575 12.0002L8.1955 14.8622C7.93483 15.1229 7.93483 15.5442 8.1955 15.8049C8.3255 15.9349 8.49617 16.0002 8.66684 16.0002C8.83751 16.0002 9.00818 15.9349 9.13818 15.8049L12.0002 12.9429L14.8622 15.8049C14.9922 15.9349 15.1629 16.0002 15.3336 16.0002C15.5042 16.0002 15.6749 15.9349 15.8049 15.8049C16.0656 15.5442 16.0656 15.1229 15.8049 14.8622L12.9429 12.0002Z"
      fill="#EC1410"
    />
  </svg>
);

const commentIcon = (
  <svg
    width="19"
    height="17"
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.62056 12.9555L6.67756 13.3117C6.80053 14.0801 6.80757 15.0111 6.49432 15.9982C6.49555 15.9994 6.49709 16.0008 6.499 16.0023C6.50813 16.0095 6.51992 16.0145 6.53159 16.0161L6.62056 12.9555ZM6.62056 12.9555L6.26322 12.9065C3.26688 12.4951 1.00569 10.0742 1.00569 7.19285C1.00569 4.02979 3.73471 1.41731 7.16258 1.41731H11.3948C14.8226 1.41731 17.5515 4.02978 17.5515 7.19285C17.5515 10.3561 14.8226 12.9689 11.3948 12.9689H10.2846H9.99869L9.8595 13.2186C9.09842 14.5839 7.64778 15.4954 6.5702 16.0088L6.62056 12.9555Z"
      stroke="#6E7C87"
      stroke-width="0.973286"
    />
  </svg>
);
