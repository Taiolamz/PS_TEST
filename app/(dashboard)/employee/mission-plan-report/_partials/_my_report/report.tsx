import TeamPerformanceBar from "./_fragment/team-performance-bar";
import MeasureOfSucessProgress from "./_fragment/measure-of-success-progress";
import SpecifiedTaskProgress from "./_fragment/specified-task-progress";
import CustomSelect from "@/components/custom-select";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SpecifiedTaskDetailView from "./_fragment/specified-task-detail-view";
import MetricTableCard from "@/components/card/metric-table-card";

const MyReport = () => {
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
  const [fiscalYear, setFiscalYear] = useState("");
  const [missionCycle, setMissionCycle] = useState("");

  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const view = searchParams.get("view");

  return (
    <div>
      {/* ----- FILTER/SELECT WRAP START------- */}

      <div className="flex items-center mt-10 justify-between">
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
              className="w-[150px] text-xs rounded-none rounded-l-[5px]"
            />
            <CustomSelect
              placeholder="Cycle"
              options={[]}
              selected={missionCycle}
              setSelected={(e: any) => {
                setMissionCycle(e);
              }}
              className="w-[150px] text-xs rounded-none rounded-r-[5px]"
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
      <TeamPerformanceBar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 2fr",
          gap: "3rem",
        }}
        className="mt-5"
      >
        {ui === "my_report" && !view && (
          <>
            <MeasureOfSucessProgress />
            <SpecifiedTaskProgress />
          </>
        )}
      </div>

      {view === "specified_task_detail_view" && (
        <div className="flex flex-col gap-3">
          <SpecifiedTaskDetailView />
        </div>
      )}
    </div>
  );
};

export default MyReport;
