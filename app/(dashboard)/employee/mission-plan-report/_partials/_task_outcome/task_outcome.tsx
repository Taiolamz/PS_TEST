import { Progress } from "@/components/ui/progress";
import TaskOutcomeTable from "./_table/task-outcome-table";
import { useSearchParams } from "next/navigation";
import ApprovalProgress from "@/components/fragment/progress/approval-progress";
import ActualOutcome from "../../[reportId]/actual-outcome/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReusableDrawer } from "@/components/fragment";
import { useState } from "react";
import ApprovalStatus, { ApprovalStep } from "../../_component/approval-status";

const steps: ApprovalStep[] = [
  { name: "Seyi Ajayi", role: "Managing Director", status: "Yet to Review" },
  { name: "Tinubu Seyi", role: "Managing Director", status: "Approved" },
  { name: "Seyi Ajayi", role: "Managing Director", status: "Approved" },
  { name: "Seyi A. Ajayi", role: "Managing Director", status: "In Review" },
];

const data = [
  {
    id: "01j7gmrp88y0t5yrmfbbqybas5",
    name: "NEW FY",
    percentage: "50.00%",
    status: "completed",
    approval_progress: ["pending", "approved", "approved", "rejected"],
  },
  {
    id: "01j7gmrp88y0t5yrmfbbqybas5",
    name: "SECOND FY",
    percentage: "20.00%",
    status: "completed",
    approval_progress: ["pending", "rejected", "approved", "approved"],
  },
  {
    id: "01j7gmrp88y0t5yrmfbbqybas5",
    name: "NEW FY",
    percentage: "72.00%",
    status: "completed",
    approval_progress: ["approved", "pending", "approved", "rejected"],
  },
  {
    id: "01j7gmrp88y0t5yrmfbbqybas5",
    name: "SECOND FY",
    percentage: "90.21%",
    status: "completed",
    approval_progress: ["rejected", "approved", "pending", "approved"],
  },
];

const TaskOutcome = () => {
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  const [showApprovalStatus, setShowApprovalStatus] = useState<boolean>(false);

  const FORMAT_TABLE_DATA = (data: any) => {
    return data?.map((item: any) => ({
      name: (
        <>
          <span className="hidden">{item.id}</span>
          <p>{item?.name}</p>
        </>
      ),
      status: (
        <p
          className={` capitalize 
            ${item?.status !== "active" ? "text-[#119C2B]" : "text-[#835101]"}`}
        >
          {item?.status}
        </p>
      ),
      approvalProgress: (
        <ApprovalProgress progressSteps={item?.approval_progress} />
      ),

      percentage: (
        <div className="flex gap-x-1 items-center">
          <p className="text-[10px]">
            {Math.round(Number(item?.percentage?.split("%")[0]))}%
          </p>
          <Progress
            value={Math.round(Number(item?.percentage?.split("%")[0]))}
            className={`w-[150px] h-1.5 `}
            indicatorClass={
              Math.round(Number(item?.percentage?.split("%")[0])) >= 70
                ? "bg-green-500"
                : Math.round(Number(item?.percentage?.split("%")[0])) > 40
                ? "bg-warning"
                : "bg-[red]"
            }
          />
        </div>
      ),
    }));
  };

  return (
    <div className="mt-5">
      {/* <ReusableDrawer
        title="Approval Status"
        show={showApprovalStatus}
        handleClose={() => setShowApprovalStatus(false)}
        closeOnClickOutside={false}
        headerClass={"bg-white lg:mx-0 p-5"}
        titleClass={"text-dark font-medium"}
        childrenContainerClass="py-0"
      >
        <ApprovalStatus steps={steps} />
      </ReusableDrawer> */}
      {ui === "task_outcome" && !id && <TaskOutcomeTable />}
      {ui === "task_outcome" && id && type === "expected-outcome" && (
        <div> Expected Outcome </div>
      )}
      {ui === "task_outcome" && id && type === "actual-outcome" && (
        <ActualOutcome />
      )}
    </div>
  );
};

export default TaskOutcome;
