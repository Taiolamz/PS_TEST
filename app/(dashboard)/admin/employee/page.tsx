"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import {
  useCreateBulkEmployeesMutation,
  useGetEmployeesQuery,
  useLazyDownloadEmployeeDataQuery,
  useLazyDownloadEmployeeTemplateQuery,
} from "@/redux/services/checklist/employeeApi";
import { employeerolesColumns } from "./employee-role-column";
import useDisclosure from "./_hooks/useDisclosure";
import { UsersIcon } from "@/public/assets/icons";
import DashboardTable from "./_components/checklist-dashboard-table";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { downloadFile } from "@/utils/helpers/file-formatter";
import TableWrapper from "@/components/tables/TableWrapper";
import { allemployeeData } from "@/utils/data/dashboard/missionplan";
import BadgeComponent from "@/components/badge/BadgeComponents";
import { trimLongString } from "../../_layout/Helper";

const { ADMIN } = routesPath;

const Employee = () => {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  // console.log(status);
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
    const proceedPath = ADMIN.MISSION_PLAN_TEMPLATE;
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

  const handleImportChange = async (format: "excel" | "pdf") => {
    toast.loading("downloading...");
    downloadEmployeeData(format)
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "all_employee",
            fileExtension: format === "pdf" ? "pdf" : "xlsx",
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  const handleAddEmployee = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };

  const {
    data: employeeData,
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
    refetch: refetchEmployees,
  } = useGetEmployeesQuery({
    to: 0,
    total: 0,
    // status: status,  When ticket is ready
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const employees = employeeData ?? [];

  const employeesColumnData = useMemo(() => employeerolesColumns, []);

  const user = useAppSelector(selectUser);
  const { organization } = user;
  const [createBulkEmployees, { isLoading: isCreatingBulkEmployees }] =
    useCreateBulkEmployeesMutation();

  const [downloadEmployeeTemplate] = useLazyDownloadEmployeeTemplateQuery();
  const [downloadEmployeeData] = useLazyDownloadEmployeeDataQuery();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;
    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("upload_file", bulkFile);
    await createBulkEmployees(formData)
      .unwrap()
      .then(() => {
        handleBulkUploadDialog();
        refetchEmployees();
        toast.success("Employees Uploaded Successfully");
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  const handleTemplateDownload = async (file: string) => {
    toast.loading("downloading...");
    downloadEmployeeTemplate(file)
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "employee_template",
            fileExtension: fileType,
          });
        }
      })
      .catch(() => toast.dismiss());
  };


  return (
    <DashboardLayout headerTitle="Employee">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="1"
        title="Employee"
        btnDisabled={employees?.length < 1}
        onSave={handleProceed}
        onCancel={handleCancelDialog}
      />
      <section className="p-5">
        {employees?.length < 1 ? (
          <ReusableEmptyState
            loading={isLoadingEmployees}
            textTitle="New Staff"
            btnTitle="Employee"
            href={ADMIN.ADD_EMPLOYEE}
            create
            icon={UsersIcon}
            onBulkUpload={handleBulkUploadDialog}
          />
        ) : (
          <DashboardTable
            header="Employee"
            isFilterDrop
            filterOptions={["pending", "rejected"]}
            filterCheck={(val: string) => {
              return val === status;
            }}
            filterOnCheck={(value: string) => {
              if (value === status) {
                setStatus("");
              } else {
                setStatus(value);
              }
            }}
            data={employees}
            columns={employeesColumnData}
            onBulkUploadBtn={handleBulkUploadDialog}
            onOpenBtnChange={handleBtnDrop}
            newBtnOpen={openNewBtn}
            isLoading={isFetchingEmployees}
            onManualBtn={handleAddEmployee}
            onPdfChange={() => handleImportChange("pdf")}
            onCsvChange={() => handleImportChange("excel")}
          />
        )}

        <DashboardModal
          className={"w-[420px]"}
          open={openCancelModal}
          onOpenChange={handleCancelDialog}
        >
          <CancelModal onProceed={handleProceedCancel} modalTitle="Employee" />
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
            loading={isCreatingBulkEmployees}
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

export default Employee;
