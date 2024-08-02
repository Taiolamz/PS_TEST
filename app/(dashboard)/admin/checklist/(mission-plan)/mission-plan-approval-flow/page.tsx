"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useDisclosure from "../../_hooks/useDisclosure";
import { ChecklistLayout } from "../../_components/checklist-layout";
import Routes from "@/lib/routes/routes";
import EmptyState from "../../_components/empty-state";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import CancelModal from "../../_components/cancel-modal";
import ProceedModal from "../../_components/proceed-modal";

const MissionPlanFlow = () => {
  const emptyStateClass = "flex justify-center items-center";
  const router = useRouter();

  const {
    isOpen: openCancelModal,
    open: onOpenCancelModal,
    close: closeCancelModal,
  } = useDisclosure();

  const handleCancelDialog = () => {
    onOpenCancelModal();
    if (openCancelModal) {
      closeCancelModal();
    }
  };

  const {
    isOpen: openProceedModal,
    open: onOpenProceeModal,
    close: closeProceedModal,
  } = useDisclosure();

  const handleProceedCancel = () => {
    const checklistPath = Routes.ChecklistRoute.ApprovalFlowRoute();
    router.push(checklistPath);
  };

  const handleProceedDialog = () => {
    onOpenProceeModal();
    if (openProceedModal) {
      closeProceedModal();
    }
  };

  const handleProceed = () => {
    const proceedPath = Routes.ChecklistRoute.ChecklistOverview();
    router.push(proceedPath);
  };

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Mission Plan Flow"
      step={`Step 2 of 2`}
      className={emptyStateClass}
      btnDisabled
      showBtn
      shouldProceed
      onProceedBtn={handleProceedDialog}
    >
      <EmptyState
        href={`${Routes.ChecklistRoute.AddApprovalFlowRoute()}?ui=approval-flow-step-one`}
        viewText="View"
        textTitle="Mission plan Flow"
        btnTitle="Mission Plan Flow"
        isNotBulkUpload
      />
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
    </ChecklistLayout>
  );
};

export default MissionPlanFlow;
