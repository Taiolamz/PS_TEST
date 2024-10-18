"use client";
import React from "react";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import TableWrapper from "@/components/tables/TableWrapper";
import { formatDate } from "@/utils/helpers/date-formatter";
import BadgeComponent from "@/components/badge/BadgeComponents";
import { useGetDownlineReportQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { EmptyFileIcon } from "@/public/assets/icons";
import { EmptyState, TableLoader } from "@/components/fragment";

const { EMPLOYEE } = routesPath;

export default function DownlineTable() {
  const router = useRouter();

  const { data, isLoading, isFetching } = useGetDownlineReportQuery({});
  // console.log(data, isLoading);

  return (
    <>
      {isLoading ? (
        <TableLoader rows={8} columns={6} />
      ) : (
        <>
          {data?.data?.data?.length === 0 ? (
            <EmptyState
              icon={EmptyFileIcon}
              text="Sorry, you have no downline report"
            >
              <p className="text-custom-gray-scale-400 font-normal text-[12px] -mt-2">
                You are the resource
              </p>
            </EmptyState>
          ) : (
            <TableWrapper
              tableheaderList={[
                "Staff Name",
                "Job Title",
                "Email",
                "Date Submitted",
                "Action",
              ]}
              TableTitle="Downline Progress"
              perPage={"10"}
              totalPage={"1"}
              currentPage={"1"}
              onPageChange={(p) => {}}
              onRowClick={() => {}}
              hideNewBtnOne={true}
              tableBodyList={FORMAT_TABLE_DATA(data?.data?.data)}
              loading={isFetching}
              dropDown
              dropDownList={[
                {
                  label: "View Progress",
                  color: "",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.DOWNLINE_MISSION_PLAN_REPORT(
                        dataTwo?.staff_name?.props?.children[0].props.children
                      )
                    );
                  },
                },
                {
                  label: "View Measure of Success Submission",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.REVIEW_MOS(
                        dataTwo?.staff_name?.props?.children[0].props.children
                      )
                    );
                  },
                },
                {
                  label: "View Task Submission",
                  onActionClick: (param: any, dataTwo: any) => {
                    router.push(
                      EMPLOYEE.REVIEW_TASK(
                        dataTwo?.staff_name?.props?.children[0].props.children
                      )
                    );
                  },
                },
              ]}
              width="300px"
              hideSearchFilterBox
            />
          )}
        </>
      )}
    </>
  );
}

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
