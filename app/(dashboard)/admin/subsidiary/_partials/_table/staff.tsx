import TableWrapper from "@/components/tables/TableWrapper";
import React from "react";

export default function StaffTable() {
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
