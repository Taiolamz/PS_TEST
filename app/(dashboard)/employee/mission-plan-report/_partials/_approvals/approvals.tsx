import BadgeComponent from "@/components/badge/BadgeComponents";
import { useGetAllOrganizationEmployeeMissionPlanQuery } from "@/redux/services/mission-plan/allmissionplanApi";
import { formatDate } from "@/utils/helpers/date-formatter";

import { useSearchParams } from "next/navigation";
import ApprovalUI from "./_partials/approval-ui";
import MeasureOfSuccess from "../_measure_of_success/measure_of_success";
import ActualOutcomeApproval from "../../[reportId]/approval-progress/approval-tasks-submission/_partials/actual-outcome-approval";
import { useCallback } from "react";

const Approvals = () => {
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const employeeId = searchParams.get("empID");
  const measure = searchParams.get("measure");

  

  const {
    data: employeeData,
    isLoading: isLoadingEmployee,
    isFetching: isFetchingEmployee,
    error: employeeError,
  }: any = useGetAllOrganizationEmployeeMissionPlanQuery({
    params: {
      subsidiary: "",
      department: "",
      unit: "",
      search: "",
      status: "",
      sort_by: "",
    },
    fiscal_year_id: "01j80dtcr56d3pxts26prs9547",
  });

  
  const FORMAT_TABLE_DATA = (obj: any) => {
    return obj?.map((org: any) => ({
      name: (
        <>
          <span className="hidden">{org.id}</span>
          <p>{org?.name}</p>
        </>
      ),
      designation: org?.designation,
      email: org?.email,
      created_at: formatDate(org?.created_at),
      status: (
        <BadgeComponent
          text={org?.status}
          color={
            org?.status?.toLowerCase() === "approved"
              ? "green"
              : org?.status?.toLowerCase() === "rejected"
              ? "red"
              : "yellow"
          }
        />
      ),
    }));
  };

  const getView = () => {
    if (ui === "approvals" && !employeeId) {
      return (
        <ApprovalUI
          FORMAT_TABLE_DATA={FORMAT_TABLE_DATA}
          isFetchingEmployee={isFetchingEmployee || isLoadingEmployee}
          employeeData={employeeData}
        />
      );
    } else if (
      ui === "approvals" &&
      employeeId &&
      measure === "approval-task"
    ) {
      return <ActualOutcomeApproval />;
    } else if (
      measure === "approval-successs" &&
      employeeId &&
      ui === "approvals"
    ) {
      return <MeasureOfSuccess />;
    }
  };
  return <div className="w-full mt-[30px]">{getView()}</div>;
};

export default Approvals;
