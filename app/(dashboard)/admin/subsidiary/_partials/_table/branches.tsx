"use client";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetSubsidiaryInBranchQuery } from "@/redux/services/checklist/subsidiaryApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function BranchesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isFetching } = useGetSubsidiaryInBranchQuery({
    id: id,
    params: { page, search },
  });

  const handleAddBranch = () => {
    const path = ADMIN.CREATE_BRANCH;
    router.push(path);
  };
  return isLoading ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={[
        "Name",
        "Subsidiary",
        "Country",
        "State",
        "Address",
        "Action",
      ]}
      perPage={data?.meta?.per_page}
      totalPage={data?.meta?.total}
      currentPage={data?.meta?.current_page}
      onPageChange={(p) => {
        setPage(p);
      }}
      addText="New Branch"
      hideNewBtnOne={false}
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

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.branch_id}</span>
        <p>{org?.name}</p>
      </>
    ),
    subsidiary: org?.subsidiary?.name,
    country: org?.country || "--- ---",
    state: org?.state || "--- ---",
    address: org?.address || "--- ---",
  }));
};
