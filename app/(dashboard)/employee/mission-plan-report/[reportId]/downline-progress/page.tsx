"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import CustomSelect from "@/components/custom-select";
import React from "react";
import SpecifiedTaskCard from "./_partials/specified-task-card";
import MOSCard from "./_partials/mos-card";
import { useRouter } from "next/navigation";

export default function ViewDownlineProgress({
  params,
}: {
  params: { reportId: string };
}) {
  const router = useRouter();
  const [fiscalYear, setFiscalYear] = React.useState("");
  const [missionCycle, setMissionCycle] = React.useState("");
  return (
    <DashboardLayout headerTitle="Welcome Hassan!">
      <div className="flex gap-3.5 bg-[#F6F8F9] items-center py-2 pl-8">
        <div
          className="flex gap-2 items-center cursor-pointer group"
          onClick={() => router.back()}
        >
          <figure className="group-hover:-translate-x-1 transition-all duration-300">
            {backIcon}
          </figure>
          <p className="text-xs text-[#6E7C87]">Back</p>
        </div>
        <p className="text-[#3E4345] font-semibold text-lsm">My Downlines</p>
      </div>
      <div className="m-5">
        {/* ----- FILTER/SELECT WRAP START------- */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center cursor-pointer">
              <p className="text-[#1E1E1E] font-medium text-[14px]">Filters</p>
              <figure>{filterIcon}</figure>
            </div>

            <div className="flex items-center">
              <CustomSelect
                placeholder="FY"
                options={[]}
                selected={fiscalYear}
                setSelected={(e: any) => {
                  setFiscalYear(e);
                }}
                className="w-[150px] text-xs rounded-none rounded-l-[15px]"
              />
              <CustomSelect
                placeholder="Cycle"
                options={[]}
                selected={missionCycle}
                setSelected={(e: any) => {
                  setMissionCycle(e);
                }}
                className="w-[150px] text-xs rounded-none rounded-r-[15px]"
              />
            </div>

            <div className="flex gap-2 items-center cursor-pointer ml-2">
              <p className="text-[#EC1410BF] font-medium text-[14px]">Reset</p>
              <figure>{undoIcon}</figure>
            </div>
          </div>

          {/* -----EXPORT---- */}
          <div className="flex gap-3 items-center border border-[#E5E9EB] p-3 rounded-[6px] bg-[#FFFFFF] cursor-pointer">
            <figure>{exportIcon}</figure>
            <p className="text-medium text-xs text-[#6E7C87]">Export</p>
          </div>
        </div>
        {/* ----- FILTER/SELECT WRAP END------- */}

        {/* ----- USER INFO------- */}
        <div className="mt-9 inline-flex items-center gap-x-4">
          <div className="size-[160px] rounded-full bg-[var(--primary-color)] text-white place-content-center grid text-6xl">
            {"CU"}
          </div>
          <div className="space-y-0.5">
            <p className="">Charles Uwaje</p>
            <p className="text-[var(--text-color2)] text-sm">
              cuwaje@zojatech.com
            </p>
          </div>
        </div>

        {/* ----- SPECIFIED TASK/MEASURE OF SUCCESS------- */}
        <div className="grid lg:grid-cols-12 mt-10 gap-5">
          <MOSCard id={params.reportId} />
          <SpecifiedTaskCard id={params.reportId} />
        </div>
      </div>
    </DashboardLayout>
  );
}

const backIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.52993 7.71985C4.67038 7.86047 4.74927 8.0511 4.74927 8.24985C4.74927 8.4486 4.67038 8.63922 4.52993 8.77985C4.3893 8.9203 4.19868 8.99919 3.99993 8.99919C3.80118 8.99919 3.61055 8.9203 3.46993 8.77985L0.219927 5.52985C0.0794764 5.38922 0.000587463 5.1986 0.000587463 4.99985C0.000587463 4.8011 0.0794764 4.61047 0.219927 4.46985L3.46993 1.21985C3.6121 1.08737 3.80015 1.01524 3.99445 1.01867C4.18875 1.0221 4.37414 1.10081 4.51155 1.23822C4.64896 1.37564 4.72767 1.56102 4.7311 1.75532C4.73453 1.94963 4.66241 2.13767 4.52993 2.27985L1.80993 4.99985L4.52993 7.71985ZM4.46993 5.52985L8.71993 9.77985C8.86055 9.9203 9.05118 9.99919 9.24993 9.99919C9.44868 9.99919 9.6393 9.9203 9.77993 9.77985C9.92038 9.63922 9.99927 9.4486 9.99927 9.24985C9.99927 9.0511 9.92038 8.86047 9.77993 8.71985L6.05993 4.99985L9.77993 1.27985C9.91241 1.13767 9.98453 0.949625 9.9811 0.755324C9.97767 0.561023 9.89896 0.375638 9.76155 0.238225C9.62414 0.100812 9.43875 0.0220998 9.24445 0.0186715C9.05015 0.0152433 8.8621 0.0873663 8.71993 0.219846L4.46993 4.46985C4.32948 4.61047 4.25059 4.8011 4.25059 4.99985C4.25059 5.1986 4.32948 5.38922 4.46993 5.52985Z"
      fill="#6E7C87"
    />
  </svg>
);

const filterIcon = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25097 14.9887C6.12606 14.9887 6.00116 14.9263 5.9387 14.9263C5.75134 14.8014 5.62644 14.5516 5.62644 14.3642V8.93079L0.130568 0.999249C0.00566191 0.81189 -0.0567912 0.562078 0.068115 0.312265C0.193021 0.124906 0.38038 0 0.630193 0H14.3699C14.6197 0 14.807 0.124906 14.9319 0.312265C15.0569 0.499625 14.9944 0.749437 14.8695 0.936796L9.37362 8.93079V13.1151C9.37362 13.365 9.24872 13.5523 8.9989 13.6772L6.50078 14.9263C6.43833 14.9887 6.37588 14.9887 6.25097 14.9887ZM1.8168 1.24906L6.75059 8.36871C6.81305 8.49362 6.8755 8.61852 6.8755 8.74343V13.365L8.12456 12.7404V8.74343C8.12456 8.61852 8.18701 8.49362 8.24947 8.36871L13.1833 1.24906H1.8168Z"
      fill="#1E1E1E"
    />
  </svg>
);

const undoIcon = (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 15V13H10.1C11.15 13 12.0625 12.6667 12.8375 12C13.6125 11.3333 14 10.5 14 9.5C14 8.5 13.6125 7.66667 12.8375 7C12.0625 6.33333 11.15 6 10.1 6H3.8L6.4 8.6L5 10L0 5L5 0L6.4 1.4L3.8 4H10.1C11.7167 4 13.1042 4.525 14.2625 5.575C15.4208 6.625 16 7.93333 16 9.5C16 11.0667 15.4208 12.375 14.2625 13.425C13.1042 14.475 11.7167 15 10.1 15H3Z"
      fill="#EC1410"
      fill-opacity="0.75"
    />
  </svg>
);

const exportIcon = (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.49219 1.00781C5.6276 1.00781 5.74479 1.05729 5.84375 1.15625C5.94271 1.25521 5.99219 1.3724 5.99219 1.50781C5.99219 1.64323 5.94271 1.76042 5.84375 1.85938C5.74479 1.95833 5.6276 2.00781 5.49219 2.00781H1.5C1.36458 2.00781 1.2474 2.05729 1.14844 2.15625C1.04948 2.25521 1 2.3724 1 2.50781V11.5C1 11.6354 1.04948 11.7526 1.14844 11.8516C1.2474 11.9505 1.36458 12 1.5 12H10.4922C10.6276 12 10.7448 11.9505 10.8438 11.8516C10.9427 11.7526 10.9922 11.6354 10.9922 11.5V7.50781C10.9922 7.3724 11.0417 7.25521 11.1406 7.15625C11.2396 7.05729 11.3568 7.00781 11.4922 7.00781C11.6276 7.00781 11.7448 7.05729 11.8438 7.15625C11.9427 7.25521 11.9922 7.3724 11.9922 7.50781V11.5C11.9922 11.7031 11.9505 11.8958 11.8672 12.0781C11.7891 12.2552 11.6797 12.4141 11.5391 12.5547C11.4036 12.6901 11.2448 12.7995 11.0625 12.8828C10.8854 12.9609 10.6953 13 10.4922 13H1.5C1.30208 13 1.11198 12.9609 0.929688 12.8828C0.747396 12.7995 0.585938 12.6901 0.445312 12.5547C0.309896 12.4141 0.200521 12.2526 0.117188 12.0703C0.0390625 11.888 0 11.6979 0 11.5V2.50781C0 2.30469 0.0390625 2.11458 0.117188 1.9375C0.200521 1.75521 0.309896 1.59635 0.445312 1.46094C0.585938 1.32031 0.744792 1.21094 0.921875 1.13281C1.10417 1.04948 1.29688 1.00781 1.5 1.00781H5.49219ZM12.9922 0C13.1276 0 13.2448 0.0494792 13.3438 0.148438C13.4427 0.247396 13.4922 0.364583 13.4922 0.5V4C13.4922 4.13542 13.4427 4.2526 13.3438 4.35156C13.2448 4.45052 13.1276 4.5 12.9922 4.5C12.8568 4.5 12.7396 4.45052 12.6406 4.35156C12.5417 4.2526 12.4922 4.13542 12.4922 4V1.69531L7.33594 6.85938C7.23698 6.95833 7.11979 7.00781 6.98438 7.00781C6.84896 7.00781 6.73177 6.95833 6.63281 6.85938C6.53385 6.76042 6.48438 6.64323 6.48438 6.50781C6.48438 6.36719 6.53385 6.2474 6.63281 6.14844L11.7734 1H9.48438C9.34896 1 9.23177 0.950521 9.13281 0.851562C9.03385 0.752604 8.98438 0.635417 8.98438 0.5C8.98438 0.364583 9.03385 0.247396 9.13281 0.148438C9.23177 0.0494792 9.34896 0 9.48438 0H12.9922Z"
      fill="#9AA6AC"
    />
  </svg>
);
