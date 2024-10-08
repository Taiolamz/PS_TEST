"use client";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

interface StaffTableProps {
  data?: any[];
}

export default function StaffTable({ data }: StaffTableProps) {
  const router = useRouter();
  const handleAddStaff = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };
  return (
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
      hidePagination
      addText="New Staff"
      hideNewBtnOne={false}
      tableBodyList={data}
      loading={false}
      onSearch={(param) => {
        console.log(param);
      }}
      dropDown
      hideFilter
      hideSort
      newBtnBulk
      dropDownList={[
        {
          label: "View Details",
          color: "",
          onActionClick: (param: any, dataTwo: any) => {
            // router.push(
            //   pathname +
            //     "?" +
            //     "ui=details" +
            //     "&" +
            //     "id=" +
            //     dataTwo?.name?.props.children[0].props.children
            // );
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
