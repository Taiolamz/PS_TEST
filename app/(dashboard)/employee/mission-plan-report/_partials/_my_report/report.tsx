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
