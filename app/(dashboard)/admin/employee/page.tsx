/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import routesPath from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import {
  useCreateBulkEmployeesMutation,
  useLazyDownloadEmployeeTemplateQuery,
} from "@/redux/services/checklist/employeeApi";
import useDisclosure from "./_hooks/useDisclosure";
import { UsersIcon } from "@/public/assets/icons";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { downloadFile } from "@/utils/helpers/file-formatter";
import TableWrapper from "@/components/tables/TableWrapper";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import {
  useGetAllStaffQuery,
  useGetInvitedStaffQuery,
  useLazyExportAllStaffsQuery,
} from "@/redux/services/employee/employeeApi";

const { ADMIN } = routesPath;

const Employee = () => {
  const router = useRouter();
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [fileType, setFileType] = useState("");
  // Inital count of employees
  const [initialCount, setInitialCount] = useState<number | undefined>(
    undefined
  );

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

  // Remove these when QA test the app and it doesn't break
  // const handleBulkModal = () => {
  //   if (openBulkUploadModal) {
  //     onOpenNewBtnDrop();
  //   }
  // };

  // const handleBtnDrop = () => {
  //   onOpenNewBtnDrop();
  //   if (openNewBtn) {
  //     closeNewBtnDrop();
  //   }
  //   handleBulkModal();
  // };

  const handleImportChange = async () => {
    toast.loading("downloading...");
    exportAllStaffs({})
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "all_staff",
            fileExtension: "xlsx",
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  const handleAddEmployee = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
  };

  // Remove this soom
  // const {
  //   data: employeeData,
  //   isLoading: isLoadingEmployees,
  //   refetch: refetchEmployees,
  // } = useGetEmployeesQuery({
  //   per_page: 50,
  // });

  // Invited staffs
  const { data: invited_staff, isLoading: isLoadingInvitedStaff } =
    useGetInvitedStaffQuery({
      page: 1,
      search: "",
    });

  // Fetch all staff service
  const {
    data: all_staff,
    isLoading: isLoadingStaff,
    isFetching: isFetchingStaff,
  } = useGetAllStaffQuery({
    page: page,
    search: search,
  });

  const ALL_STAFF = all_staff?.data?.data ?? [];
  const META_DATA = all_staff?.data?.meta ?? {};

  useEffect(() => {
    if (all_staff && initialCount === undefined) {
      setInitialCount(META_DATA?.total);
    }
  }, [all_staff, initialCount]);

  const user = useAppSelector(selectUser);
  const pathname = usePathname();
  const { organization } = user;
  // Bulk employees
  const [createBulkEmployees, { isLoading: isCreatingBulkEmployees }] =
    useCreateBulkEmployeesMutation();

  // Download template
  const [downloadEmployeeTemplate] = useLazyDownloadEmployeeTemplateQuery();
  // Export employee data
  const [exportAllStaffs] = useLazyExportAllStaffsQuery();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;
    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("upload_file", bulkFile);
    await createBulkEmployees(formData)
      .unwrap()
      .then(() => {
        handleBulkUploadDialog();
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

  const listToTest = [
    {
      active: pathname === routesPath?.ADMIN?.EMPLOYEES,
      title: "Total Staffs",
      type: "staff",
      count: initialCount || 0,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {},
      pending: false,
      primaryColor: "",
    },
    {
      // active: true,
      title: "Invited Staffs",
      type: "staff",
      count: invited_staff?.data?.data?.length,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {
        router?.push(routesPath?.ADMIN?.EMPLOYEES_INVITED);
      },
      pending: true,
      primaryColor: "",
    },
  ];

  return (
    <DashboardLayout headerTitle="Employee">
      <section className="p-5">
        {initialCount === undefined || Number(initialCount) < 0 ? (
          <ReusableEmptyState
            loading={isLoadingStaff}
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
                setPage(p);
              }}
              hideNewBtnOne={false}
              tableBodyList={FORMAT_TABLE_DATA(ALL_STAFF)}
              loading={isLoadingStaff || isFetchingStaff}
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
                  label: <span className="text-xs"> View Details </span>,
                  color: "",
                  onActionClick: (param: any, data: any) => {
                    router.push(
                      routesPath?.ADMIN?.EMPLOYEE_VIEW(data?._slug?.id)
                    );
                  },
                },
              ]}
              onManualBtn={handleAddEmployee}
              onBulkUploadBtn={handleBulkUploadDialog}
              onCsvChange={() => handleImportChange()}
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
      </section>
    </DashboardLayout>
  );
};

export default Employee;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((item: any, idx: number) => ({
    idx: idx + 1,
    name: item?.name,
    email: item?.email || "--- ---",
    department: item?.department?.name || "--- ---",
    line_manager_name: item?.line_manager_name || "--- ---",
    job_title: item?.designation || "--- ---",
    role: <p className="capitalize">{item?.role || "--- ---"}</p>,
    _slug: {
      id: item?.id,
    },
    // status: (
    //   <BadgeComponent
    //     text={item?.status ? "Active" : "Closed"}
    //     color={item?.status ? "green" : "red"}
    //   />
    // ),
  }));
};
