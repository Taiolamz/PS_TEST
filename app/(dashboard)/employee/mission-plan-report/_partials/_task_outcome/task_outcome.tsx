import TaskOutcomeTable from "./_table/task-outcome-table";
import { useSearchParams } from "next/navigation";
import ActualOutcome from "../../[reportId]/actual-outcome/page";
import { ApprovalStep } from "../../_component/approval-status";

const TaskOutcome = () => {
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  return (
    <div className="mt-5">
      {ui === "task_outcome" && !id && <TaskOutcomeTable />}
      {ui === "task_outcome" && id && type === "expected-outcome" && (
        <div> Expected Outcome </div>
      )}
    </div>
  );
};

export default TaskOutcome;
