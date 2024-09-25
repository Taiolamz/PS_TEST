"use client";
import { Progress } from "@/components/ui/progress";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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
        "Work Email",
        "Measure Completion",
        "Task Completion",
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
          label: "Approve Task",
          color: "",
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
        {
          label: "Approve Measure of success",
          color: "",
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
      ]}
      width="195px"
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
    measure_completion: 72,
    task_completion: 14,
  },
  {
    id: 2,
    staff_name: "Bryan Adamu",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    measure_completion: 90,
    task_completion: 63,
  },
  {
    id: 3,
    staff_name: "Jerome Bell",
    job_title: "Product Designer",
    work_email: "ony@gmail.com",
    measure_completion: 52,
    task_completion: 48,
  },
  {
    id: 4,
    staff_name: "Amaka Johnson",
    job_title: "Product Designer",
    work_email: "amaka@gmail.com",
    measure_completion: 22,
    task_completion: 55,
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
    measure_completion: (
      <div className="flex gap-x-1 items-center">
        <p className="text-[10px]">{item?.measure_completion}%</p>
        <Progress
          value={item?.measure_completion}
          className={`w-[70px] h-1.5 `}
          indicatorClass={
            item?.measure_completion >= 70
              ? "bg-green-500"
              : item?.measure_completion > 40
              ? "bg-warning"
              : "bg-[red]"
          }
        />
      </div>
    ),
    task_completion: (
      <div className="flex gap-x-1 items-center">
        <p className="text-[10px]">{item?.task_completion}%</p>
        <Progress
          value={item?.task_completion}
          className={`w-[70px] h-1.5 `}
          indicatorClass={
            item?.task_completion >= 70
              ? "bg-green-500"
              : item?.task_completion > 40
              ? "bg-warning"
              : "bg-[red]"
          }
        />
      </div>
    ),
  }));
};
