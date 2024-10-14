import BadgeComponent from "@/components/badge/BadgeComponents";
import { EmptyState, TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { EmptyFileIcon } from "@/public/assets/icons";
import { useGetApprovalReportQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { formatDate } from "@/utils/helpers/date-formatter";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";

import React, { useCallback } from "react";

const ApprovalUI = () => {
  const router = useRouter();
  const { EMPLOYEE } = routesPath;

  const { data, isLoading, isFetching } = useGetApprovalReportQuery({});
  console.log(data, isLoading);

  return (
    <>
      {isLoading ? (
        <TableLoader rows={8} columns={6} />
      ) : (
        <>
          {data?.data?.data?.length === 0 ? (
            <EmptyState icon={EmptyFileIcon} text="Sorry, you don’t have an">
              <p className="text-custom-gray-scale-400 font-medium text-sm -mt-3">
                approval request yet
              </p>
            </EmptyState>
          ) : (
            <TableWrapper
              tableheaderList={[
                "Staff Name",
                "Staff Role",
                "Email",
                "Date Submitted",
                "Approval Status",
                "Action",
              ]}
              // perPage={employeeData?.mission_plans?.meta?.per_page}
              // totalPage={employeeData?.mission_plans?.meta?.total}
              // currentPage={employeeData?.mission_plans?.meta?.current_page}
              TableTitle="Approval Progress"
              perPage={"10"}
              totalPage={"1"}
              currentPage={"1"}
              onPageChange={(p) => {}}
              onRowClick={() => {}}
              hideNewBtnOne={true}
              tableBodyList={FORMAT_TABLE_DATA(data)}
              loading={isFetching}
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
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.REVIEW_MOS(
                        dataTwo?.name?.props?.children[0].props.children
                      )
                    );
                  },
                },
                {
                  label: "View Tasks Submission",
                  color: "",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.REVIEW_TASK(
                        dataTwo?.name?.props?.children[0].props.children
                      )
                    );
                  },
                },
              ]}
              hideSearchFilterBox
              width="300px"
            />
          )}
        </>
      )}
    </>
  );
};

export default ApprovalUI;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    designation: org?.job_title,
    email: org?.work_email,
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

const data = [
  {
    id: 1,
    name: "Oluwaseyi Ajayi",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "pending",
  },
  {
    id: 2,
    name: "Bryan Adamu",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "approved",
  },
  {
    id: 3,
    name: "Jerome Bell",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "rejected",
  },
  {
    id: 4,
    name: "Amaka Johnson",
    job_title: "Product Designer",
    work_email: "amaka@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "pending",
  },
];
