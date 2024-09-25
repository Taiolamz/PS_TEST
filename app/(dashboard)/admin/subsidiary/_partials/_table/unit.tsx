"use client";
import TableWrapper from "@/components/tables/TableWrapper";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function UnitTable() {
  const router = useRouter();
  const handleAddUnit = () => {
    const path = ADMIN.CREATE_UNIT;
    router.push(path);
  };

  return (
    <TableWrapper
      tableheaderList={["Unit Name", "HOU", "Department", "Branch", "Action"]}
      hidePagination
      addText="New Unit"
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
      onManualBtn={handleAddUnit}
      // onBulkUploadBtn={handleBulkUploadDialog}
      // onPdfChange={}
      // onCsvChange={}
    />
  );
}
