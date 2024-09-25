import MetricFrame from "@/components/card/frame";
import { ReusableProgress } from "@/components/fragment";
import React, { useState } from "react";

interface MeasureOfSuccess {
  label: string;
  bgColor: string;
  textColor: string;
}

interface ImpliedTaskDetails {
  period_cycle: string;
  expected_outcome: string;
  achieved_outcome: string;
  sub_outcomes: {
    date: string;
    achieved_outcome: string;
    expected_outcome: string;
  }[];
  percentage_completion: number;
}

const MetricTableCard = ({
  title,
  onClickViewChallenge,
  onClickComment,
  measureOfSuccessDetails,
  impliedTaskDetails,
  percentage,
  num,
  weight,
  progressValue,
  progressColor,
}: {
  title?: string;
  onClickViewChallenge?: () => void;
  onClickComment?: () => void;
  measureOfSuccessDetails: MeasureOfSuccess[];
  impliedTaskDetails?: ImpliedTaskDetails[];
  percentage?: number;
  num?: number;
  weight?: number;
  progressValue: number;
  progressColor?: "red" | "yellow" | "green";
}) => {
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

  const [dropDetail, setDropDetail] = useState(false);
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

  //   const impliedTask = [
  //     {
  //       title: "Implied Task",
  //       task: "Sell and Market Revvex as a user product",
  //       weight: 50,
  //     },
  //     {
  //       title: "Implied Task",
  //       task: "Sell and Market Revvex as a user product",
  //       weight: 50,
  //     },
  //     {
  //       title: "Implied Task",
  //       task: "Sell and Market Revvex as a user product",
  //       weight: 50,
  //     },
  //   ];

  //   const measureOfSuccessDetails = [
  //     {
  //       label: "30 online Campaign",
  //       bgColor: "#6B51DF1A",
  //       textColor: "#6B51DF",
  //     },
  //     {
  //       label: "$100,000 Revenue",
  //       bgColor: "#119C2B1A",
  //       textColor: "#119C2B",
  //     },
  //     {
  //       label: "$100,000 Revenue",
  //       bgColor: "#0452C81A",
  //       textColor: "#0452C8",
  //     },
  //   ];

  const impliedTaskHead = [
    "Period/Cycle",
    "Expected Outcome",
    "Achieved Outcome",
    "Sub Outcomes",
    "Percentage Completion",
  ];

  //   const impliedTaskDetails = [
  //     {
  //       period_cycle: "Q1",
  //       expected_outcome: "Sell and Market Revvex as a user product",
  //       achieved_outcome: "Sell and Market Revvex as a user product",
  //       sub_outcomes: [
  //         {
  //           date: "January",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "February",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "March",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //       ],
  //       percentage_completion: 30,
  //     },
  //     {
  //       period_cycle: "Q2",
  //       expected_outcome: "Sell and Market Revvex as a user product",
  //       achieved_outcome: "Sell and Market Revvex as a user product",
  //       sub_outcomes: [
  //         {
  //           date: "April",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "May",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "June",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //       ],
  //       percentage_completion: 30,
  //     },
  //     {
  //       period_cycle: "Q3",
  //       expected_outcome: "Sell and Market Revvex as a user product",
  //       achieved_outcome: "Sell and Market Revvex as a user product",
  //       sub_outcomes: [
  //         {
  //           date: "July",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "August",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "September",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //       ],
  //       percentage_completion: 30,
  //     },
  //     {
  //       period_cycle: "Q4",
  //       expected_outcome: "Sell and Market Revvex as a user product",
  //       achieved_outcome: "Sell and Market Revvex as a user product",
  //       sub_outcomes: [
  //         {
  //           date: "October",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "November",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //         {
  //           date: "December",
  //           achieved_outcome: "Sell and Market Revvex as a user product",
  //           expected_outcome: "Sell and Market Revvex as a user product",
  //         },
  //       ],
  //       percentage_completion: 30,
  //     },
  //   ];

  const topBtnBorderClass =
    "border border-[#6E7C87] p-2 px-3 rounded-sm text-[#6E7C87] cursor-pointer font-medium text-sm";
  const rowCenterClass = "flex gap-3 items-center";

  const [showViewDetail, setShowViewDetail] = useState<Record<number, boolean>>(
    {}
  );

  const toggleViewDetail = (index: number) => {
    setShowViewDetail((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <MetricFrame
        className={`mt-5 transition-all duration-300 px-7 customScrollbar ${
          dropDetail ? "h-[145px] overflow-hidden" : "h-[550px]"
        }`}
      >
        {/* ------ HEADER WRAP  START---------- */}
        <div className="flex justify-between items-center border-b border-[#E5E9EB] pb-2">
          <p className="text-[#1E1E1E] font-normal text-[17.52px]">{title}</p>
          <div className={`${rowCenterClass} !gap-5`}>
            <p className={topBtnBorderClass} onClick={onClickViewChallenge}>
              View Challenges
            </p>
            <div
              className={`${topBtnBorderClass} flex gap-2 items-center`}
              onClick={onClickComment}
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
        {/* ------ HEADER WRAP  END---------- */}

        {/* -------- MEASURE OF SUCCESS DETAILS WRAP START--------- */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex justify-between items-center border-b border-[#E5E9EB] pb-5 pt-4">
            <div className="flex gap-3 items-center">
              <p className="text-[#6E7C87] font-medium text-sm">
                Measure of success
              </p>
              <div className={rowCenterClass}>
                {measureOfSuccessDetails.map((chi, idx) => {
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
              <p className="text-[#3E4345] font-medium text-[19.47px]">
                Percent completed:{" "}
              </p>
              <p className="text-[#FFC043] font-medium text-[19.47px]">
                {percentage}%
              </p>
            </div>
          </div>

          {/* -------IMPLIED TASK DETAILS WRAP START --------- */}
          <div
            className={`mt-2 flex justify-between transition-all duration-300 items-center `}
          >
            <div>
              <p className="text-[#3E4345] font-semibold text-base">
                {`Implied Task ${num}: ${"Sell and Market Revvex as a user product"} - ${weight}%`}
              </p>
            </div>

            {/* -----PREV/NEXT WRAP START */}
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center cursor-not-allowed">
                <div className="bg-[#EEF0F2] rounded-[46.72px] w-[24px] h-[24px] py-[5.84px] px-[7.79px] grid place-items-center">
                  <figure>{leftAngle}</figure>
                </div>
                <p className="text-[#E5E9EB] font-medium text-sm">Prev</p>
              </div>

              <div className="flex gap-2 items-center cursor-pointer">
                <p className="text-primary font-medium text-sm">Next</p>
                <div className="bg-primary rounded-[46.72px] w-[24px] h-[24px] py-[5.84px] px-[7.79px] grid place-items-center">
                  <figure>{rightAngle}</figure>
                </div>
              </div>
            </div>
            {/* -----PREV/NEXT WRAP END */}
          </div>
          {/* -------IMPLIED TASK DETAILS WRAP END--------- */}

          {/* --------IMPLIED TASK TABLE WRAP START--------- */}
          <div className="w-full flex flex-col gap-2 mt-5 ">
            {/* -------TABLE HEADER-------- */}
            <table className="w-full table-auto border-collapse">
              <thead className="border-b">
                <tr className="grid grid-cols-5 justify-start pb-2">
                  {impliedTaskHead.map((chi, idx) => (
                    <th key={idx} className="p-2 text-left font-medium text-sm">
                      {chi}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ------TABLE BODY-------*/}

              <tbody>
                <div className="h-[275px] overflow-auto customScrollbar">
                  {impliedTaskDetails?.map((chi, idx) => {
                    const {
                      period_cycle,
                      expected_outcome,
                      achieved_outcome,
                      sub_outcomes,
                      percentage_completion,
                    } = chi;
                    const isDetailsVisible = showViewDetail[idx] || false;
                    return (
                      <div
                        key={idx}
                        className="last:border-b-0 border-b border-opacity-50"
                        style={{ borderColor: "rgba(0, 0, 0, 0.03)" }}
                      >
                        <>
                          <tr
                            // key={idx}
                            // className={`grid grid-cols-5 justify-start items-center transition-all duration-300 transform ${
                            //   isDetailsVisible ? "hidden" : ""
                            // }`}

                            className={`grid grid-cols-5 justify-start items-center transition-all duration-300 transform ${
                              isDetailsVisible
                                ? "translate-y-[100%] opacity-0"
                                : "translate-y-0 opacity-100 "
                            }`}
                          >
                            <td className="p-2 py-4 text-[#6E7C87] font-normal text-sm">
                              {period_cycle}
                            </td>
                            <td className="p-2 py-4 w-[200px] text-[#6E7C87] font-normal text-sm">
                              {expected_outcome}
                            </td>
                            <td className="p-2 py-4 w-[200px] text-[#6E7C87] font-normal text-sm">
                              {achieved_outcome}
                            </td>
                            <td
                              onClick={() => toggleViewDetail(idx)}
                              className="border flex justify-center py-[1px] hover:border-primary hover:text-primary transition-all duration-300  px-5 w-[56px] rounded-[4px] border-[#6E7C8733] text-[#6E7C87] text-[12px] cursor-pointer text-center"
                            >
                              View
                            </td>
                            <div className="p-2 pl-3">
                              <ReusableProgress
                                valuePosition="right"
                                value={percentage_completion}
                                height={6.86}
                                className="w-[44px]"
                                noFloatValueClass="12px"
                                valueColor={"#6E7C87"}
                                color="red"
                                progressClass="rounded-full"
                              />
                            </div>
                          </tr>
                        </>

                        <>
                          <div
                            className={`flex flex-col gap-8 overflow-auto  relative customScrollbar transition-all duration-300 ease-in-out ${
                              // isDetailsVisible ? "h-[220px] my-5" : "h-0"
                              isDetailsVisible ? "h-[220px] my-5 -mt-9" : "h-0"
                            }`}
                          >
                            {sub_outcomes?.map((chi, idx) => {
                              const {
                                date,
                                achieved_outcome,
                                expected_outcome,
                              } = chi;
                              return (
                                <tr key={idx} className="grid grid-cols-5">
                                  <td className="text-[#6E7C87] text-sm p-1">
                                    {date}
                                  </td>
                                  <td className="text-[#6E7C87] text-sm p-1 w-[400px]">
                                    {achieved_outcome}
                                  </td>
                                  <td className="text-[#6E7C87] text-sm p-1 w-[500px] pl-[10rem]">
                                    {expected_outcome}
                                  </td>
                                </tr>
                              );
                            })}
                            <figure
                              onClick={() => toggleViewDetail(idx)}
                              className="absolute right-0 cursor-pointer"
                            >
                              {cancelIcon}
                            </figure>
                            <div className="flex justify-end">
                              <div className="flex gap-4 items-center">
                                <p className="text-[#015858] font-semibold text-sm">
                                  {period_cycle}
                                </p>
                                <div className="flex gap-1 items-center">
                                  <p className="text-sm">
                                    Completion Average :
                                  </p>
                                  <p className="text-[#EC1410] text-base font-medium">
                                    {percentage_completion}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    );
                  })}
                </div>
              </tbody>
            </table>
          </div>

          {/* --------IMPLIED TASK TABLE WRAP END--------- */}
        </div>
        {/* -------- MEASURE OF SUCCESS DETAILS WRAP END--------- */}
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

export default MetricTableCard;
