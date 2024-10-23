"use client";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetSubsidiaryInUnitQuery } from "@/redux/services/checklist/subsidiaryApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function UnitTable({
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
  const searchParams = useSearchParams();

  const handleAddUnit = () => {
    const path = ADMIN.CREATE_UNIT;
    router.push(path);
  };

  return isLoading ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={["Unit Name", "HOU", "Department", "Branch", "Action"]}
      // hidePagination
      perPage={perPage}
      totalPage={totalPage}
      currentPage={currentPage}
      onPageChange={onPageChange}
      addText="New Unit"
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
          label: "View Details",
          color: "",
          onActionClick: (param: any, dataTwo: any) => {
            router.push(
              ADMIN.UNIT_DETAILS({
                id: dataTwo?.name?.props?.children[0]?.props?.children,
                tab: "staffs",
              })
            );
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

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    head_of_unit: org?.head_of_unit?.name ?? "n/a",
    department: org?.deparment?.name ?? "n/a",
    branch: org?.branch?.name ?? "n/a",
  }));
};
