"use client";

import Routes from "@/lib/routes/routes";
import { useRouter } from "next/navigation";
import React from "react";
import useDisclosure from "../../../_hooks/useDisclosure";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import MissionPlanLevel from "./mission-plan-level";
import DashboardModal from "../../../_components/checklist-dashboard-modal";
import MissionPlanTemplateModal from "./mission-plan-template-modal";

const MissionPlanTemplateLevel = () => {
  const route = useRouter();
  const handleRoute = () => {
    const path = Routes.ChecklistRoute.AddMissionPlanTemplateRoute();
    route.push(path);
  };
  const {
    isOpen: openMissionModal,
    open: onOpenMissionModal,
    close: closeMissionModal,
  } = useDisclosure();

  const handleMissionDialog = () => {
    onOpenMissionModal();
    if (openMissionModal) {
      closeMissionModal();
    }
  };

  return (
    <ChecklistLayout
      title="Mission Plan Template"
      step={`Step 1 of 2`}
      btnDisabled
      showBtn
    >
      <MissionPlanLevel handleClick={handleMissionDialog} />

      <DashboardModal
        className="min-w-[900px] bg-modal-bg-100"
        open={openMissionModal}
        onOpenChange={handleMissionDialog}
      >
        <MissionPlanTemplateModal onSelect={handleRoute} />
      </DashboardModal>
    </ChecklistLayout>
  );
};

export default MissionPlanTemplateLevel;
