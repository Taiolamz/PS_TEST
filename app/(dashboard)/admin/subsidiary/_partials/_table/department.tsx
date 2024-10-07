"use client";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetSubsidiaryInDeptQuery } from "@/redux/services/checklist/subsidiaryApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function DeptTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const handleAddDept = () => {
    const path = ADMIN.CREATE_DEPARTMENT;
    router.push(path);
  };

  const { data, isLoading, isFetching } = useGetSubsidiaryInDeptQuery({
    id: id,
    params: { page, search },
  });

  return isLoading ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={["Department", "HOD", "Subsidiary", "Branch", "Action"]}
      addText="New Department"
      hideNewBtnOne={false}
      tableBodyList={FORMAT_TABLE_DATA(data?.data)}
      loading={isFetching}
      perPage={data?.meta?.per_page}
      totalPage={data?.meta?.total}
      currentPage={data?.meta?.current_page}
      onPageChange={(p) => {
        setPage(p);
      }}
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
      onManualBtn={handleAddDept}
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
    head_of_department: org?.head_of_department?.name || "--- ---",
    subsidiary: org?.subsidiary?.name || "--- ---",
    branch: org?.branch?.name || "--- ---",
  }));
};
