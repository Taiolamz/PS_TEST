"use client";
import { useDebounce } from "@/app/(dashboard)/_layout/Helper";
import { TableLoader } from "@/components/fragment";
import TableWrapper from "@/components/tables/TableWrapper";
import {
  useGetBranchUnitQuery,
  useLazyGetBranchUnitExportQuery,
} from "@/redux/services/checklist/branchApi";
import { downloadFile } from "@/utils/helpers/file-formatter";
import routesPath from "@/utils/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const { ADMIN } = routesPath;

export default function UnitTable({ isActive }: { isActive: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [search, setSearch] = React.useState<string>("");
  const [page, setPage] = React.useState(1);
  const debounceSearch = useDebounce(search, 500);

  const handleAddUnit = () => {
    const path = ADMIN.CREATE_UNIT;
    router.push(path);
  };

  const [getBranchUnitExport] = useLazyGetBranchUnitExportQuery();

  const handleExportUnit = () => {
    toast.loading("downloading...");
    getBranchUnitExport({ id: id, params: { export: true } })
      .unwrap()
      .then((payload) => {
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "unit_information",
            fileExtension: "csv",
          });
        }
      })
      .catch(() => {})
      .finally(() => toast.dismiss());
  };

  const {
    data: branchDataUnit,
    isLoading: isLoadingBranchUnit,
    isFetching: isFetchingBranchUnit,
  } = useGetBranchUnitQuery(
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

  return isLoadingBranchUnit ? (
    <TableLoader rows={8} columns={8} />
  ) : (
    <TableWrapper
      tableheaderList={["Unit Name", "HOU", "Department", "Branch", "Action"]}
      perPage={branchDataUnit?.data?.units?.meta?.per_page}
      totalPage={branchDataUnit?.data?.units?.meta?.total}
      currentPage={branchDataUnit?.data?.units?.meta?.current_page}
      addText="New Unit"
      newBtnBulk={isActive}
      hideNewBtnOne={!isActive}
      tableBodyList={FORMAT_TABLE_DATA(branchDataUnit?.data?.units?.data)}
      loading={isFetchingBranchUnit}
      onSearch={(e) => setSearch(e)}
      dropDown
      hideFilter
      hideSort
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
      onCsvChange={handleExportUnit}
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
