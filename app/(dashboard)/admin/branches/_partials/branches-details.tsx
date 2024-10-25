import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import routesPath from "@/utils/routes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ModalContainer from "@/components/modal-container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import useDisclosure from "../_hooks/useDisclosure";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import BulkUploadModal from "../_components/bulk-upload-modal";
import ProceedModal from "../_components/proceed-modal";
import BulkRequirementModal from "../_components/bulk-requrement-modal";
import {
  useCreateBulkBranchesMutation,
  useDeleteBranchMutation,
  useGetBranchByIdQuery,
  useLazyDownloadBranchTemplateQuery,
  useReopenBranchMutation,
} from "@/redux/services/checklist/branchApi";
import { toast } from "sonner";
import { downloadFile } from "@/utils/helpers/file-formatter";
import { DepartmentTable, UnitTable, StaffTable } from "./_table";
import { useDebounce } from "@/app/(dashboard)/_layout/Helper";
import { Skeleton } from "@/components/ui/skeleton";

const { ADMIN } = routesPath;

export default function BranchDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modal, setModal] = React.useState(false);
  const [reopen, setReopen] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const id = searchParams.get("id");
  const tab = searchParams.get("tab");

  // Reopen Subsidiary
  const [reopenBranch, { data: reopenData, isLoading: isReopening }] =
    useReopenBranchMutation();

  // Bulk upload
  const [createBulkBranches, { isLoading: isCreatingBulkBranches }] =
    useCreateBulkBranchesMutation();

  //Download branch template
  const [downloadBranchesTemplate] = useLazyDownloadBranchTemplateQuery();

  // Delete Branch
  const [
    deleteBranch,
    { data: clooseBranchData, isLoading: isDeletingdeleteBranch },
  ] = useDeleteBranchMutation();

  // branch details
  const { data: branchData, isLoading: isLoadingBranch } =
    useGetBranchByIdQuery(id, { skip: !id });

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
      pending: isLoadingBranch,
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
      pending: isLoadingBranch,
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
      pending: isLoadingBranch,
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

  // const {
  //   isOpen: openNewBtn,
  //   open: onOpenNewBtnDrop,
  //   close: closeNewBtnDrop,
  // } = useDisclosure();

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

  // const handleBulkModal = () => {
  //   if (openBulkUploadModal) {
  //     onOpenNewBtnDrop();
  //   }
  // };

  const handleDeleteBranch = () => {
    deleteBranch(id)
      .unwrap()
      .then(() => {
        toast.success(
          clooseBranchData?.data?.message ??
            clooseBranchData?.data.message ??
            "Branch successfully closed."
        );
        setModal(false);
      })
      .catch((err) => {
        // toast.error(err?.data.message || "Unable to handle your request.");
      });
  };

  // const handleBtnDrop = () => {
  //   onOpenNewBtnDrop();
  //   if (openNewBtn) {
  //     closeNewBtnDrop();
  //   }
  //   handleBulkModal();
  // };

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
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  // Handle reopen branch
  const handleReopen = () => {
    reopenBranch(id || "")
      .unwrap()
      .then(() => {
        setReopen(false);
        toast.success(
          reopenData?.data?.message ??
            reopenData?.data?.data?.message ??
            "Branch successfully reopened."
        );
      })
      .catch(() => {});
  };
  return (
    <DashboardLayout back headerTitle={"Branches"}>
      <section className="p-5">
        {/* Details */}
        {isLoadingBranch ? (
          <div className="flex max-lg:flex-col-reverse justify-between mb-10">
            <div className="w-full">
              <span className="flex items-center gap-8">
                <Skeleton className=" h-[18px] w-[138px] rounded-sm bg-[var(--primary-accent-color)]" />
              </span>
              <div className="grid lg:grid-cols-2 gap-4 w-full text-[var(--text-color)] text-xs mt-5">
                <span className="space-y-3">
                  <Skeleton className=" h-[16px] w-[270px] rounded-sm bg-[var(--primary-accent-color)]" />
                  <Skeleton className=" h-[16px] w-[270px] rounded-sm bg-[var(--primary-accent-color)]" />
                  <Skeleton className=" h-[16px] w-[270px] rounded-sm bg-[var(--primary-accent-color)]" />
                </span>
                <span className="space-y-3">
                  <Skeleton className=" h-[16px] w-[270px] rounded-sm bg-[var(--primary-accent-color)]" />
                  <Skeleton className=" h-[16px] w-[270px] rounded-sm bg-[var(--primary-accent-color)]" />
                  <Skeleton className=" h-[16px] w-[270px] rounded-sm bg-[var(--primary-accent-color)]" />
                </span>
              </div>
            </div>
            <div className="inline-flex justify-end gap-x-3">
              <>
                <Skeleton className=" h-[36px] w-[110px] rounded-sm bg-[var(--primary-accent-color)]" />
                <Skeleton className=" h-[36px] w-[110px] rounded-sm bg-[var(--primary-accent-color)]" />
              </>
            </div>
          </div>
        ) : (
          <div className="flex max-lg:flex-col-reverse justify-between mb-10">
            <div className="w-full">
              <h3 className="text-2xl font-medium text-[var(--text-color3)]">
                {branchInfo?.name}
              </h3>

              <div className="grid lg:grid-cols-2 gap-4 w-full text-[var(--text-color)] text-xs mt-5">
                <span className="space-y-3">
                  <h4>
                    Head of Branch:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.head?.name || "--- ---"}
                    </span>
                  </h4>
                  <h4>
                    Branch Email:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.branch_email || "--- ---"}
                    </span>
                  </h4>
                  <h4>
                    Head of Branch Email:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.work_email || "--- ---"}
                    </span>
                  </h4>
                </span>
                <span className="space-y-3">
                  <h4>
                    Address:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.address || "--- ---"}
                    </span>
                  </h4>
                  <h4>
                    State:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.state || "--- ---"}
                    </span>
                  </h4>
                  <h4>
                    Country:{" "}
                    <span className="text-[var(--text-color4)] font-medium ml-2">
                      {branchInfo?.country || "--- ---"}
                    </span>
                  </h4>
                </span>
              </div>
            </div>
            <div className="inline-flex justify-end gap-x-3">
              {branchInfo?.status.toLowerCase() === "active" ? (
                <>
                  <Link href={ADMIN.EDIT_BRANCHES(id ?? "")}>
                    <Button
                      variant="outline"
                      className="rounded border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-white"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setModal(true)}
                    className="rounded border-[var(--bg-red-100)] text-[var(--bg-red-100)] hover:text-[var(--bg-red-100)] hover:bg-white"
                  >
                    Deactivate
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setReopen(true)}
                  className="rounded border-[rgb(var(--bg-green-100))] text-[rgb(var(--bg-green-100))] hover:text-[rgb(var(--bg-green-100))] hover:bg-white"
                >
                  Activate
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="block mb-9">
          <ParentModuleCard list={listToTest} />
        </div>
        <section className="">
          {tab === "departments" && (
            <DepartmentTable
              isActive={branchInfo?.status?.toLowerCase() === "active"}
            />
          )}
          {tab === "units" && (
            <UnitTable
              isActive={branchInfo?.status?.toLowerCase() === "active"}
            />
          )}
          {tab === "staffs" && (
            <StaffTable
              isActive={branchInfo?.status?.toLowerCase() === "active"}
            />
          )}
        </section>
      </section>
      {/* Close Branch */}
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

      {/* Reopen Branch */}
      <ModalContainer
        show={reopen}
        handleClose={() => setReopen(false)}
        modalClass="h-[190px] !w-[540px] rounded "
        title="Reopen Subsidairy"
      >
        <div className="w-full absolute top-0 text-right">
          <div className="  w-full p-4 px-6 ">
            <div className="flex justify-between items-center w-full mt-3 mb-5">
              <h4 className="text-[rgb(var(--bg-green-100))]">
                Reactivate Branch
              </h4>
              <button disabled={isReopening} onClick={() => setReopen(false)}>
                <X className="size-[18px] cursor-pointer" />
              </button>
            </div>
            <p className="text-[var(--text-color4)] text-sm text-left">
              You’re about to activate this Branch. Continue to proceed.
            </p>
            <div className="space-x-3 pt-6 inline-flex items-center">
              <Button
                variant={"outline"}
                disabled={isReopening}
                className={cn(
                  "font-light border-[rgb(var(--bg-green-100))] hover:text-[rgb(var(--bg-green-100))] text-[rgb(var(--bg-green-100))] hover:bg-white rounded"
                )}
                onClick={() => setReopen(false)}
              >
                Cancel
              </Button>
              <Button
                loading={isReopening}
                loadingText="Activating"
                disabled={isReopening}
                className={cn(
                  "font-light bg-[rgb(var(--bg-green-100))] rounded"
                )}
                onClick={handleReopen}
              >
                Activate
              </Button>
            </div>
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
