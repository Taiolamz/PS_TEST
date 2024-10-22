import TeamPerformanceBar from "./_fragment/team-performance-bar";
import MeasureOfSucessProgress from "./_fragment/measure-of-success-progress";
import SpecifiedTaskProgress from "./_fragment/specified-task-progress";
import ReportFilter from "./_fragment/report-filter";
import {
  resetFilter,
  setFilteredFiscalYear,
} from "@/redux/features/mission-plan/report/employee/employeeMissionPlanReport";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

const MyReport = () => {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const fy = searchParams.get("fy");

  useEffect(() => {
    if (fy) {
      dispatch(setFilteredFiscalYear(fy));
    } else {
      dispatch(resetFilter());
    }
  }, []);
  return (
    <div>
      {/* ----- FILTER/SELECT WRAP START------- */}

      <ReportFilter />

      {/* ----- FILTER/SELECT WRAP END------- */}
      <TeamPerformanceBar />
      {/* ----- SPECIFIED TASK/MEASURE OF SUCCESS------- */}
      <div className="grid lg:grid-cols-11 mt-5 gap-5">
        <div className="col-span-5">
          <MeasureOfSucessProgress />
        </div>
        <div className="col-span-6">
          <SpecifiedTaskProgress />
        </div>
      </div>
    </div>
  );
};

export default MyReport;
