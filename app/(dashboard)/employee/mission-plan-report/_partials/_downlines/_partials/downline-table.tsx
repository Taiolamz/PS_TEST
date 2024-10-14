"use client";
import React, { useState } from "react";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import TableWrapper from "@/components/tables/TableWrapper";
import { formatDate } from "@/utils/helpers/date-formatter";
import BadgeComponent from "@/components/badge/BadgeComponents";
import { useAppSelector } from "@/redux/store";
import { TableLoader } from "@/components/fragment";
import { PageLoader } from "@/components/custom-loader";
import { useGetOrganizationMissionPlansQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { useGetDownlinerMissionPlanReportQuery } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";

const { EMPLOYEE } = routesPath;

export default function DownlineTable() {
  const [search, setSearch] = useState<string>("");
  // const [filter, setFilter] = useState<string>("");
  // const [sort, setSort] = useState<string>("");
  const router = useRouter();

  const { data, isLoading, isFetching } =
    useGetDownlinerMissionPlanReportQuery<{
      data: { data: any[]; links: any; meta: any };
      isLoading: boolean;
      isFetching?: boolean;
    }>({
      search: search,
    });

  return (
    <>
      {isLoading ? (
        <div className="h-[75vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <TableWrapper
          tableheaderList={[
            "Staff Name",
            "Job Title",
            "Email",
            "Date Submitted",
            "Approval Status",
            "Action",
          ]}
          TableTitle="Downline Progress"
          perPage={"10"}
          totalPage={"1"}
          currentPage={"1"}
          // onPageChange={(p) => {}}
          onRowClick={() => {}}
          hideNewBtnOne={true}
          tableBodyList={FORMAT_TABLE_DATA(data?.data)}
          dropDown
          loading={isFetching}
          onPageChange={(p) => {
            console.log(p);
          }}
          onSearch={(val) => {
            setTimeout(() => {
              setSearch(val);
            }, 2000);
          }}
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
  );
}

const data = [
  {
    id: 1,
    staff_name: "Oluwaseyi Ajayi",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "pending",
  },
  {
    id: 2,
    staff_name: "Bryan Adamu",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "approved",
  },
  {
    id: 3,
    staff_name: "Jerome Bell",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "rejected",
  },
  {
    id: 4,
    staff_name: "Amaka Johnson",
    job_title: "Product Designer",
    work_email: "amaka@gmail.com",
    created_at: "2024-09-17T16:46:36.000000Z",
    status: "pending",
  },
];

const FORMAT_TABLE_DATA = (data: any) => {
  return data?.map((item: any) => ({
    staff_name: (
      <>
        <span className="hidden">{item.id}</span>
        <p>{item?.name}</p>
      </>
    ),
    job_title: item?.desgination || "n/a",
    work_email: item?.email || "n/a",
    created_at: formatDate(item?.date_submitted),
    status: (
      <BadgeComponent
        text={item?.status}
        color={
          item?.status?.toLowerCase() === "success"
            ? "green"
            : item?.status?.toLowerCase() === "failed"
            ? "red"
            : "yellow"
        }
      />
    ),
  }));
};
