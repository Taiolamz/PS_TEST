"use client";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

interface DeptTableProps {
  data?: any[];
}

export default function DeptTable({ data }: DeptTableProps) {
  const router = useRouter();
  const handleAddDept = () => {
    const path = ADMIN.CREATE_DEPARTMENT;
    router.push(path);
  };
  return (
    <TableWrapper
      tableheaderList={["Department", "HOD", "Subsidiary", "Branch", "Action"]}
      hidePagination
      addText="New Department"
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
      onManualBtn={handleAddDept}
      // onBulkUploadBtn={handleBulkUploadDialog}
      // onPdfChange={}
      // onCsvChange={}
    />
  );
}
