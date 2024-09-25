"use client";
import { Progress } from "@/components/ui/progress";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

const Downlines = () => {
  const router = useRouter();
  const handleAddBranch = () => {
    const path = ADMIN.CREATE_BRANCH;
    router.push(path);
  };
  return (
    <div className="mt-7">
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
              // router.push(
              //   pathname.split("?")[0] +
              //     "?" +
              //     createQueryString(
              //       "task_outcome",
              //       dataTwo?.name?.props?.children[0].props.children,
              //       "actual"
              //     )
              // );
            },
          },
          {
            label: "Approve Task",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {},
          },
          {
            label: "Approve Measure of success",
            color: "",
            onActionClick: (param: any, dataTwo: any) => {},
          },
        ]}
        width="195px"
        hideSearchFilterBox
      />
    </div>
  );
};

export default Downlines;

const data = [
  {
    id: 1,
    staffName: "Oluwaseyi Ajayi",
    jobTitle: "Product Designer",
    workEmail: "ony@gmail.com",
    measureCompletion: 72,
    taskCompletion: 14,
  },
  {
    id: 2,
    staffName: "Bryan Adamu",
    jobTitle: "Product Designer",
    workEmail: "ony@gmail.com",
    measureCompletion: 90,
    taskCompletion: 63,
  },
  {
    id: 3,
    staffName: "Jerome Bell",
    jobTitle: "Product Designer",
    workEmail: "ony@gmail.com",
    measureCompletion: 52,
    taskCompletion: 48,
  },
  {
    id: 4,
    staffName: "Amaka Johnson",
    jobTitle: "Product Designer",
    workEmail: "amaka@gmail.com",
    measureCompletion: 22,
    taskCompletion: 55,
  },
];

const FORMAT_TABLE_DATA = (data: any) => {
  return data?.map((item: any) => ({
    staffName: (
      <>
        <span className="hidden">{item.id}</span>
        <p>{item?.staffName}</p>
      </>
    ),
    jobTitle: item.jobTitle,
    workEmail: item.workEmail,
    measureCompletion: (
      <div className="flex gap-x-1 items-center">
        <p className="text-[10px]">{item?.measureCompletion}%</p>
        <Progress
          value={item?.measureCompletion}
          className={`w-[70px] h-1.5 `}
          indicatorClass={
            item?.measureCompletion >= 70
              ? "bg-green-500"
              : item?.measureCompletion > 40
              ? "bg-warning"
              : "bg-[red]"
          }
        />
      </div>
    ),
    taskCompletion: (
      <div className="flex gap-x-1 items-center">
        <p className="text-[10px]">{item?.taskCompletion}%</p>
        <Progress
          value={item?.taskCompletion}
          className={`w-[70px] h-1.5 `}
          indicatorClass={
            item?.taskCompletion >= 70
              ? "bg-green-500"
              : item?.taskCompletion > 40
              ? "bg-warning"
              : "bg-[red]"
          }
        />
      </div>
    ),
  }));
};
