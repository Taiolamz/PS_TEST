import React, { useState } from "react";
import MetricFrame from "./frame";
import { ReusableProgress } from "../fragment";

const MeasureOfSucessMetricTableCard = ({
  title,
  onClickViewChallenge,
  onClickComment,
  id,
  fy_target,
  unit,
  weight,
  fy_achieved,
  amount,
  percentage,
  table_details,
  num,
}: {
  title?: string;
  onClickViewChallenge?: (id?: string) => void;
  onClickComment?: (id?: string) => void;
  id?: string;
  fy_target?: string | number;
  unit?: string | number;
  weight?: string | number;
  fy_achieved?: string | number;
  amount?: string | number;
  percentage?: number;
  table_details?: any[];
  num?: number;
}) => {
  const [dropDetail, setDropDetail] = useState(false);

  const mosTableHead = [
    "Review Period",
    "Target",
    "Achieved Target",
    "Achieved Percentage",
  ];

  const topBtnBorderClass =
    "border border-[#6E7C87] p-1 px-3 rounded-sm text-[#6E7C87] cursor-pointer font-medium text-sm";
  const rowCenterClass = "flex gap-3 items-center";

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
  return (
    <MetricFrame
      className={`mt-5 border border-b-0 transition-all duration-300 relative px-7 customScrollbar ${
        dropDetail ? "h-[128px] overflow-hidden" : "h-[377px]"
      }`}
    >
      <div className="flex justify-between items-center border-b border-[#E5E9EB] pb-2">
        <p className="text-primary font-normal text-[17.52px]">
          {num || 1}. {title || "Revenue"}
        </p>
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
              dropDetail ? "bg-transparent border" : "bg-[#EBF8F5]"
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

      <div className="flex justify-between mt-4 items-center">
        <div className="flex items-center gap-3">
          <div className="flex gap-3 items-center">
            <p className="text-[#162238] font-medium text-sm">FY Target</p>
            <p className="text-primary font-medium">
              {fy_target || "150,000,000"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#162238] font-medium text-sm">Unit</p>
            <p className="text-primary font-medium">{unit || "$"}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-[#162238] font-medium text-sm">Weight</p>
            <p className="text-primary font-medium">{weight || 20}%</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <p className="text-[#3E4345]">FY Achieved :</p>
          <p className="text-primary font-semibold">
            {percentage || 67}%
            <span>{`(${amount || "100,234,000"}${unit || "$"})`}</span>
          </p>
        </div>
      </div>

      {/* table display */}
      <div
        className={`w-full transition-opacity duration-500 ${
          dropDetail ? "opacity-0 h-0" : "opacity-100 h-auto"
        }`}
      >
        <table className="w-full table-auto mt-5 border-collapse">
          <thead className="grid grid-cols-4 mb-5">
            {mosTableHead.map((chi, idx) => (
              <tr
                className="mt-5 text-left text-[#162238] font-medium text-sm"
                key={idx}
              >
                {chi}
              </tr>
            ))}
          </thead>

          <tbody className="flex flex-col gap-5 customScrollbar">
            {table_details?.map((chi, idx) => {
              const { review_period, target, achieved_target, percentage } =
                chi;
              return (
                <tr className="grid grid-cols-4" key={idx}>
                  <td className="text-[#6E7C87] text-sm p-1">
                    {review_period}
                  </td>
                  <td className="text-[#6E7C87] text-sm p-1">{target}</td>
                  <td className="text-[#6E7C87] text-sm p-1">
                    {achieved_target}
                  </td>
                  <td>
                    {" "}
                    <ReusableProgress
                      valuePosition="left"
                      value={percentage}
                      height={6}
                      className="w-[70px]"
                      noFloatValueClass="12px"
                      valueColor={"#6E7C87"}
                      color="red"
                      progressClass="rounded-full"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MetricFrame>
  );
};

export default MeasureOfSucessMetricTableCard;
