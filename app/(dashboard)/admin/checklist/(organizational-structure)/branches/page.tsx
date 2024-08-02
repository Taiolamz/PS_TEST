"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useDisclosure from "../../_hooks/useDisclosure";
import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../_components/checklist-layout";
import EmptyState from "../../_components/empty-state";
import DashboardTable from "../../_components/checklist-dashboard-table";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import CancelModal from "../../_components/cancel-modal";
import ProceedModal from "../../_components/proceed-modal";
import BulkUploadModal from "../../_components/bulk-upload-modal";
import BulkRequirementModal from "../../_components/bulk-requrement-modal";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { branchColumns } from "./branch-column";
import {
  useCreateBulkBranchesMutation,
  useGetBranchesQuery,
} from "@/redux/services/checklist/branchApi";

const Branch = () => {
  const emptyStateClass = "flex justify-center items-center";
  const router = useRouter();
  const [bulkFile, setBulkFile] = useState<File | null>(null);

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
    const checklistPath = Routes.ChecklistRoute.ChecklistOverview();
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
    const proceedPath = Routes.ChecklistRoute.DepartmentRoute();
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

  const handleBtnDrop = () => {
    onOpenNewBtnDrop();
    if (openNewBtn) {
      closeNewBtnDrop();
    }
    handleBulkModal();
  };

  const handleAddBranch = () => {
    const path = Routes.ChecklistRoute.AddBranches();
    router.push(path);
  };

  const {
    data: branchesData,
    isLoading: isLoadingBranches,
    isFetching: isFetchingBranches,
  } = useGetBranchesQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const branches = branchesData ?? [];

  const branchesColumnData = useMemo(
    () => branchColumns(isFetchingBranches),
    [isFetchingBranches]
  );

  const user = useAppSelector(selectUser);
  const { organization } = user;

  const [createBulkBranches, { isLoading: isCreatingBulkBranches }] =
    useCreateBulkBranchesMutation();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;
    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("file", bulkFile);
    await createBulkBranches(formData)
      .unwrap()
      .then(() => {
        toast.success("Branches Uploaded Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            handleBulkUploadDialog();
          }, 2000);
        });
      });
  };

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Branches"
      step={`Step 2 of 4`}
      className={branches?.length < 1 ? emptyStateClass : ""}
      btnDisabled={branches?.length < 1}
      showBtn
      shouldProceed
      onProceedBtn={handleProceedDialog}
    >
      {branches?.length < 1 ? (
        <EmptyState
          loading={isLoadingBranches}
          textTitle="Branches"
          btnTitle="branch"
          href={Routes.ChecklistRoute.AddBranches()}
          onBulkUpload={handleBulkUploadDialog}
        />
      ) : (
        <DashboardTable
          isLoading={isFetchingBranches}
          header="Branch"
          data={branches}
          columns={branchesColumnData}
          onBulkUploadBtn={handleBulkUploadDialog}
          onOpenBtnChange={handleBtnDrop}
          newBtnOpen={openNewBtn}
          onManualBtn={handleAddBranch}
        />
      )}
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
        className={"w-[600px] max-w-full"}
        open={openBulkUploadModal}
        onOpenChange={handleBulkUploadDialog}
      >
        <BulkUploadModal
          loading={isCreatingBulkBranches}
          onCancel={handleBulkUploadDialog}
          onSampleCsvDownload={handleBulkRequirementDialog}
          onSampleExcelDownload={handleBulkRequirementDialog}
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
          onTemplateDownload={() => console.log("template download")}
          onCancel={handleBulkRequirementDialog}
        />
      </DashboardModal>
    </ChecklistLayout>
  );
};

export default Branch;
