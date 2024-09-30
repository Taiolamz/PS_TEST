"use client";
import { useSearchParams } from "next/navigation";
import MOSTable from "./_partials/mos-table";
import TargetSubmission from "./_partials/target-submission";
import MOSReport from "./_partials/report";

const MeasureOfSuccess = () => {
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  return (
    <div className="mt-5">
      {ui === "measure_of_success" && !id && <MOSTable />}
      {ui === "measure_of_success" && id && type === "target-submission" && (
        <TargetSubmission />
      )}
      {ui === "measure_of_success" && id && type === "report" && <MOSReport />}
    </div>
  );
};

export default MeasureOfSuccess;
