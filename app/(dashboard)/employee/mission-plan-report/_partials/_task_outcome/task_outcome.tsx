import { Progress } from "@/components/ui/progress";
import TaskOutcomeTable from "../../_component/task-outcome-table";
import ApprovalProgress from "@/components/custom-progress/progress-bars";
import { useSearchParams } from "next/navigation";

const data = [
  {
    id: 1,
    fyName: "FY 2024",
    status: "Ongoing",
    approvalProgress: 1,
    taskCompletionPercentage: 60,
  },
  {
    id: 1,
    fyName: "Financial Year 2023",
    status: "Closed",
    approvalProgress: 4,
    taskCompletionPercentage: 100,
  },
  {
    id: 1,
    fyName: "FY 2022",
    status: "Ongoing",
    approvalProgress: 5,
    taskCompletionPercentage: 70,
  },
  {
    id: 1,
    fyName: "FY 2021",
    status: "Ongoing",
    approvalProgress: 3,
    taskCompletionPercentage: 39,
  },
];

const TaskOutcome = () => {
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  const FORMAT_TABLE_DATA = (data: any) => {
    return data?.map((item: any) => ({
      name: (
        <>
          <span className="hidden">{item.id}</span>
          <p>{item?.fyName}</p>
        </>
      ),
      status: (
        <p
          className={
            item?.status === "Ongoing" ? "text-[#119C2B]" : "text-[#3E4345]"
          }
        >
          {item?.status}
        </p>
      ),
      approvalProgress: (
        <ApprovalProgress steps={5} completedSteps={item?.approvalProgress} />
      ),

      taskCompletionPercentage: (
        <div className="flex gap-x-1 items-center">
          <p className="text-[10px]">{item?.taskCompletionPercentage}%</p>
          <Progress
            value={item?.taskCompletionPercentage}
            className={`w-[150px] h-2 `}
            indicatorClass={
              item?.taskCompletionPercentage >= 70
                ? "bg-green-500"
                : item?.taskCompletionPercentage > 40
                ? "bg-warning"
                : "bg-[red]"
            }
          />
        </div>
      ),
    }));
  };

  return (
    <div className="mt-11">
      {ui === "task_outcome" && !id && (
        <TaskOutcomeTable
          FORMAT_TABLE_DATA={FORMAT_TABLE_DATA}
          outcomeData={data}
        />
      )}
      {ui === "task_outcome" && id && type === "expected-outcome" && (
        <div> Expected Outcome </div>
      )}
      {ui === "task_outcome" && id && type === "actual-outcome" && (
        <div> Actual Outcome </div>
      )}
    </div>
  );
};

export default TaskOutcome;
