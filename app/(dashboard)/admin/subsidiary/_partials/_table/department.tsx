import TableWrapper from "@/components/tables/TableWrapper";
import React from "react";

export default function DeptTable() {
  return (
    <TableWrapper
      tableheaderList={["Department", "HOD", "Subsidiary", "Branch", "Action"]}
      hidePagination
      addText="New Department"
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
      // onManualBtn={handleAddSubsidiary}
      // onBulkUploadBtn={handleBulkUploadDialog}
      // onPdfChange={}
      // onCsvChange={}
    />
  );
}
