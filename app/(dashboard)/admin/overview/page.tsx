// import { DashboardLayout } from "./_components/dashboard-layout";
"use client";

import routesPath from "@/utils/routes";
import Link from "next/link";
import DashboardLayout from "../../_layout/DashboardLayout";
import RightContentDisplay from "./_fragment/right-content-display";
import MetricFrame from "@/components/card/frame";
import {
  activeIcon,
  chevronRight,
  executiveMosProgress,
  measureOfSuccessProgressDetails,
  orgTaskDetails,
  progressRange,
  recentActivity,
  topAccessItems,
} from "./_fragment/items";
import { Button } from "@/components/ui/button";
import { ReusableProgress } from "@/components/fragment";
import SpecifiedTaskChart from "../mission-plan/reports/_charts/specified-task";

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
      <p className="text-[#3E4345] font-medium">Total:</p>
      <p className="text-[#6E7C87] font-light">{40} Specified Tasks</p>
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
              <p style={{ color: color }} className="text-medium text-sm">
                {label}
                <span className="text-[#6E7C87] font-light">: {value}</span>
              </p>
            </div>
            {/* <p className="text-[#6E7C87] font-light">
              : <span className="ml-1">{value}</span>
            </p> */}
          </div>
        );
      })}
    </div>
  </div>
);

const mosEmptyState = (
  <div className="absolute inset-0 mt-8 flex justify-center items-center">
    <div className="text-center space-y-[15px]">
      <p className="text-[var(--text-color2)] font-light">
        You have no data to display
      </p>
      <Button className="py-2 px-8">Kickstart financial year</Button>
    </div>
  </div>
);

const orgTaskEmptyState = (
  <div className="pl-20">
    <p className="text-[var(--text-color2)] font-light">
      {"You've no data to display"}
    </p>
  </div>
);

const OverView = () => {
  return (
    <DashboardLayout headerTitle="Welcome ITH Holdings">
      <div className="p-6 scroll-hidden mt-10 px-8 w-[calc(100%-391px)]">
        <p>Quick Access</p>

        <div className="flex flex-col gap-4">
          {/* top access frame */}
          <MetricFrame className="mt-3 rounded-[8px]">
            <>{topAccess}</>
          </MetricFrame>

          {/* Organization Measure Of Success FY */}
          <MetricFrame className="mt-3 !px-6 relative min-h-[461px] overflow-auto">
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

            {/* ------- PROGRESS DETAILS --------- */}
            {measureOfSuccessProgressDetails?.length > 0 ? (
              <div className="flex flex-col gap-5 mt-5 overflow-x-hidden">
                {measureOfSuccessProgressDetails.map((chi, idx) => {
                  const { label, progress, value, color, value_color } = chi;
                  return (
                    <div key={idx}>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#5A5B5F] font-medium text-sm">
                          {label}
                        </p>
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
                        <p className="text-[#6B51DF] text-xs font-medium">
                          {value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              mosEmptyState
            )}
            {/* ------- PROGRESS DETAILS --------- */}
          </MetricFrame>

          {/* Organization Task Completion, FY */}
          <MetricFrame className="min-h-[461px] !px-6 relative flex flex-col overflow-auto">
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
            <div className=" absolute inset-0 mt-8 flex   justify-between items-center">
              {/* {orgTaskEmptyState} */}
              <SpecifiedTaskChart />
              <div>{orgTaskCompletionDisplay}</div>
            </div>
          </MetricFrame>

          <MetricFrame className="!px-6">
            <div className="flex justify-between items-center">
              <p className="text-[#252C32] font-medium text-base">
                Top Executive Measures of Success, FY
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
            {/* progress display */}
            <div className="flex flex-col gap-6 mt-5">
              {executiveMosProgress.map((chi, idx) => {
                const { value, link, color, name, role } = chi;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-end">
                      <div className="mb-2">
                        <p className="text-[#5A5B5F] font-light">{name}</p>
                        <p className="text-[#5A5B5F] font-light text-xs">
                          {role}
                        </p>
                        <Link
                          href={link}
                          className={`text-[#9AA6AC] text-primary border-b  border-b-primary text-xs font-medium`}
                        >
                          Click here to see Details
                        </Link>
                      </div>
                      <div className="grid grid-rows-1 gap-1">
                        <p className="text-[10px] text-[#6E7C87]">
                          Total Mission Plan Progress
                        </p>
                        <p className="text-[#EC1410] font-medium text-2xl text-right">
                          {value}%
                        </p>
                      </div>
                    </div>
                    <ReusableProgress
                      value={value}
                      height={6}
                      color={color as "red"}
                      borderRadius={4}
                      className="!bg-[#EBF7FF]"
                      progressClass="rounded-[2px]"
                    />
                  </div>
                );
              })}
            </div>
          </MetricFrame>

          {/* recent activities wrap */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-[#3E4345] font-medium">Recent Activity</p>
              <Link href="#" className="flex gap-2 items-center group">
                <p className="font-medium text-[13px] text-primary">See all</p>
                <figure className="group-hover:translate-x-1 transition-all ease-linear">
                  {chevronRight}
                </figure>
              </Link>
            </div>
            <MetricFrame className="!px-6">
              <div className="flex flex-col gap-7">
                {recentActivity.map((chi, idx) => {
                  const { label, content, date } = chi;
                  return (
                    <div
                      key={idx}
                      className="flex last:border-b-0 border-b justify-between items-center pb-4"
                      // style={{
                      //   borderBottom: "1px solid rgba(229, 233, 235, 1)",
                      // }}
                    >
                      <div className="flex gap-2">
                        <figure className="mt-2">{activeIcon}</figure>
                        <div className="flex flex-col gap-1">
                          <p className="text-[#252C32] font-medium">{label}</p>
                          <p className="text-xs font-light text-[#6E7C87]">
                            {content}
                          </p>
                        </div>
                      </div>
                      <p className="text-[#6E7C87] font-light text-sm">
                        {date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </MetricFrame>
          </div>
        </div>
      </div>
      <RightContentDisplay />
    </DashboardLayout>
  );
};

export default OverView;
