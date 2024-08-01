"use client";
import { ChecklistLayout } from "../../_components/checklist-layout";
import { UsersIcon } from "@/public/assets/icons";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useDisclosure from "../../_hooks/useDisclosure";
import DashboardTable from "../../_components/checklist-dashboard-table";
import BulkRequirementModal from "../../_components/bulk-requrement-modal";
import { employeerolesColumns } from "./employee-role-column";
import BulkUploadModal from "../../_components/bulk-upload-modal";
import DashboardModal from "../../_components/checklist-dashboard-modal";
import CancelModal from "../../_components/cancel-modal";
import ProceedModal from "../../_components/proceed-modal";
import EmptyState from "../../_components/empty-state";
import Routes from "@/lib/routes/routes";
import { useGetEmployeesQuery } from "@/redux/services/checklist/employeeApi";

export default function EmployeeAndRoles() {
  const emptyStateClass = "flex justify-center items-center";
  const router = useRouter();
  // const [search, setSearch] = useState<string>(""); //Search input controller
  // const [searchQuery, setSearchQuery] = useState<string>(""); //Search query for endpoint
  const [status, setStatus] = useState<string>(""); //pending/rejected state
  // const [template, setTemplate] = useState<string>(""); //Template format csv/xlsv
  // const [pageSize, setPageSize] = useState<number>(10); //Pagination
  const [file, setFile] = useState<File | null>(null); //upload file (csv)

  const {
    data: employeeData,
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
  } = useGetEmployeesQuery({
    to: 0,
    total: 0,
    per_page: 50,
    currentPage: 0,
    next_page_url: "",
    prev_page_url: "",
  });

  const employees = employeeData ?? [];

  const employeesColumnData = useMemo(
    () => employeerolesColumns,
    [isFetchingEmployees]
  );
  // const employeesColumnData = useMemo(
  //   () => employeerolesColumns(isFetchingEmployees),
  //   [isFetchingEmployees]
  // );

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

  // const handleBulkRequirementDialog = (val?: string) => {
  //   val && setTemplate(val);
  //   onOpenBulkRequirementModal();
  //   closeBulkUploadModal();
  //   if (openBulkRequirementModal) {
  //     onOpenBulkUploadModal();
  //     closeBulkRequirementModal();
  //   }
  // };

  const handleBulkRequirementDialog = () => {
    onOpenBulkRequirementModal();
    closeBulkUploadModal();
    if (openBulkRequirementModal) {
      onOpenBulkUploadModal();
      closeBulkRequirementModal();
    }
  };

  const handleProceed = () => {
    const proceedPath = Routes.ChecklistRoute.MissionPlanTemplateRoute();
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

  const handleAddEmployee = () => {
    const path = Routes.ChecklistRoute.AddEmployeesAndRolesRoute();
    router.push(path);
  };
  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      title="Employee"
      step={`Step 1 of 1`}
      btnDisabled={employees?.length < 1}
      showBtn
      className={employees?.length < 1 ? emptyStateClass : ""}
      shouldProceed
      onProceedBtn={handleProceedDialog}
    >
      {employees?.length < 1 ? (
        <EmptyState
          loading={isLoadingEmployees}
          textTitle="New Staff"
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
          // searchVal={search} //Search input value
          filterCheck={(val: string) => {
            // If filter checkbook is clicked
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
          // handleSearchClick={() => setSearchQuery(search)} //handle click on search input
          data={employees}
          columns={employeesColumnData}
          // href={Routes.ChecklistRoute.AddEmployeesAndRolesRoute()}
          onBulkUploadBtn={handleBulkUploadDialog}
          onOpenBtnChange={handleBtnDrop}
          newBtnOpen={openNewBtn}
          isLoading={isFetchingEmployees}
          // isLoading={searchloading} // handle loading state while searching for result
          onManualBtn={handleAddEmployee}
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
          onSampleCsvDownload={handleBulkRequirementDialog}
          onSampleExcelDownload={handleBulkRequirementDialog}
          // onSampleCsvDownload={() => handleBulkRequirementDialog("csv")}
          // onSampleExcelDownload={() => handleBulkRequirementDialog("xlsv")}
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
            console.log("fetch employee template");
            // console.log(template, "fetch employee template");
          }}
          onCancel={handleBulkRequirementDialog}
        />
      </DashboardModal>
    </ChecklistLayout>
  );
}
