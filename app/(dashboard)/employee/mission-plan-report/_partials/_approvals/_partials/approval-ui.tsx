import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";

import React, { useCallback } from "react";

interface ApprovalUIProps {
  FORMAT_TABLE_DATA: (e: any) => void;
  isFetchingEmployee: boolean;
  employeeData: any;
}
const ApprovalUI = ({
  FORMAT_TABLE_DATA,
  isFetchingEmployee,
  employeeData,
}: ApprovalUIProps) => {
  const pathname = usePathname();

  const router = useRouter();
  const { EMPLOYEE } = routesPath;

  // const createQueryString = useCallback(
  //   (name: string, id: string, approve: boolean) => {
  //     const params = new URLSearchParams();
  //     params.set("ui", name); // Set the 'name' param
  //     params.set("empID", id); // Set the 'id' param
  //     approve ? params.set("measure", "approval-successs") : params.set("measure", "approval-task"); // Set the 'id' param

  //     return params.toString(); // Return the query string
  //   },
  //   [] // We are not dependent on `searchParams` now, so it's an empty dependency array
  // );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-[700]">
          Total: {isFetchingEmployee ? "---" : "3"}
        </h1>
      </div>
      <TableWrapper
        tableheaderList={[
          "Staff Name",
          "Staff Role",
          "Email",
          "Date Submitted",
          "Approval Status",
          "Action",
        ]}
        perPage={employeeData?.mission_plans?.meta?.per_page}
        totalPage={employeeData?.mission_plans?.meta?.total}
        currentPage={employeeData?.mission_plans?.meta?.current_page}
        onPageChange={(p) => {
          console.log(p);
        }}
        onRowClick={() => {
          console.log(employeeData?.mission_plans?.meta);
        }}
        hideNewBtnOne={true}
        tableBodyList={FORMAT_TABLE_DATA(
          employeeData?.mission_plans?.data
          // allemployeeData
        )}
        loading={isFetchingEmployee}
        dropDown
        dropDownList={[
          {
            label: "View Progress",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {
              router.push(
                EMPLOYEE.APPROVAL_MISSION_PLAN_REPORT(
                  dataTwo?.name?.props?.children[0].props.children
                )
              );
            },
          },
          {
            label: "View Measure of Success Submission",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {},
          },
          {
            label: "View Tasks Submission",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {
              router.push(
                EMPLOYEE.APPROVAL_MISSION_PLAN_REPORT_TASK_SUBMISSION(
                  dataTwo?.name?.props?.children[0].props.children
                )
              );
            },
          },
        ]}
        hideSearchFilterBox
        width="300px"
      />
    </div>
  );
};

export default ApprovalUI;
