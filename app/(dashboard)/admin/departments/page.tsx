"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import DashboardModal from "./_components/checklist-dashboard-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import ProceedModal from "./_components/proceed-modal";
import CancelModal from "./_components/cancel-modal";
import DashboardTable from "./_components/checklist-dashboard-table";
import EmptyState from "./_components/empty-state";
import { ChecklistLayout } from "./_components/checklist-layout";
import { toast } from "sonner";
import {
  useCreateBulkDepartmentsMutation,
  useGetDepartmentsQuery,
} from "@/redux/services/checklist/departmentApi";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { departmentColumns } from "./department-column";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";

const { ADMIN } = routesPath;

const Departments = () => {
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
    const proceedPath = ADMIN.UNIT;
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

  const handleAddDeparment = () => {
    const path = ADMIN.CREATE_DEPARTMENT;
    router.push(path);
  };

  const {
    data: departmentData,
    isLoading: isLoadingDepartments,
    isFetching: isFetchingDepartments,
  } = useGetDepartmentsQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const departments = departmentData ?? [];

  const departmentsColumnData = useMemo(
    () => departmentColumns(isFetchingDepartments),
    [isFetchingDepartments]
  );

  const user = useAppSelector(selectUser);
  const { organization } = user;

  const [createBulkDepartments, { isLoading: isCreatingBulkDepartments }] =
    useCreateBulkDepartmentsMutation();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;

    const payload = {
      organization_id: organization?.id,
      file: bulkFile,
      state_id: "lagos",
      branch_id: "kili",
    };
    console.log(payload, "form data");
    await createBulkDepartments(payload)
      .unwrap()
      .then(() => {
        toast.success("Departments Uploaded Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
            handleBulkUploadDialog();
          }, 2000);
        });
      });
  };

  return (
    <DashboardLayout headerTitle="Department">
      {/* <ChecklistLayout
        onCancel={handleCancelDialog}
        title="Departments"
        step={`Step 3 of 4`}
        className={departments?.length < 1 ? emptyStateClass : ""}
        btnDisabled={departments?.length < 1}
        showBtn
        shouldProceed
        onProceedBtn={handleProceedDialog}
      > */}
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="4"
        title="Department"
        btnDisabled={departments?.length < 1}
        // loading={isCreatingSubsidiary}
        onSave={handleProceed}
        onCancel={handleCancelDialog}
        // back
        // hideStep
        // fixed
      />
      <section className="p-5">
        {departments?.length < 1 ? (
          <ReusableEmptyState
            loading={isLoadingDepartments}
            textTitle="Departments"
            btnTitle="department"
            href={ADMIN.CREATE_DEPARTMENT}
            onBulkUpload={handleBulkUploadDialog}
          />
        ) : (
          <DashboardTable
            isLoading={isFetchingDepartments}
            header="Department"
            data={departments}
            columns={departmentsColumnData}
            onBulkUploadBtn={handleBulkUploadDialog}
            onOpenBtnChange={handleBtnDrop}
            newBtnOpen={openNewBtn}
            onManualBtn={handleAddDeparment}
          />
        )}
        <DashboardModal
          className={"w-[420px]"}
          open={openCancelModal}
          onOpenChange={handleCancelDialog}
        >
          <CancelModal
            onProceed={handleProceedCancel}
            modalTitle="Department"
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
            loading={isCreatingBulkDepartments}
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
        {/* </ChecklistLayout> */}
      </section>
    </DashboardLayout>
  );
};

export default Departments;