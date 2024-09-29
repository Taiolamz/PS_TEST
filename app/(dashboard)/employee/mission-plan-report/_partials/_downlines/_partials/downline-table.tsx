"use client";
import { Progress } from "@/components/ui/progress";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { formatDate } from "@/utils/helpers/date-formatter";
import BadgeComponent from "@/components/badge/BadgeComponents";

const { EMPLOYEE } = routesPath;

export default function DownlineTable() {
  const router = useRouter();
  const pathname = usePathname();

  const createDownlineQueryString = React.useCallback(
    ({
      name,
      id,
      type,
    }: {
      name: string;
      id: string;
      type: string;
      tab?: string;
    }) => {
      const params = new URLSearchParams();
      params.set("ui", name); // Set the 'name' param
      params.set("id", id); // Set the 'id' param
      type === "mos" && params.set("type", "approve-mos");
      type === "task" && params.set("type", "approve-task");
      return params.toString(); // Return the query string
    },
    []
  );

  return (
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
      onPageChange={(p) => {}}
      onRowClick={() => {}}
      hideNewBtnOne={true}
      tableBodyList={FORMAT_TABLE_DATA(data)}
      loading={false}
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
              pathname.split("?")[0] +
                "?" +
                createDownlineQueryString({
                  type: "mos",
                  id: dataTwo?.staff_name?.props?.children[0].props.children,
                  name: "downlines",
                })
            );
          },
        },
        {
          label: "View Task Submission",
          onActionClick: (param: any, dataTwo: any) => {
            router.push(
              pathname.split("?")[0] +
                "?" +
                createDownlineQueryString({
                  type: "task",
                  id: dataTwo?.staff_name?.props?.children[0].props.children,
                  name: "downlines",
                })
            );
          },
        },
      ]}
      width="300px"
      hideSearchFilterBox
    />
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
        <p>{item?.staff_name}</p>
      </>
    ),
    job_title: item.job_title,
    work_email: item.work_email,
    created_at: formatDate(item?.created_at),
    status: (
      <BadgeComponent
        text={item?.status}
        color={
          item?.status?.toLowerCase() === "approved"
            ? "green"
            : item?.status?.toLowerCase() === "rejected"
            ? "red"
            : "yellow"
        }
      />
    ),
  }));
};
