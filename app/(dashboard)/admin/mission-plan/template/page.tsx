"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useDisclosure from "./_hooks/useDisclosure";
import routesPath from "@/utils/routes";
import { useGetMissionPlanTemplatesQuery } from "@/redux/services/checklist/missionPlanTemplateApi";
import { missionPlanColumn } from "./level/_component/mission-plan-template-column";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import DashboardTable from "./_components/checklist-dashboard-table";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import MissionPlanTemplateModal from "./level/_component/mission-plan-template-modal";

const { ADMIN } = routesPath;

const MissionPlanTemplate = () => {
  const router = useRouter();

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
    isOpen: openNewBtn,
    open: onOpenNewBtnDrop,
    close: closeNewBtnDrop,
  } = useDisclosure();

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

  const handleSelectedRoute = () => {
    const path = ADMIN.CREATE_MISSION_PLAN_TEMPLATE;
    router.push(path);
  };

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

  const handleProceed = () => {
    const path = ADMIN.MISSION_PLAN_APPROVAL_FLOW;
    router.push(path);
  };

  const handleBtnDrop = () => {
    onOpenNewBtnDrop();
    if (openNewBtn) {
      closeNewBtnDrop();
    }
  };

  const handleAddMissionPlanTemplate = () => {
    const path = ADMIN.MISSION_PLAN_TEMPLATE_LEVEL;
    router.push(path);
  };

  const {
    data: missionPlanTemplateData,
    isLoading: isLoadingmissionPlanTemplates,
    isFetching: isFetchingmissionPlanTemplates,
  } = useGetMissionPlanTemplatesQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const missionPlanTemplates = missionPlanTemplateData ?? [];

  const missionPlanTemplatesColumnData = useMemo(
    () => missionPlanColumn,
    [isFetchingmissionPlanTemplates]
  );

  return (
    <DashboardLayout headerTitle="Mission Plan Template">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="2"
        title="Mission Plan Template"
        btnDisabled={missionPlanTemplates?.length < 1}
        onSave={handleProceed}
        onCancel={handleCancelDialog}
      />
      <section className="p-5">
        {missionPlanTemplates?.length < 1 ? (
          <ReusableEmptyState
            loading={isLoadingmissionPlanTemplates}
            textTitle="Mission plan template"
            btnTitle="Mission Plan Template"
            href={ADMIN.CREATE_MISSION_PLAN_TEMPLATE}
            isNotBulkUpload
          />
        ) : (
          <DashboardTable
            isLoading={isFetchingmissionPlanTemplates}
            header="Mission Plan Template"
            data={missionPlanTemplates}
            columns={missionPlanTemplatesColumnData}
            onOpenBtnChange={handleBtnDrop}
            newBtnOpen={openNewBtn}
            dntShowExportDrop
            dntShowNewBtn
            isMissionBtn
            onCreateNewBtn={handleAddMissionPlanTemplate}
            onSelectTemplateBtn={handleMissionDialog}
          />
        )}

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

        <DashboardModal
          open={openProceedModal}
          onOpenChange={handleProceedDialog}
        >
          <ProceedModal onProceed={handleProceed} />
        </DashboardModal>

        <DashboardModal
          className="min-w-[900px] bg-modal-bg-100"
          open={openMissionModal}
          onOpenChange={handleMissionDialog}
        >
          <MissionPlanTemplateModal onSelect={handleSelectedRoute} />
        </DashboardModal>
      </section>
    </DashboardLayout>
  );
};

export default MissionPlanTemplate;
