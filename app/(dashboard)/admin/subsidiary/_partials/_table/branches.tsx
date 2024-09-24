"use client";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function BranchesTable() {
  const router = useRouter();
  const handleAddBranch = () => {
    const path = ADMIN.CREATE_BRANCH;
    router.push(path);
  };
  return (
    <TableWrapper
      tableheaderList={[
        "Name",
        "Subsidiary",
        "Country",
        "State",
        "Address",
        "Action",
      ]}
      hidePagination
      addText="New Branch"
      hideNewBtnOne={false}
      tableBodyList={[]}
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
      onManualBtn={handleAddBranch}
      // onBulkUploadBtn={handleBulkUploadDialog}
      // onPdfChange={}
      // onCsvChange={}
    />
  );
}
