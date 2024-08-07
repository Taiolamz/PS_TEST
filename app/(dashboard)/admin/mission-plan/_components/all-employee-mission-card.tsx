import { Progress } from "@/components/ui/progress";
import React from "react";

type missionSummaryType = {
  mission_plans_count: number;
  submitted: number;
  approved: number;
  in_review: number;
  rejected: number;
  overall_progress: number;
};

export default function AllEmployeeMissionCard({
  mission_plans_count,
  submitted,
  approved,
  in_review,
  rejected,
  overall_progress,
}: missionSummaryType) {
  const labelClass =
    "font-light text-[5px] text-[13px] flex text-custom-gray-scale-400 placeholder:text-custom-gray-scale-400 translate-y-1";
  const inputClass =
    "placeholder:text-custom-gray-scale-300 border border-custom-light-border rounded min-w-[100px] bg-transparent text-custom-dark-blue font-light text-xs focus:border-0 placeholder:font-light outline-none border-custom-gray focus:border-[#008080] focus:outline-none";

  return (
    <div className="">
      {/* <div className="flex justify-between">
        <p className="text-xl font-medium text-primary">Mission Plan 2023</p>
        <div className="grid grid-cols-3 gap-x-[14px] w-1/2">
          <CustomSelect
            options={SUBSIDIARY_DATA}
            selected=""
            setSelected={() => null}
            className="bg-white"
            placeholder="Select subsidiary"
          />
          <CustomSelect
            options={PRODUCT_DATA}
            selected=""
            setSelected={() => null}
            className="bg-white"
          />
          <CustomSelect
            options={UNIT_DATA}
            selected=""
            setSelected={() => null}
            className="bg-white"
          />
        </div>
      </div> */}
      <div className="rounded-[5px] border border-custom-divider text-center min-h-24 mt-4 bg-white px-[23px] py-4 grid grid-cols-9">
        <div className="text-start pl-4 place-content-center space-y-1 col-span-2">
          <p className=" font-normal text-xs text-custom-dark-blue">
            Total Mission Plan
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">
            {mission_plans_count} Plans
          </h4>
        </div>
        <div className=" place-content-center space-y-1 col-span-3 pl-3">
          <p className="text-start font-normal text-xs text-custom-dark-blue">
            Overall progress
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue flex items-center pr-3">
            {overall_progress}%{" "}
            <Progress
              value={overall_progress}
              className="h-[6px] bg-[var(--primary-accent-color)] ml-3 mr-7"
            />
          </h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-custom-dark-blue">
            Submitted
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">
            {submitted}
          </h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-[#119C2B]">Approved</p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">
            {approved}
          </h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-warning">In Review</p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">
            {in_review}
          </h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-custom-red">Rejected</p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">
            {rejected}
          </h4>
        </div>
      </div>
    </div>
  );
}
