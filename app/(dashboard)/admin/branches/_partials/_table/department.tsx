"use client";
import { useDebounce } from "@/app/(dashboard)/_layout/Helper";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import {
  useGetBranchDepartmentQuery,
  useLazyGetBranchesDeptExportQuery,
} from "@/redux/services/checklist/branchApi";
import { downloadFile } from "@/utils/helpers/file-formatter";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const { ADMIN } = routesPath;

export default function DepartmentTable({ isActive }: { isActive: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [search, setSearch] = React.useState<string>("");
  const [page, setPage] = React.useState(1);
  const debounceSearch = useDebounce(search, 500);

  const handleAddDept = () => {
    const path = ADMIN.CREATE_DEPARTMENT;
    router.push(path);
  };

  const {
    data: branchDataDepartment,
    isLoading: isLoadingBranchDepartment,
    isFetching: isFetchingBranchDepartment,
  } = useGetBranchDepartmentQuery(
    {
      id: id as string,
      params: {
        to: 0,
        total: 0,
        per_page: 50,
        currentPage: 0,
        next_page_url: "",
        prev_page_url: "",
        search: debounceSearch || "",
        page: page || 1,
      },
    },
    {
      skip: !id,
    }
  );

  const [getBranchesDeptExport] = useLazyGetBranchesDeptExportQuery();
  const handleExportDownload = async () => {
    toast.loading("downloading...");
    getBranchesDeptExport({ export: true })
      .unwrap()
      .then((payload: any) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "department_information",
            fileExtension: "csv",
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  return isLoadingBranchDepartment ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={["Department", "HOD", "Subsidiary", "Branch", "Action"]}
      addText="New Department"
      loading={isFetchingBranchDepartment}
      newBtnBulk={isActive}
      hideNewBtnOne={!isActive}
      tableBodyList={FORMAT_TABLE_DATA(
        branchDataDepartment?.data?.departments?.data
      )}
      dropDown
      hideFilter
      hideSort
      onSearch={(e) => {
        setSearch(e);
      }}
      perPage={branchDataDepartment?.data?.departments?.meta?.per_page}
      totalPage={branchDataDepartment?.data?.departments?.meta?.total}
      currentPage={branchDataDepartment?.data?.departments?.meta?.current_page}
      onPageChange={(p) => {
        setPage(p);
      }}
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
