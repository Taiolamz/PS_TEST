import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function AllEmployeeMissionCard() {
  const labelClass =
    "font-light text-[5px] text-[13px] flex text-custom-gray-scale-400 placeholder:text-custom-gray-scale-400 translate-y-1";
  const inputClass =
    "placeholder:text-custom-gray-scale-300 border border-custom-light-border rounded min-w-[100px] bg-transparent text-custom-dark-blue font-light text-xs focus:border-0 placeholder:font-light outline-none border-custom-gray focus:border-[#008080] focus:outline-none";

  return (
    <div className="">
      <div className="flex justify-between">
        <p className="text-xl font-medium text-primary">Mission Plan 2023</p>
        <div className="flex gap-x-[14px] w-1/2">
          <Select>
            <SelectTrigger className={inputClass}>
              <SelectValue
                placeholder="Select Subsidiary"
                className={inputClass}
              />
            </SelectTrigger>
            <SelectContent className={labelClass}>
              <SelectItem value="Zojatech">Zojatech</SelectItem>
              <SelectItem value="IT Horizon">IT Horizon</SelectItem>
              <SelectItem value="ITH UK">ITH UK</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className={inputClass}>
              <SelectValue
                placeholder="Select Department"
                className={inputClass}
              />
            </SelectTrigger>
            <SelectContent className={labelClass}>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="P & C">P & C</SelectItem>
              <SelectItem value="Strategy">Strategy</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select Unit" className={inputClass} />
            </SelectTrigger>
            <SelectContent className={labelClass}>
              <SelectItem value="unit 1">unit 1</SelectItem>
              <SelectItem value="unit 2">unit 2</SelectItem>
              <SelectItem value="unit 3">unit 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-[5px] border border-custom-divider text-center min-h-24 mt-4 bg-custom-bg px-[23px] py-4 grid grid-cols-9">
        <div className="text-start pl-4 place-content-center space-y-1 col-span-2">
          <p className=" font-normal text-xs text-custom-dark-blue">
            Total Mission Plan
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">
            100 Plans
          </h4>
        </div>
        <div className=" place-content-center space-y-1 col-span-3 pl-3">
          <p className="text-start font-normal text-xs text-custom-dark-blue">
            Overall progress
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue flex items-center pr-3">
            42%{" "}
            <Progress
              value={42}
              className="h-[6px] bg-[var(--bg-progress-color)] ml-3 mr-7"
            />
          </h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-custom-dark-blue">
            Submitted
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">30</h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-[var(--text-success)]">
            Approved
          </p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">30</h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-warning">In Review</p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">20</h4>
        </div>
        <div className=" place-content-center space-y-1">
          <p className=" font-normal text-xs text-custom-red">Rejected</p>
          <h4 className=" font-medium text-2xl text-custom-dark-blue">10</h4>
        </div>
      </div>
    </div>
  );
}
