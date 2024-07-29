"use client";
import { ChecklistLayout } from "../../_components/checklist-layout";
import { UsersIcon } from "@/public/assets/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useDisclosure from "../../_hooks/useDisclosure";
import DashboardTable from "../../_components/checklist-dashboard-table";
import BulkRequirementModal from "../../_components/bulk-requrement-modal";
import { employeerolesColumns } from "./employee-role-table-data";
import BulkUploadModal from "../../_components/bulk-upload-modal";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import CancelModal from "../../_components/cancel-modal";
import ProceedModal from "../../_components/proceed-modal";
import EmptyState from "../../_components/empty-state";
import Routes from "@/lib/routes/routes";

export default function EmployeeAndRoles() {
  const emptyStateClass = "flex justify-center items-center";
  const router = useRouter();
  const [search, setSearch] = useState<string>(""); //Search input controller
  const [searchQuery, setSearchQuery] = useState<string>(""); //Search query for endpoint
  const [status, setStatus] = useState<string>(""); //pending/rejected state
  const [template, setTemplate] = useState<string>(""); //Template format csv/xlsv
  const [pageSize, setPageSize] = useState<number>(10); //Pagination
  const [file, setFile] = useState<File | null>(null); //upload file (csv)
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

  const handleBulkRequirementDialog = (val?: string) => {
    val && setTemplate(val);
    onOpenBulkRequirementModal();
    closeBulkUploadModal();
    if (openBulkRequirementModal) {
      onOpenBulkUploadModal();
      closeBulkRequirementModal();
    }
  };

  const handleProceed = () => {
    //Handles when click on process dialog box
    const proceedPath = Routes.ChecklistRoute.ChecklistOverview();
    router.push(proceedPath);
  };

  const handleBulkUploadDialog = async () => {
    onOpenBulkUploadModal();
    const handleUpload = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("upload_file", file);
      console.log("handle upload file");
    };
    if (openBulkUploadModal) {
      await handleUpload();
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

  const handlePdfChange = () => {
    console.log("handle pdf");
  };

  const handleCsvChange = () => {
    console.log("handle csv");
  };

  const handleAddSubsidiary = () => {
    const path = Routes.ChecklistRoute.AddEmployeesAndRolesRoute();
    router.push(path);
  };
  return (
    <ChecklistLayout
      //   onCancel={handleCancelDialog}
      title="Employee"
      step={`Step 1 of 1`}
      btnDisabled
      showBtn
      className={true ? emptyStateClass : ""}
      shouldProceed={false}
      //   onProceedBtn={handleProceedDialog}
    >
      {true ? (
        // If data is empty
        <EmptyState
          textTitle="new staff"
          btnTitle="Employee"
          href={Routes.ChecklistRoute.AddEmployeesAndRolesRoute()}
          create
          icon={UsersIcon}
          onBulkUpload={handleBulkUploadDialog}
        />
      ) : (
        <DashboardTable
          header="Employee"
          isFilterDrop // show display filter or not
          filterOptions={["pending", "rejected"]} // filter options of your choice
          searchVal={search} //Search input value
          filterCheck={(val: string) => {
            //If filter checkbook is clicked
            return val === status;
          }}
          filterOnCheck={(value: string) => {
            //handle checkbook clicked
            if (value === status) {
              setStatus("");
            } else {
              setStatus(value);
            }
          }}
          // onSearchChange={(e) => {
          //   //handle change in Search input value
          //   setSearch(e.target.value);
          // }}
          handleSearchClick={() => setSearchQuery(search)} //handle click on search input
          data={employeeRolesData}
          columns={employeerolesColumns}
          href={Routes.ChecklistRoute.AddEmployeesAndRolesRoute()}
          onBulkUploadBtn={handleBulkUploadDialog}
          onOpenBtnChange={handleBtnDrop}
          newBtnOpen={openNewBtn}
          // isLoading={searchloading} // handle loading state while searching for result
          onManualBtn={handleAddSubsidiary}
          onPdfChange={handlePdfChange} //handle download pdf
          onCsvChange={handleCsvChange} //handle download csv
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
          onCancel={handleBulkUploadDialog}
          onSampleCsvDownload={() => handleBulkRequirementDialog("csv")}
          onSampleExcelDownload={() => handleBulkRequirementDialog("xlsv")}
          onBulkUpload={handleBulkUploadDialog}
          setFile={setFile}
        />
      </DashboardModal>

      <DashboardModal
        className={"w-[600px] max-w-full"}
        open={openBulkRequirementModal}
        onOpenChange={handleBulkRequirementDialog}
      >
        <BulkRequirementModal
          onTemplateDownload={() => {
            console.log(template, "fetch employee template");
          }}
          onCancel={handleBulkRequirementDialog}
        />
      </DashboardModal>
    </ChecklistLayout>
  );
}

const employeeRolesData = [
  {
    id: "string",
    first_name: "string",
    last_name: "string",
    middle_name: "string",
    maiden_name: "string",
    gender: "string",
    date_of_birth: "12-02-2023",
    resumption_date: "12-03-2024",
    phone_number: "string",
    staff_number: "string",
    level: "string",
    designation: "string",
    email: "string",
    line_manager_email: "string",
    organization_id: "string",
    department_id: "string",
    branch_id: "string",
    unit_id: "string",
    status: "string",
    role_id: "string",
    reason: "string",
    created_at: "string",
    updated_at: "string",
  },
];
