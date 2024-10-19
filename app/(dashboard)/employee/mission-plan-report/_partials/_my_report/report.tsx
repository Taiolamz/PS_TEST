import TeamPerformanceBar from "./_fragment/team-performance-bar";
import MeasureOfSucessProgress from "./_fragment/measure-of-success-progress";
import SpecifiedTaskProgress from "./_fragment/specified-task-progress";
import ReportFilter from "./_fragment/report-filter";

const MyReport = () => {
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
