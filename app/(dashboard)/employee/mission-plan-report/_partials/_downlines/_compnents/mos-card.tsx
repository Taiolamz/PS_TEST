import MetricFrame from "@/components/card/frame";
import { ReusableProgress } from "@/components/fragment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
export default function MOSCard() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const createDownlineQueryString = React.useCallback(
    ({
      name,
      id,
      type,
      tab,
    }: {
      name: string;
      id: string;
      type: string;
      tab?: string;
    }) => {
      const params = new URLSearchParams();
      params.set("ui", name); // Set the 'name' param
      params.set("id", id); // Set the 'id' param
      type === "mos" && params.set("type", "approve-mos");
      type === "task" && params.set("type", "approve-task");
      type === "view" && params.set("type", "view-progress");
      type === "view" &&
        tab === "measure-success" &&
        params.set("tab", "measure-success");
      type === "view" &&
        tab === "specified-task" &&
        params.set("tab", "specified-task");

      return params.toString(); // Return the query string
    },
    []
  );

  const measureOfSuccessProgressDetails = [
    {
      label: "Revenue",
      progress: 65,
      value: "$1,000,000,000,000",
      value_color: "#FFC043",
      color: "yellow",
    },
    {
      label: "Platinum Customer Acquisition",
      progress: 40,
      value: "15",
      value_color: "#EC1410",
      color: "red",
    },
    {
      label: "Completed Projects",
      progress: 73,
      value: "500",
      value_color: "#008080",
      color: "green",
    },
    {
      label: "Product Launch",
      progress: 73,
      value: "3",
      value_color: "#008080",
      color: "green",
    },
    {
      label: "MVP Adoption",
      progress: 35,
      value: "70%",
      value_color: "#EC1410",
      color: "red",
    },
  ];

  return (
    <MetricFrame className="flex flex-col gap-4 lg:col-span-5">
      <div className="flex justify-between ">
        <p className="text-[#252C32] font-medium">My Measures Of Success</p>
        <Link
          href={
            id
              ? pathname.split("?")[0] +
                "?" +
                createDownlineQueryString({
                  type: "view",
                  id: id,
                  name: "downlines",
                  tab: "measure-success",
                })
              : ""
          }
        >
          <Button className="flex gap-3 items-center group">
            <p className="font-medium">See Details</p>
            <figure className="group-hover:translate-x-1 transition-all">
              {arrowRight}
            </figure>
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-[#FFC043] font-bold text-2xl">{52}%</span>{" "}
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
        {measureOfSuccessProgressDetails.map((chi, idx) => {
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
        })}
      </div>
      {/* ------- PROGRESS DETAILS --------- */}
    </MetricFrame>
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
