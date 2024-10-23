"use client";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetSubsidiaryInStaffQuery } from "@/redux/services/checklist/subsidiaryApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function StaffTable({
  isLoading,
  subDetailsData,
  tableData,
  isFetching,
  onSearch,
  perPage,
  totalPage,
  currentPage,
  onPageChange,
  isActive,
}: {
  perPage?: number;
  totalPage?: number;
  currentPage?: number;
  isLoading?: boolean;
  subDetailsData?: any;
  tableData?: any[];
  isFetching?: boolean;
  onSearch?: (param: string) => void;
  onPageChange?: (param: string) => void;
  isActive: boolean;
}) {
  const router = useRouter();

  const handleAddStaff = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };

  return isLoading ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={[
        "Staff Name",
        "Gender",
        "Work Email",
        "Job Title",
        "Role",
        "Line Manager",
        "Action",
      ]}
      perPage={perPage}
      totalPage={totalPage}
      currentPage={currentPage}
      onPageChange={onPageChange}
      addText="New Staff"
      newBtnBulk={isActive}
      hideNewBtnOne={!isActive}
      tableBodyList={FORMAT_TABLE_DATA(tableData)}
      loading={isFetching}
      onSearch={onSearch}
      dropDown
      hideFilter
      hideSort
      // dropDownList={[
      //   {
      //     label: "View Details",
      //     color: "",
      //     onActionClick: (param: any, dataTwo: any) => {
      //       // router.push(
      //       //   pathname +
      //       //     "?" +
      //       //     "ui=details" +
      //       //     "&" +
      //       //     "id=" +
      //       //     dataTwo?.name?.props.children[0].props.children
      //       // );
      //     },
      //   },
      // ]}
      dropDownList={[
        {
          label: <span className="text-xs"> View Details </span>,
          color: "",
          onActionClick: (param: any, data: any) => {
            router.push(
              routesPath?.ADMIN?.EMPLOYEE_VIEW(
                data?.name?.props?.children[0]?.props?.children
              )
            );
          },
        },
      ]}
      onManualBtn={handleAddStaff}
      // onBulkUploadBtn={handleBulkUploadDialog}
      // onPdfChange={}
      // onCsvChange={}
    />
  );
}

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org?.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    gender: org?.gender || "n/a",
    email: org?.email || "n/a",
    job_title: org?.job_title || "n/a",
    role: org?.role || "n/a",
    line_manager_name: org?.line_manager_name || "n/a",
  }));
};
