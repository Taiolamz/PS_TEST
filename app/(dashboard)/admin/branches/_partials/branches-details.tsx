import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import routesPath from "@/utils/routes";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalContainer from "@/components/modal-container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import useDisclosure from "../_hooks/useDisclosure";
import TableWrapper from "@/components/tables/TableWrapper";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import BulkUploadModal from "../_components/bulk-upload-modal";
import ProceedModal from "../_components/proceed-modal";
import BulkRequirementModal from "../_components/bulk-requrement-modal";
import {
  useCreateBulkBranchesMutation,
  useDeleteBranchMutation,
  useGetBranchByIdQuery,
  useGetBranchDepartmentQuery,
  useGetBranchesQuery,
  useGetBranchStaffQuery,
  useGetBranchUnitQuery,
  useLazyDownloadBranchTemplateQuery,
} from "@/redux/services/checklist/branchApi";
import { toast } from "sonner";
import { downloadFile } from "@/utils/helpers/file-formatter";
// import { DepartmentTable, StaffTable, UnitTable } from "./_table";
import { PageLoader } from "@/components/custom-loader";
import { DepartmentTable, UnitTable, StaffTable } from "./_table";
import { useDebounce } from "@/app/(dashboard)/_layout/Helper";

const { ADMIN } = routesPath;

export default function BranchDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [search, setSearch] = React.useState<string>("");
  const [page, setPage] = React.useState(1);
  const id = searchParams.get("id");
  const tab = searchParams.get("tab");

  const debounceSearch = useDebounce(search, 500);

  const [createBulkBranches, { isLoading: isCreatingBulkBranches }] =
    useCreateBulkBranchesMutation();
  const [downloadBranchesTemplate] = useLazyDownloadBranchTemplateQuery();

  const [deleteBranch, { isLoading: isDeletingdeleteBranch }] =
    useDeleteBranchMutation();

  const {
    data: branchesData,
    isLoading: isLoadingBranches,
    isFetching: isFetchingBranches,
    refetch: refetchBranches,
  } = useGetBranchesQuery({
    // to: 0,
    // total: 0,
    per_page: 50,
    currentPage: page,
    search: search,
    // next_page_url: "",
    // prev_page_url: "",
  });

  const {
    data: branchData,
    isLoading: isLoadingBranch,
    isFetching: isFetchingBranch,
    refetch: refetchBranch,
  } = useGetBranchByIdQuery(id, { skip: !id });

  const {
    data: branchDataStaff,
    isLoading: isLoadingBranchStaff,
    isFetching: isFetchingBranchStaff,
  } = useGetBranchStaffQuery(
    {
      id: id as string,
      params: {
        to: 0,
        total: 0,
        per_page: 50,
        currentPage: 0,
        next_page_url: "",
        prev_page_url: "",
        search: tab === "staffs" ? debounceSearch : "",
        page: tab === "staffs" ? page : 1,
      },
    },
    {
      skip: !id,
    }
  );

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
        search: tab === "departments" ? debounceSearch : "",
        page: tab === "departments" ? page : 1,
      },
    },
    {
      skip: !id,
    }
  );

  const {
    data: branchDataUnit,
    isLoading: isLoadingBranchUnit,
    isFetching: isFetchingBranchUnit,
  } = useGetBranchUnitQuery(
    {
      id: id as string,
      params: {
        to: 0,
        total: 0,
        per_page: 50,
        currentPage: 0,
        next_page_url: "",
        prev_page_url: "",
        search: tab === "units" ? debounceSearch : "",
        page: tab === "units" ? page : 1,
      },
    },
    {
      skip: !id,
    }
  );

  const branches = branchesData ?? [];
  const branchInfo = branchData?.data?.branch ?? [];

  const { organization } = user;

  const listToTest = [
    {
      active: tab === "departments",
      title: "Total Departments",
      type: "department",
      count: branchInfo?.departments_count,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "department"
      ),
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.BRANCH_DETAILS({ id: id, tab: "departments" }));
      },
      pending: false,
      primaryColor: "",
    },
    {
      active: tab === "units",
      title: "Total Units",
      type: "unit",
      count: branchInfo?.units_count,
      accentColor: "",
      hide: !processInputAsArray(user?.organization?.hierarchy)?.includes(
        "unit"
      ),
      icon: "",
      onClick: () => {
        id && router.replace(ADMIN.BRANCH_DETAILS({ id: id, tab: "units" }));
      },
      pending: false,
      primaryColor: "",
    },
    {
      active: tab === "staffs",
      title: "Total Staffs",
      type: "staff",
      count: branchInfo?.staff_members_count,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {
        id && router.replace(ADMIN.BRANCH_DETAILS({ id: id, tab: "staffs" }));
      },
      pending: false,
      primaryColor: "",
    },
  ];

  const {
    isOpen: openProceedModal,
    open: onOpenProceeModal,
    close: closeProceedModal,
  } = useDisclosure();

  const {
    isOpen: openCancelModal,
    open: onOpenCancelModal,
    close: closeCancelModal,
  } = useDisclosure();

  const {
    isOpen: openBulkUploadModal,
    open: onOpenBulkUploadModal,
    close: closeBulkUploadModal,
  } = useDisclosure();

  const {
    isOpen: openBulkRequirementModal,
    open: onOpenBulkRequirementModal,
    close: closeBulkRequirementModal,
  } = useDisclosure();

  const {
    isOpen: openNewBtn,
    open: onOpenNewBtnDrop,
    close: closeNewBtnDrop,
  } = useDisclosure();

  const handleProceedCancel = () => {
    const checklistPath = ADMIN.CHECKLIST;
    router.push(checklistPath);
  };

  const handleProceedDialog = () => {
    onOpenProceeModal();
    if (openProceedModal) {
      closeProceedModal();
    }
  };

  const handleCancelDialog = () => {
    onOpenCancelModal();
    if (openCancelModal) {
      closeCancelModal();
    }
  };

  const handleBulkRequirementDialog = () => {
    onOpenBulkRequirementModal();
    closeBulkUploadModal();
    if (openBulkRequirementModal) {
      onOpenBulkUploadModal();
      closeBulkRequirementModal();
    }
  };

  const handleProceed = () => {
    const proceedPath = ADMIN.EMPLOYEES;
    router.push(proceedPath);
  };

  const handleBulkUploadDialog = () => {
    onOpenBulkUploadModal();
    if (openBulkUploadModal) {
      closeBulkUploadModal();
    }
  };

  const handleBulkModal = () => {
    if (openBulkUploadModal) {
      onOpenNewBtnDrop();
    }
  };

  const handleDeleteBranch = async () => {
    await deleteBranch(id);
    setModal(false);
    router?.back();
  };

  const handleBtnDrop = () => {
    onOpenNewBtnDrop();
    if (openNewBtn) {
      closeNewBtnDrop();
    }
    handleBulkModal();
  };

  const handleAddStaff = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };
  const handleTemplateDownload = async (file: string) => {
    toast.loading("downloading...");
    downloadBranchesTemplate(file)
      .unwrap()
      .then((payload: any) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "branch_template",
            fileExtension: fileType,
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;

    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("file", bulkFile);
    await createBulkBranches(formData)
      .unwrap()
      .then(() => {
        toast.success("Branches Uploaded Successfully");
        handleBulkUploadDialog();
        refetchBranches();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  return (
    <DashboardLayout back headerTitle={branchInfo?.name || "N/A"}>
      {isLoadingBranch ? (
        <div className="h-full flex items-center justify-center">
          <PageLoader />
        </div>
      ) : (
        <section className="p-5">
          <div className="flex justify-between mb-10">
            <div className="">
              <h3 className="text-2xl font-medium text-[var(--text-color3)]">
                {branchInfo?.name}
              </h3>

              <div className="inline-flex gap-x-[80px] text-[var(--text-color)] text-xs mt-5">
                <span className="space-y-3">
                  <h4>
                    Head of Branch:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.head?.name || "n/a"}
                    </span>
                  </h4>
                  <h4>
                    Branch Email:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.branch_email || "n/a"}
                    </span>
                  </h4>
                  <h4>
                    Head of Branch Email:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.work_email || "n/a"}
                    </span>
                  </h4>
                </span>
                <span className="space-y-3">
                  <h4>
                    Address:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.address || "n/a"}
                    </span>
                  </h4>
                  <h4>
                    State:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.state || "n/a"}
                    </span>
                  </h4>
                  <h4>
                    Country:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.country || "n/a"}
                    </span>
                  </h4>
                </span>
              </div>
            </div>
            <div className="inline-flex justify-end gap-x-3">
              <Link href={ADMIN.EDIT_BRANCHES(id ?? "")}>
                <Button
                  variant="outline"
                  className="rounded border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-white"
                  size="sm"
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModal(true)}
                className="rounded border-[var(--bg-red-100)] text-[var(--bg-red-100)] hover:text-[var(--bg-red-100)] hover:bg-white"
              >
                Deactivate
              </Button>
            </div>
          </div>{" "}
          <div className="block mb-9">
            <ParentModuleCard list={listToTest} />
          </div>
          <section className="">
            {tab === "departments" && (
              <DepartmentTable
                onSearch={(e) => {
                  setSearch(e);
                  setPage(1);
                }}
                isLoading={isLoadingBranchDepartment}
                perPage={
                  branchDataDepartment?.data?.departments?.meta?.per_page
                }
                totalPage={branchDataDepartment?.data?.departments?.meta?.total}
                currentPage={
                  branchDataDepartment?.data?.departments?.meta?.current_page
                }
                isFetching={isFetchingBranchUnit}
                tableData={branchDataDepartment?.data?.departments?.data}
              />
            )}
            {tab === "units" && (
              <UnitTable
                onSearch={(e) => {
                  setSearch(e);
                  setPage(1);
                }}
                isLoading={isLoadingBranchUnit}
                perPage={branchDataUnit?.data?.units?.meta?.per_page}
                totalPage={branchDataUnit?.data?.units?.meta?.total}
                currentPage={branchDataUnit?.data?.units?.meta?.current_page}
                isFetching={isFetchingBranchUnit}
                tableData={branchDataUnit?.data?.units?.data}
              />
            )}
            {tab === "staffs" && (
              <StaffTable
                onSearch={(e) => {
                  setSearch(e);
                  setPage(1);
                }}
                isLoading={isLoadingBranchStaff}
                perPage={branchDataStaff?.data?.staffs?.meta?.per_page}
                totalPage={branchDataStaff?.data?.staffs?.meta?.total}
                currentPage={branchDataStaff?.data?.staffs?.meta?.current_page}
                isFetching={isFetchingBranchUnit}
                tableData={branchDataStaff?.data?.staffs?.data}
              />
            )}
          </section>
        </section>
      )}
      <ModalContainer
        show={modal}
        handleClose={() => setModal(false)}
        modalClass="h-[220px] !w-[540px] rounded "
        title="Close Subsidairy"
      >
        <div className="absolute top-0 text-right">
          <div className="  w-full p-4 px-6 ">
            <div className="flex justify-between items-center mt-3 mb-[18px]">
              <h4 className="text-[var(--bg-red-100)]">Deactivate Branch</h4>
              <X
                className="size-[18px] cursor-pointer"
                onClick={() => setModal(false)}
              />
            </div>
            <p className="text-[var(--text-color4)] text-sm text-left">
              You’re about to deactivate this branch. the staffs under this
              branch would be inaccessible, Do you still want to deactivate?
            </p>
            <Button
              loading={isDeletingdeleteBranch}
              loadingText="Deactivating"
              disabled={isDeletingdeleteBranch}
              onClick={handleDeleteBranch}
              className={cn("font-light bg-[var(--bg-red-100)] mt-5 ")}
            >
              Yes, Deactivate
            </Button>
          </div>
        </div>
      </ModalContainer>

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Branch" />
      </DashboardModal>

      <DashboardModal
        open={openProceedModal}
        onOpenChange={handleProceedDialog}
      >
        <ProceedModal onProceed={handleProceed} />
      </DashboardModal>

      <DashboardModal
        className={`max-w-max`}
        open={openBulkUploadModal}
        onOpenChange={handleBulkUploadDialog}
      >
        <BulkUploadModal
          loading={isCreatingBulkBranches}
          onCancel={handleBulkUploadDialog}
          onSampleCsvDownload={() => {
            handleBulkRequirementDialog();
            setFileType("csv");
          }}
          onSampleExcelDownload={() => {
            handleBulkRequirementDialog();
            setFileType("xlsx");
          }}
          onBulkUpload={handleSubmitBulkUpload}
          setFile={setBulkFile}
        />
      </DashboardModal>

      <DashboardModal
        className={"w-[600px] max-w-full"}
        open={openBulkRequirementModal}
        onOpenChange={handleBulkRequirementDialog}
      >
        <BulkRequirementModal
          onTemplateDownload={() => handleTemplateDownload(fileType)}
          onCancel={handleBulkRequirementDialog}
        />
      </DashboardModal>
    </DashboardLayout>
  );
}
