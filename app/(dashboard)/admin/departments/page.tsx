/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import DashboardModal from "./_components/checklist-dashboard-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import ProceedModal from "./_components/proceed-modal";
import CancelModal from "./_components/cancel-modal";
import DashboardTable from "./_components/checklist-dashboard-table";
import { toast } from "sonner";
import {
  useCreateBulkDepartmentsMutation,
  useGetDepartmentsQuery,
  useLazyDownloadDepartmentTemplateQuery,
} from "@/redux/services/checklist/departmentApi";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import {
  // departmentColumns,
  useDepartmentColumnData,
} from "./department-column";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { downloadFile } from "@/utils/helpers/file-formatter";

const { ADMIN } = routesPath;

const Departments = () => {
  const router = useRouter();
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");

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
    refetch: refetchDepartments,
  } = useGetDepartmentsQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const departments = departmentData ?? [];

  const { departmentColumns, data, openDeleteModal, handleDeleteDialog } =
    useDepartmentColumnData(isFetchingDepartments);

  const departmentsColumnData = useMemo(
    () => departmentColumns,
    [isFetchingDepartments]
  );
// >>>>>>> bf3d7875a640c4a5168f098455c8b5808e477c8b

  // const departmentsColumnData = useMemo(
  //   () => departmentColumns(isFetchingDepartments),
  //   [isFetchingDepartments]
  // );

  // const departmentsColumnData = useMemo(
  //   () => departmentColumns(isFetchingDepartments),
  //   [isFetchingDepartments]
  // );

  const user = useAppSelector(selectUser);
  const { organization } = user;

  const [createBulkDepartments, { isLoading: isCreatingBulkDepartments }] =
    useCreateBulkDepartmentsMutation();
  const [downloadDepartmentTemplate] = useLazyDownloadDepartmentTemplateQuery();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;
    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("file", bulkFile);
    await createBulkDepartments(formData)
      .unwrap()
      .then(() => {
        toast.success("Departments Uploaded Successfully");
        handleBulkUploadDialog();
        refetchDepartments();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  const handleTemplateDownload = async (file: string) => {
    toast.loading("downloading...");
    downloadDepartmentTemplate({ template: "department", format: file })
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "department_template",
            fileExtension: fileType,
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  return (
    <DashboardLayout headerTitle="Department">
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
            // onManualBtn={() => {
            //   console.log(departments);
              
            // }}
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
          className={`max-w-max`}
          open={openBulkUploadModal}
          onOpenChange={handleBulkUploadDialog}
        >
          <BulkUploadModal
            loading={isCreatingBulkDepartments}
            onCancel={handleBulkUploadDialog}
            onSampleCsvDownload={() => {
              handleBulkRequirementDialog();
              setFileType("csv");
            }}
            onSampleExcelDownload={() => {
              handleBulkRequirementDialog();
              setFileType("xlsx");
            }}
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
            onTemplateDownload={() => handleTemplateDownload(fileType)}
            onCancel={handleBulkRequirementDialog}
          />
        </DashboardModal>
      </section>
    </DashboardLayout>
  );
};

export default Departments;
