import React from "react";
import MeasureOfSucessProgress from "../_partials/_my_report/_fragment/measure-of-success-progress";
import SpecifiedTaskProgress from "../_partials/_my_report/_fragment/specified-task-progress";
import ReportFilter from "../_partials/_my_report/_fragment/report-filter";
import { useGetMissionPlanReportCycleQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { useRouter } from "next/navigation";

export default function ProgressReport({ id }: { id: string }) {
  const router = useRouter();
  const [fiscalYear, setFiscalYear] = React.useState("");
  const [missionCycle, setMissionCycle] = React.useState("");

  const options = [
    {
      label: "Option one",
      value: "Option one",
    },
    {
      label: "Option two",
      value: "Option two",
    },
    {
      label: "Option three",
      value: "Option three",
    },
  ];

  const { data, isLoading, isFetching } = useGetMissionPlanReportCycleQuery();

  const handleFormatCycle = () => {
    const cycle = (data?.data as any[])?.map((chi) => {
      return {
        label: chi,
        value: chi,
      };
    });
    return cycle;
  };

  return (
    <div className="m-5">
      {/* ----- FILTER/SELECT WRAP START------- */}
      <ReportFilter
        fiscalYearVal={fiscalYear}
        setFiscalYearVal={setFiscalYear}
        missionCycleVal={missionCycle}
        setMissionCycleVal={setMissionCycle}
        fiscalOptions={options}
        cycleOptions={handleFormatCycle()}
        loading={isLoading || isFetching}
      />
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
        {/* <MOSCard id={params.reportId} />
      <SpecifiedTaskCard id={params.reportId} /> */}
        <div className="col-span-5">
          <MeasureOfSucessProgress />
        </div>
        <div className="col-span-7">
          <SpecifiedTaskProgress />
        </div>
      </div>
    </div>
  );
}
