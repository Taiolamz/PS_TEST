import TeamPerformanceBar from "./_fragment/team-performance-bar";
import MeasureOfSucessProgress from "./_fragment/measure-of-success-progress";
import SpecifiedTaskProgress from "./_fragment/specified-task-progress";
import { useState } from "react";
import ReportFilter from "./_fragment/report-filter";
import { useGetMissionPlanReportCycleQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";

const MyReport = () => {
  const [fiscalYear, setFiscalYear] = useState("");
  const [missionCycle, setMissionCycle] = useState("");

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
    const cycles = (data?.data?.cycles as any[])?.map((chi) => {
      return {
        label: chi,
        value: chi,
      };
    });
    return cycles;
  };

  return (
    <div>
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
      <TeamPerformanceBar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 2fr",
          gap: "3rem",
        }}
        className="mt-5"
      >
        <MeasureOfSucessProgress />
        <SpecifiedTaskProgress />
      </div>
    </div>
  );
};

export default MyReport;
