// import { DashboardLayout } from "./_components/dashboard-layout";
"use client";

import routesPath from "@/utils/routes";
import Link from "next/link";
import DashboardLayout from "../../_layout/DashboardLayout";
import RightContentDisplay from "./_fragment/right-content-display";
import MetricFrame from "@/components/card/frame";
import {
  chevronRight,
  orgTaskDetails,
  progressRange,
  topAccessItems,
} from "./_fragment/items";
import { Button } from "@/components/ui/button";

const { ADMIN } = routesPath;

const topAccess = (
  <div className="flex w-full gap-4 overflow-auto justify-between items-center">
    {topAccessItems.map((chi, idx) => {
      const { label, icon, link } = chi;
      return (
        <Link
          href={link}
          className="flex items-center gap-5 border h-[78px] w-full rounded-[8px] border-[#EEF0F2] p-3"
          key={idx}
        >
          <figure>{icon}</figure>
          <p className="text-[#5A5B5F] font-medium">{label}</p>
        </Link>
      );
    })}
  </div>
);

const orgTaskCompletionDisplay = (
  <div>
    <div className="flex gap-2 items-center">
      <p className="text-[#3E4345] font-medium">Total : </p>
      <p className="text-[#6E7C87] font-light">{0} Specified Tasks</p>
    </div>

    <div className="flex flex-col mt-4 gap-4">
      {orgTaskDetails.map((chi, idx) => {
        const { label, color, value } = chi;
        return (
          <div key={idx} className="grid grid-cols-2 gap-x-4 items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-[25px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: color }}
              ></span>
              <p style={{ color: color }} className="text-medium text-sm">{label}</p>
            </div>
            <p className="text-[#6E7C87] font-light">: {value}</p>
          </div>
        );
      })}
    </div>
  </div>
);

const OverView = () => {
  return (
    <DashboardLayout headerTitle="Welcome ITH Holdings">
      <div className="p-6 overflow-auto h-screen scroll-hidden px-8 w-[calc(100%-391px)]">
        <p>Quick Access</p>

        <div className="flex flex-col gap-4">
          {/* top access frame */}
          <MetricFrame className="mt-3 rounded-[8px]">
            <>{topAccess}</>
          </MetricFrame>

          {/* Organization Measure Of Success FY */}
          <MetricFrame className="mt-3 relative min-h-[461px] overflow-auto">
            <div className="flex justify-between items-center">
              <p className="text-[#252C32] font-medium text-base">
                Organization Measure Of Success FY
              </p>
              <Link href="#" className="flex gap-2 items-center group">
                <p className="font-medium text-[13px] text-primary">
                  See Details
                </p>
                <figure className="group-hover:translate-x-1 transition-all ease-linear">
                  {chevronRight}
                </figure>
              </Link>
            </div>

            <div className="flex justify-between mt-8">
              <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <span className="bg-[#6B51DF] w-[30px] h-[6px] rounded-[1.06px]"></span>
                  <p className="text-[#6E7C87] font-normal text-xs">
                    FY Target
                  </p>
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
              <div className="flex gap-2 items-center">
                <span className="text-[#FFC043] font-bold text-2xl">{0}%</span>{" "}
                <span className="text-[#6E7C87] font-bold text-sm">
                  Completed
                </span>
              </div>
            </div>

            {/* Empty state for mos fy */}
            <div className="absolute inset-0 mt-8 flex justify-center items-center">
              <div className="text-center space-y-[15px]">
                <p className="text-[var(--text-color2)] font-light">
                  You have no data to display
                </p>
                <Button className="py-2 px-8">Kickstart financial year</Button>
              </div>
            </div>
          </MetricFrame>

          {/* Organization Task Completion, FY */}
          <MetricFrame className="min-h-[461px] relative flex flex-col overflow-auto">
            <div className="flex justify-between items-center">
              <p className="text-[#252C32] font-medium text-base">
                Organization Task Completion, FY
              </p>
              <Link href="#" className="flex gap-2 items-center group">
                <p className="font-medium text-[13px] text-primary">
                  See Details
                </p>
                <figure className="group-hover:translate-x-1 transition-all ease-linear">
                  {chevronRight}
                </figure>
              </Link>
            </div>
            <div className=" absolute inset-0 mt-8 flex px-20 pr-40 justify-between items-center">
              <div>
                <p className="text-[var(--text-color2)] font-light">
                  You've no data to display
                </p>
              </div>
              <div>{orgTaskCompletionDisplay}</div>
            </div>
          </MetricFrame>
        </div>
      </div>
      <RightContentDisplay />
    </DashboardLayout>
  );
};

export default OverView;
