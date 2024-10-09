"use client";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetSubsidiaryInUnitQuery } from "@/redux/services/checklist/subsidiaryApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useSubsidiaryById } from "../../_hooks/useSubsidiaryById";

const { ADMIN } = routesPath;

export default function UnitTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isFetching } = useGetSubsidiaryInUnitQuery({
    id: id,
    params: { page, search },
  });

  const { subDetailsData } = useSubsidiaryById(id ?? "");

  const handleAddUnit = () => {
    const path = ADMIN.CREATE_UNIT;
    router.push(path);
  };

  return isLoading ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={["Unit Name", "HOU", "Department", "Branch", "Action"]}
      hidePagination
      addText="New Unit"
      newBtnBulk={!subDetailsData?.deleted_at}
      hideNewBtnOne={subDetailsData?.deleted_at}
      tableBodyList={FORMAT_TABLE_DATA(data?.data)}
      loading={isFetching}
      onSearch={(param) => {
        setTimeout(() => {
          // Delay api call after 3 seconds
          setPage(1);
          setSearch(param);
        }, 3000);
      }}
      dropDown
      hideFilter
      hideSort
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

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    head_of_unit: org?.head_of_unit?.name ?? "--- ---",
    department: org?.deparment?.name ?? "--- ---",
    branch: org?.branch?.name ?? "--- ---",
  }));
};
