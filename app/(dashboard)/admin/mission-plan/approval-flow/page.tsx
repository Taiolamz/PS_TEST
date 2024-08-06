"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useDisclosure from "../template/_hooks/useDisclosure";
// import { ChecklistLayout } from "../template/_components/checklist-layout";
import Routes from "@/lib/routes/routes";

import DashboardModal from "../template/_components/checklist-dashboard-modal";
import CancelModal from "../template/_components/cancel-modal";
import ProceedModal from "../template/_components/proceed-modal";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import routesPath from "@/utils/routes";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";

const { ADMIN } = routesPath;

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
    <DashboardLayout headerTitle="Mission Plan Flow">
      {/* <ChecklistLayout
        onCancel={handleCancelDialog}
        title="Mission Plan Flow"
        step={`Step 2 of 2`}
        className={emptyStateClass}
        btnDisabled
        showBtn
        shouldProceed
        onProceedBtn={handleProceedDialog}
      > */}
      <ReusableStepListBox
        btnText="Continue"
        activeStep="2"
        totalStep="2"
        title="Mission Plan Flow"
        btnDisabled
        // onSave={handleProceed}
        onCancel={handleCancelDialog}
      />
      <ReusableEmptyState
        href={`${ADMIN.CREATE_MISSION_PLAN_APPROVAL_FLOW}?ui=approval-flow-step-two`}
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
        <CancelModal
          onProceed={handleProceedCancel}
          modalTitle="Mission Plan Flow"
        />
      </DashboardModal>

      <DashboardModal
        open={openProceedModal}
        onOpenChange={handleProceedDialog}
      >
        <ProceedModal onProceed={handleProceed} />
      </DashboardModal>
      {/* </ChecklistLayout> */}
    </DashboardLayout>
  );
};

export default MissionPlanFlow;
