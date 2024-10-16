/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dictionary } from "@/@types/dictionary";
import DeleteModal from "@/components/atoms/modals/delete";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import TableWrapper from "@/components/tables/TableWrapper";
import { UsersIcon } from "@/public/assets/icons";
import { selectUser } from "@/redux/features/auth/authSlice";
import {
  useCreateBulkEmployeesMutation,
  useGetEmployeesQuery,
  useLazyDownloadEmployeeDataQuery,
  useLazyDownloadEmployeeTemplateQuery,
} from "@/redux/services/checklist/employeeApi";
import { useDeleteInvitedStaffMutation, useGetAllStaffQuery, useGetInvitedStaffQuery } from "@/redux/services/employee/employeeApi";
import { useAppSelector } from "@/redux/store";
import { downloadFile } from "@/utils/helpers/file-formatter";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "../../../_layout/DashboardLayout";
import BulkRequirementModal from "../_components/bulk-requrement-modal";
import BulkUploadModal from "../_components/bulk-upload-modal";
import CancelModal from "../_components/cancel-modal";
import DashboardModal from "../_components/checklist-dashboard-modal";
import ProceedModal from "../_components/proceed-modal";
import useDisclosure from "../_hooks/useDisclosure";
import {
  // employeerolesColumns,
  useEmployeeRolesColumnData,
} from "../employee-role-column";

const { ADMIN } = routesPath;

const Employee = () => {
  const [status, setStatus] = useState<string>("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  // console.log(status);
  const [fileType, setFileType] = useState("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<Dictionary>({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useRouter()
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

  // const employeesColumnData = useMemo(() => employeerolesColumns, []);
  const { employeerolesColumns, data, openDeleteModal, handleDeleteDialog } =
    useEmployeeRolesColumnData(isFetchingEmployees);

  const { data: all_staff, isLoading: isLoadingAllStaff } = useGetAllStaffQuery({})

  const { data: invited_staff, isLoading: isLoadingInvitedStaff, isFetching: isFetchingInvitedStaff } = useGetInvitedStaffQuery({
    page: page
  })
  const ALL_STAFF = invited_staff?.data?.data ?? []
  const META_DATA = invited_staff?.data?.meta ?? {}

  // console.log(ALL_STAFF)

  const employeesColumnData = useMemo(
    () => employeerolesColumns,
    [isFetchingEmployees]
  );

  const user = useAppSelector(selectUser);
  const { organization } = user;
  const pathname = usePathname();
  const [createBulkEmployees, { isLoading: isCreatingBulkEmployees }] =
    useCreateBulkEmployeesMutation();

  const [downloadEmployeeTemplate] = useLazyDownloadEmployeeTemplateQuery();
  const [downloadEmployeeData] = useLazyDownloadEmployeeDataQuery();

  const [deleteStaff, { isLoading: isDeletingStaff }] = useDeleteInvitedStaffMutation()

  const handleDeleteStaff = async (staff_id: string) => {
    deleteStaff({ staffId: selectedStaff?._slug?.id })
      .unwrap()
      .then(() => {
        setShowDeleteModal(false)
        toast.success("Account Deleted Successfully")
      })
  }

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

  const thlist = [
    "Staff Name",
    "Gender",
    "Work email",
    "Resumption Date",
    "Line Manager",
    "Job Title",
    "Status",
    "Action",
  ];

  const userData = [
    {
      name: "tolu",
      gebder: "female",
      email: "gmani@2.com",
      date: "Jun, 20 2023",
      line: "Peter",
      title: "QA",
      stat: "active",
    },
    {
      name: "kenny",
      gebder: "female",
      email: "gmani@2.com",
      date: "Jun, 20 2023",
      line: "Peter",
      title: "QA",
      stat: "active",
    },
  ];

  const dropDowList = [
    {
      // label: getStatus(param) === "active" ? "Deactivate" :  "Active",
      color: "",
      onActionClick: (param: any, dataTwo: any) => {
        console.log(param);
        console.log(dataTwo);
      },
    },
    { label: "Implied Task", color: "red", onActionClick: () => { } },
  ];

  const listToTest = [
    {
      active: false,
      title: "Total Staffs",
      type: "staff",
      count: all_staff?.data?.total_staff_count,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {
        router.push(routesPath?.ADMIN?.EMPLOYEES);
      },
      pending: false,
      primaryColor: "",
    },
    {
      active: pathname === routesPath?.ADMIN?.EMPLOYEES_INVITED,
      title: "Invited Staffs",
      type: "staff",
      count: invited_staff?.data?.data?.length,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => { },
      pending: true,
      primaryColor: "",
    },
  ];

  return (
    <DashboardLayout headerTitle="Employee">
      {/* <ReusableStepListBox
        btnText="Continue"
        activeStep="1"
        totalStep="1"
        title="Employee"
        btnDisabled={employees?.length < 1}
        onSave={handleProceed}
        onCancel={handleCancelDialog}
      /> */}

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
            {/* testing metrics card start */}
            <ParentModuleCard list={listToTest} />
            {/* testing metrics card end */}
            {/* <DashboardTable
              header="Employee"
              isFilterDrop={false}
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
            */}
            <TableWrapper
              tableheaderList={[
                "S/N",
                "Name",
                "Work Email",
                "Department",
                "Line Manager",
                "Job Title",
                "Role",
                "Action",
              ]}
              perPage={META_DATA?.per_page}
              totalPage={META_DATA?.total}
              currentPage={META_DATA?.current_page}
              onPageChange={(p) => {
                // console.log(p)
                setPage(p);
              }}
              hideNewBtnOne={false}
              tableBodyList={FORMAT_TABLE_DATA(ALL_STAFF)}
              loading={isLoadingInvitedStaff || isFetchingInvitedStaff}
              onSearch={(param) => {
                setTimeout(() => {
                  // Delay api call after 3 seconds
                  setPage(1);
                  setSearch(param);
                }, 3000);
              }}
              dropDown
              hideFilter
              hideSort
              newBtnBulk
              dropDownList={[
                {
                  label: <span className="text-xs text-gray-300"> Edit </span>,
                  color: "",
                  onActionClick: (param: any, data: any) => { },
                },
                {
                  label: <span className="text-xs text-red-500"> Delete </span>,
                  color: "",
                  onActionClick: (param: any, data: any) => {
                    setSelectedStaff(data)
                    setShowDeleteModal(true)
                    // router.push(routesPath?.ADMIN?.EMPLOYEE_VIEW(data?._slug?.id));
                  },
                },
              ]}
              onManualBtn={handleAddEmployee}
              onBulkUploadBtn={handleBulkUploadDialog}
              onCsvChange={() => handleImportChange("excel")}
            // onPdfChange={}
            />

            {/* <TableWrapper
              dropDown={true}
              tableBodyList={userData}
              tableheaderList={thlist}
              defaultBodyList={allemployeeData}
              dropDownList={dropDowList}
            /> */}
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
          className={`max-w-max`}
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

        <DeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          title="Delete Employee"
          content={
            <p className="my-4 text-[13px] text-gray-500 leading-5">You&apos;re about to delete this information. Deleting this would erase all information about this Employee
              <p>Do you still want to delete?</p>
            </p>
          }
          loading={isDeletingStaff}
          handleClick={handleDeleteStaff}
        />
      </section>
    </DashboardLayout>
  );
};

export default Employee;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((item: any, idx: number) => ({
    idx: idx + 1,
    name: `${item?.last_name} ${item?.last_name}`,
    email: item?.email || "--",
    department: item?.department?.name || "--",
    line_manager_name: item?.line_manager_name || "--",
    job_title: item?.designation || "--",
    role: item?.role || "--",
    _slug: {
      id: item?.id
    }
  }));
};
