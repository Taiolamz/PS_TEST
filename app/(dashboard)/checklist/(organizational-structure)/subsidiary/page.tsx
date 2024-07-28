"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
// import { ChecklistLayout } from "@/components/checklist/layout";
// import {
//   BulkUploadModal,
//   CancelModal,
//   DashboardModal,
//   EmptyState,
//   ProceedModal,
// } from "@/components/dashboard/pages";
// import BulkRequirementModal from "@/components/dashboard/pages/BulkRequirementModal";
// import DashboardTable from "@/components/dashboard/pages/DashboardTable";
// import { useSubsidiaryService } from "@/hooks/api";

// import useDisclosure from "@/hooks/useDisclosure";
// import { useUserStore } from "@/providers/user-store-provider";
// import { Routes } from "@/utilities";
// import {
//   subsidiaryColumns,
//   subsidiaryData,
// } from "@/utilities/dummy-data/subsidiary";
// import { useRouter } from "next/navigation";

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
    const proceedPath = Routes.ChecklistRoute.BranchesRoute();
    router.push(proceedPath);
  };

  const handleBulkUploadDialog = () => {
    onOpenBulkUploadModal();
    if (openBulkUploadModal) {
      closeBulkUploadModal();
    }
  };

  // const user = useUserStore((state) => state.user);
  // const { organization } = user?.user;
  // const { subsidiariesBulkUpload, subsidiariesData, loading, isLoading } =
  //   useSubsidiaryService();
  // const tableData = subsidiariesData?.data;
  // console.log(tableData, "table data");
  // const hanleSubmitBulkUpload = () => {
  //   if (!bulkFile) return;
  //   const formData = new FormData();
  //   formData.append("upload_file", bulkFile);
  //   formData.append("organization_id", organization?.id);
  //   console.log(formData, "obj");
  //   subsidiariesBulkUpload(formData as any);
  // };

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
    const path = Routes.ChecklistRoute.AddSubsidiary();
    router.push(path);
  };

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Subsidiaries"
      step={`Step 1 of 4`}
      // className={tableData?.length > 0 ? emptyStateClass : ""}
      btnDisabled
      showBtn
      // shouldProceed={tableData?.data?.length > 0}
      onProceedBtn={handleProceedDialog}
    >
      {/* {tableData?.data?.length < 1 ? ( */}
      <EmptyState
        textTitle="subsidiaries"
        btnTitle="subsidiary"
        href={Routes.ChecklistRoute.AddSubsidiary()}
        onBulkUpload={handleBulkUploadDialog}
      />
      {/* ) : ( */}
      {/* <DashboardTable
        isLoading={false}
        header="Subsidiary"
        data={[]}
        columns={"subsidiaryColumns"}
        // isLoading={isLoading}
        // header="Subsidiary"
        // data={tableData?.data?.length > 0 ? tableData?.data : []}
        // columns={subsidiaryColumns}
        onBulkUploadBtn={handleBulkUploadDialog}
        onOpenBtnChange={handleBtnDrop}
        newBtnOpen={openNewBtn}
        onManualBtn={handleAddSubsidiary}
      /> */}
      {/* )} */}
      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Subsidiary" />
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
          loading={false}
          onCancel={handleBulkUploadDialog}
          onSampleCsvDownload={handleBulkRequirementDialog}
          onSampleExcelDownload={handleBulkRequirementDialog}
          onBulkUpload={() => {}}
          // onBulkUpload={hanleSubmitBulkUpload}
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

export default Subsidiary;
