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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { downloadFile } from "@/utils/helpers/file-formatter";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import DepartmentDetails from "./_partials/department-details";
import TableWrapper from "@/components/tables/TableWrapper";
import { processInputAsArray } from "@/utils/helpers";

const { ADMIN } = routesPath;

const Departments = () => {
  const router = useRouter();
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof ui !== "string") {
      router.replace(pathname + "?" + "ui=view");
    }
  }, []);

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
    page: page,
    search: search,
  });

  const departments = departmentData?.data ?? [];
  const metaData = departmentData?.meta;

  // const { departmentColumns, data, openDeleteModal, handleDeleteDialog } =
  //   useDepartmentColumnData(isFetchingDepartments);

  // const departmentsColumnData = useMemo(
  //   () => departmentColumns,
  //   [isFetchingDepartments]
  // );

  // const departmentsColumnData = useMemo(
  //   () => departmentColumns(isFetchingDepartments),
  //   [isFetchingDepartments]
  // );

  // const departmentsColumnData = useMemo(
  //   () => departmentColumns(isFetchingDepartments),
  //   [isFetchingDepartments]
  // );

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

  const getTabParam = () => {
    if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("branch")
    ) {
      return "branches";
    } else if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("department")
    ) {
      return "departments";
    } else if (
      processInputAsArray(user?.organization?.hierarchy)?.includes("unit")
    ) {
      return "units";
    } else {
      return "staffs";
    }
  };

  const listToTest = [
    {
      active: true,
      title: "Total Departments",
      type: "department",
      count: departments?.length,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {},
      pending: false,
      primaryColor: "",
    },
  ];

  return (
    <>
      {ui !== "details" ? (
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
              <>
                {/* testing metrics card start */}
                <ParentModuleCard list={listToTest} />
                {/* testing metrics card end */}
                {/* <DashboardTable
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
                /> */}
                <TableWrapper
                  tableheaderList={[
                    "Department",
                    "HOD",
                    "Subsidiary",
                    "Branch",
                    "Action",
                  ]}
                  addText="New Department"
                  perPage={metaData?.per_page}
                  totalPage={metaData?.total}
                  currentPage={metaData?.current_page}
                  onPageChange={(p) => {
                    setPage(p);
                  }}
                  hideNewBtnOne={false}
                  // tableBodyList={FORMAT_TABLE_DATA(subsidiaries)}
                  tableBodyList={FORMAT_TABLE_DATA(departments)}
                  loading={isFetchingDepartments}
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
                      label: "View Details",
                      color: "",
                      onActionClick: (param: any, dataTwo: any) => {
                        router.push(
                          ADMIN.DEPARTMENT_DETAILS({
                            id: dataTwo?.name?.props.children[0].props.children,
                            // tab: getTabParam(),
                            tab: "units",
                          })
                        );
                      },
                    },
                  ]}
                  onManualBtn={handleAddDeparment}
                  onBulkUploadBtn={handleBulkUploadDialog}
                  // onPdfChange={}
                  // onCsvChange={}
                />
              </>
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
      ) : (
        <DepartmentDetails />
      )}
    </>
  );
};

export default Departments;

const FORMAT_TABLE_DATA = (obj: DepartmentData[]) => {
  return obj?.map((org) => ({
    name: (
      <>
        <span className="hidden">{org.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    head_of_department: org?.head_of_department?.name || "--- ---",
    subsidiary: org?.subsidiary || "--- ---",
    branch: org?.branch?.name || "--- ---",
  }));
};
