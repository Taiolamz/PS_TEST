"use client";

import Routes from "@/lib/routes/routes";
import { useRouter } from "next/navigation";
import React from "react";
import useDisclosure from "../_hooks/useDisclosure";
import MissionPlanLevel from "./_component/mission-plan-level";
import DashboardModal from "../_components/checklist-dashboard-modal";
import MissionPlanTemplateModal from "./_component/mission-plan-template-modal";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import CancelModal from "../_components/cancel-modal";
import routesPath from "@/utils/routes";

const { ADMIN } = routesPath;

const MissionPlanTemplateLevel = () => {
  const router = useRouter();
  const handleSelectedRoute = () => {
    const path = ADMIN.CREATE_MISSION_PLAN_TEMPLATE;
    router.push(path);
  };
  const {
    isOpen: openMissionModal,
    open: onOpenMissionModal,
    close: closeMissionModal,
  } = useDisclosure();

  const {
    isOpen: openCancelModal,
    open: onOpenCancelModal,
    close: closeCancelModal,
  } = useDisclosure();

  const handleProceedCancel = () => {
    const checklistPath = ADMIN.CHECKLIST;
    router.push(checklistPath);
  };

  const handleMissionDialog = () => {
    onOpenMissionModal();
    if (openMissionModal) {
      closeMissionModal();
    }
  };

  const handleCancelDialog = () => {
    onOpenCancelModal();
    if (openCancelModal) {
      closeCancelModal();
    }
  };

  return (
    <DashboardLayout headerTitle="Mission Plan Template">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="2"
        title="Branch"
        btnDisabled
        // onSave={handleProceed}
        onCancel={handleCancelDialog}
      />
      <MissionPlanLevel handleClick={handleMissionDialog} />

      <DashboardModal
        className="min-w-[900px] bg-modal-bg-100"
        open={openMissionModal}
        onOpenChange={handleMissionDialog}
      >
        <MissionPlanTemplateModal onSelect={handleSelectedRoute} />
      </DashboardModal>

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal
          onProceed={handleProceedCancel}
          modalTitle="Mission Plan Template"
        />
      </DashboardModal>
    </DashboardLayout>
  );
};

export default MissionPlanTemplateLevel;
