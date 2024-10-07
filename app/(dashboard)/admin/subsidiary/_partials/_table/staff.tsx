"use client";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetSubsidiaryInStaffQuery } from "@/redux/services/checklist/subsidiaryApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function StaffTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, isFetching } = useGetSubsidiaryInStaffQuery({
    id: id,
    params: { page, search },
  });
  console.log(data);
  const handleAddStaff = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };
  return isLoading ? (
    <TableLoader rows={8} columns={8} />
  ) : (
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
      perPage={data?.meta?.per_page}
      totalPage={data?.meta?.total}
      currentPage={data?.meta?.current_page}
      onPageChange={(p) => {
        setPage(p);
      }}
      addText="New Staff"
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
      onManualBtn={handleAddStaff}
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
    subsidgenderiary: org?.gender || "--- ---",
    email: org?.email || "--- ---",
    job_title: org?.job_title || "--- ---",
    role: org?.role || "--- ---",
    line_manager_name: org?.line_manager_name || "--- ---",
  }));
};
