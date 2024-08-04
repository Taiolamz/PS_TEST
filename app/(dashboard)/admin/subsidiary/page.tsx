"use client";

import React, { useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import { ChecklistLayout } from "./_components/checklist-layout";
import EmptyState from "./_components/empty-state";
import DashboardTable from "./_components/checklist-dashboard-table";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import routesPath from "@/utils/routes";
import {
  useCreateBulkSubsidiariesMutation,
  useGetSubsidiariesQuery,
} from "@/redux/services/checklist/subsidiaryApi";
import { subsidiaryColumns } from "../checklist/(organizational-structure)/subsidiary/subsidiary-column";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/store";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";

const { ADMIN } = routesPath;

const Subsidiary = () => {
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
    const proceedPath = ADMIN.BRANCH;
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

  const handleAddSubsidiary = () => {
    const path = ADMIN.CREATE_SUBSIDIARY;
    router.push(path);
  };

  const {
    data: subsidiariesData,
    isLoading: isLoadingSubsidiaries,
    isFetching: isFetchingSubsidiaries,
  } = useGetSubsidiariesQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const subsidiaries = subsidiariesData ?? [];

  const subsidiariesColumnData = useMemo(
    () => subsidiaryColumns(isFetchingSubsidiaries),
    [isFetchingSubsidiaries]
  );

  const user = useAppSelector(selectUser);
  const { organization } = user;

  const [createBulkSubsidiaries, { isLoading: isCreatingBulkSubsidiaries }] =
    useCreateBulkSubsidiariesMutation();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;

    const payload = {
      organization_id: organization?.id,
      file: bulkFile,
    };
    console.log(payload, "form data");
    await createBulkSubsidiaries(payload)
      .unwrap()
      .then(() => {
        toast.success("Subsidiaries Uploaded Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            handleBulkUploadDialog();
          }, 2000);
        });
      });
  };

  return (
    <DashboardLayout headerTitle="Subsidiary">
      {/* <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Subsidiaries"
      step={`Step 1 of 4`}
      className={subsidiaries?.length < 1 ? emptyStateClass : ""}
      btnDisabled={subsidiaries?.length < 1}
      showBtn
      shouldProceed
      onProceedBtn={handleProceedDialog}
    > */}
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="4"
        title="Subsidiary"
        btnDisabled={subsidiaries?.length < 1}
        // loading={isCreatingSubsidiary}
        onSave={handleProceed}
        onCancel={handleCancelDialog}
        // back
        // hideStep
        // fixed
      />
      <section className="p-5">
        {subsidiaries?.length < 1 ? (
          <ReusableEmptyState
            loading={isLoadingSubsidiaries}
            textTitle="subsidiaries"
            btnTitle="subsidiary"
            href={ADMIN.CREATE_SUBSIDIARY}
            onBulkUpload={handleBulkUploadDialog}
          />
        ) : (
          <DashboardTable
            isLoading={isFetchingSubsidiaries}
            header="Subsidiary"
            data={subsidiaries}
            columns={subsidiariesColumnData}
            onBulkUploadBtn={handleBulkUploadDialog}
            onOpenBtnChange={handleBtnDrop}
            newBtnOpen={openNewBtn}
            onManualBtn={handleAddSubsidiary}
          />
        )}
        <DashboardModal
          className={"w-[420px]"}
          open={openCancelModal}
          onOpenChange={handleCancelDialog}
        >
          <CancelModal
            onProceed={handleProceedCancel}
            modalTitle="Subsidiary"
          />
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
            loading={isCreatingBulkSubsidiaries}
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
      </section>
    </DashboardLayout>
  );
};

export default Subsidiary;
