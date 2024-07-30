"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useDisclosure from "../../_hooks/useDisclosure";
import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../_components/checklist-layout";
import EmptyState from "../../_components/empty-state";
import DashboardTable from "../../_components/checklist-dashboard-table";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import CancelModal from "../../_components/cancel-modal";
import ProceedModal from "../../_components/proceed-modal";
import { useGetMissionPlanTemplatesQuery } from "@/redux/services/checklist/missionPlanTemplateApi";
import { missionPlanColumn } from "./mission-plan-template-column";

const MissionPlanTemplate = () => {
  const emptyStateClass = "flex justify-center items-center";
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

  const handleProceed = () => {
    const proceedPath = Routes.ChecklistRoute.ApprovalFlowRoute();
    router.push(proceedPath);
  };

  const handleBtnDrop = () => {
    onOpenNewBtnDrop();
    if (openNewBtn) {
      closeNewBtnDrop();
    }
  };

  const handleAddMissionPlanTemplate = () => {
    const path = Routes.ChecklistRoute.AddMissionPlanTemplateRoute();
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

  const handleCreateTemplate = () => {
    const path = Routes.ChecklistRoute.MissionPlanTemplateLevelRoute();
    router.push(path);
  };
  //   const missionPlanTemplatesColumnData = useMemo(
  //     () => missionPlanColumn(isFetchingmissionPlanTemplates),
  //     [isFetchingmissionPlanTemplates]
  //   );

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Mission Plan Template"
      step={`Step 1 of 2`}
      className={missionPlanTemplates?.length < 1 ? emptyStateClass : ""}
      btnDisabled={missionPlanTemplates?.length < 1}
      showBtn
      shouldProceed
      onProceedBtn={handleProceedDialog}
    >
      {missionPlanTemplates?.length < 1 ? (
        <EmptyState
          loading={isLoadingmissionPlanTemplates}
          textTitle="Mission plan template"
          btnTitle="Mission Plan Template"
          href={Routes.ChecklistRoute.MissionPlanTemplateLevelRoute()}
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
          onSelectTemplateBtn={handleCreateTemplate}
        />
      )}

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal onProceed={handleProceedCancel} modalTitle="Department" />
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

export default MissionPlanTemplate;
