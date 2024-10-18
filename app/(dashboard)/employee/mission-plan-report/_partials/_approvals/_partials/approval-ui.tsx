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
  // console.log(data, isLoading);

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

const FORMAT_TABLE_DATA = (data: any) => {
  return data?.map((item: any) => ({
    staff_name: (
      <>
        <span className="hidden">{item.id}</span>
        <p>{item?.name}</p>
      </>
    ),
    job_title: item?.designation,
    work_email: item?.email,
    created_at: formatDate(item?.date_submitted),
  }));
};
