"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useGetEmployeesQuery } from "@/redux/services/checklist/employeeApi";
import { employeerolesColumns } from "./employee-role-column";
import useDisclosure from "./_hooks/useDisclosure";
import { ChecklistLayout } from "./_components/checklist-layout";
import EmptyState from "./_components/empty-state";
import { UsersIcon } from "@/public/assets/icons";
import DashboardTable from "./_components/checklist-dashboard-table";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import TableWrapper from "@/components/tables/TableWrapper";
import BadgeComponent from "@/components/badge/BadgeComponents";

const { ADMIN } = routesPath;

const Employee = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // const proceedPath = Routes.ChecklistRoute.MissionPlanTemplateRoute();
    // router.push(proceedPath);
    const proceedPath = ADMIN.MISSION_PLAN;
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
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };

  const userData = [
    {
      name: "Alice",
      age: "Female",
      email: "alice@example.com",
      date: "2023 - 02 - 18",
      line_manager: "Paul",
      job: "Boss",
      Status: <BadgeComponent text="Pending" color="yellow" />,
      action: "",
    },
  ];

  const listTwo = [
    {
      name: "Alice",
      age: 25,
      email: "alice@example.com",
      Status: "pending",
    },
    {
      name: "Bob",
      age: 30,
      email: "bob@example.com",
      Status: "success",
    },
    {
      name: "Charlie",
      age: 35,
      email: "charlie@example.com",
      Status: "failed",
    },
  ];

  //   const formatListfromBackend = (list) => {
  //     const newList = list?.map((chi,idx) => {
  //         return {...chi, status: <></>}
  //     })
  //   }

  return (
    // <DashboardLayout>
    <DashboardLayout headerTitle="Employee">
      {/* <ChecklistLayout
        onCancel={handleCancelDialog}
        title="Employee"
        step={`Step 1 of 1`}
        btnDisabled={employees?.length < 1}
        showBtn
        className={employees?.length < 1 ? emptyStateClass : ""}
        shouldProceed
        onProceedBtn={handleProceedDialog}
      > */}
      <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="1"
        title="Employee"
        btnDisabled={employees?.length < 1}
        // loading={isCreatingSubsidiary}
        onSave={handleProceed}
        onCancel={handleCancelDialog}
        // back
        // hideStep
        // fixed
      />
      <section className="p-5">
        {employees?.length < 0 ? (
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
          <>
            <TableWrapper
              TableTitle="Employee"
              //   hideExport={true}
              //   hideFilter={true}
              // newBtnBulk={true}
              //   hideNewBtnOne
              onAdd={() => {
                console.log("add new");
              }}
              onBulkUploadBtn={() => {
                console.log("bulk");
              }}
              //   hideSearchFilterBox
              onManualBtn={() => {
                console.log("manual");
              }}
              onSearch={(param) => {
                console.log(param);
              }}
              filterList={[
                { label: "Pending", value: "pending" },
                { label: "Verified", value: "verified" },
                { label: "Rejected", value: "rejected" },
              ]}
              sortList={[
                { label: "today", value: "1" },
                { label: "yesterday", value: "2" },
              ]}
              //   filterVal={}
              onFilterClick={(param) => {
                console.log(param);
              }}
              handleSearchClick={(param) => {
                console.log(param);
              }}
              onRowClick={(param) => {
                // console.log(param);
              }}
              //   addText="konn"

              tableheaderList={[
                "Staff Name",
                "Gender",
                "Work email",
                "Resumption Date",
                "Line Manager",
                "Job Title",
                "Status",
                "Action",
              ]}
              tableBodyList={userData}
              perPage="10"
              totalPage="1"
              currentPage="1"
              onPageChange={(p) => {
                console.log(p);
              }}
              defaultBodyList={listTwo}
            />
          </>
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
      </section>
      {/* </ChecklistLayout> */}
    </DashboardLayout>
  );
};

export default Employee;
