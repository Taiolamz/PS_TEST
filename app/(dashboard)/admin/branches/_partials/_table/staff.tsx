"use client";
import { useDebounce } from "@/app/(dashboard)/_layout/Helper";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import { useGetBranchStaffQuery } from "@/redux/services/checklist/branchApi";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const { ADMIN } = routesPath;

export default function StaffTable({ isActive }: { isActive: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [search, setSearch] = React.useState<string>("");
  const [page, setPage] = React.useState(1);
  const debounceSearch = useDebounce(search, 500);

  const handleAddStaff = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };

  const {
    data: branchDataStaff,
    isLoading,
    isFetching,
  } = useGetBranchStaffQuery(
    {
      id: id as string,
      params: {
        search: debounceSearch || "",
        page: page || 1,
      },
    },
    {
      skip: !id,
    }
  );

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
      addText="New Staff"
      newBtnBulk={isActive}
      hideNewBtnOne={!isActive}
      loading={isFetching}
      onSearch={(e) => {
        setSearch(e);
      }}
      perPage={branchDataStaff?.data?.staffs?.meta?.per_page}
      totalPage={branchDataStaff?.data?.staffs?.meta?.total}
      currentPage={branchDataStaff?.data?.staffs?.meta?.current_page}
      onPageChange={(p) => {
        setPage(p);
      }}
      tableBodyList={FORMAT_TABLE_DATA(branchDataStaff?.data?.staffs?.data)}
      dropDown
      hideFilter
      hideSort
      dropDownList={[
        {
          label: <span className="text-xs"> View Details </span>,
          color: "",
          onActionClick: (param: any, data: any) => {
            router.push(
              routesPath?.ADMIN?.EMPLOYEE_VIEW(
                data?.name?.props?.children[0]?.props?.children
              )
            );
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
        <span className="hidden">{org?.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    gender: org?.gender || "n/a",
    email: org?.email || "n/a",
    job_title: org?.job_title || "n/a",
    role: org?.role || "n/a",
    line_manager_name: org?.line_manager_name || "n/a",
  }));
};
