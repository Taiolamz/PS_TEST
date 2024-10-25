/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import routesPath from "@/utils/routes";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { downloadFile } from "@/utils/helpers/file-formatter";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import BranchDetails from "./_partials/branches-details";
import TableWrapper from "@/components/tables/TableWrapper";
import {
  useCreateBulkBranchesMutation,
  useGetBranchesQuery,
  useLazyDownloadBranchTemplateQuery,
  useLazyGetBranchesExportQuery,
} from "@/redux/services/checklist/branchApi";
import { processInputAsArray } from "@/utils/helpers";
import BadgeComponent from "@/components/badge/BadgeComponents";

const { ADMIN } = routesPath;

const Branches = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  useEffect(() => {
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
    const proceedPath = ADMIN.EMPLOYEES;
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

  const handleAddBranch = () => {
    const path = ADMIN.CREATE_BRANCH;
    router.push(path);
  };

  const {
    data: branchesData,
    isLoading: isLoadingBranches,
    isFetching: isFetchingBranches,
    refetch: refetchBranches,
  } = useGetBranchesQuery({
    page: page,
    search: search,
  });

  // Export branches
  const [getBranchesExport, { data: exportData, isLoading: isExporting }] =
    useLazyGetBranchesExportQuery();

  const branches = branchesData ?? [];

  const user = useAppSelector(selectUser);
  const { organization } = user;

  const [createBulkBranches, { isLoading: isCreatingBulkBranches }] =
    useCreateBulkBranchesMutation();
  const [downloadBranchesTemplate] = useLazyDownloadBranchTemplateQuery();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;

    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("file", bulkFile);
    await createBulkBranches(formData)
      .unwrap()
      .then(() => {
        toast.success("Branches Uploaded Successfully");
        handleBulkUploadDialog();
        refetchBranches();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  const handleTemplateDownload = async (file: string) => {
    toast.loading("downloading...");
    downloadBranchesTemplate(file)
      .unwrap()
      .then((payload: any) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "branch_template",
            fileExtension: fileType,
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  const handleExportDownload = async () => {
    toast.loading("downloading...");
    getBranchesExport({ export: true })
      .unwrap()
      .then((payload: any) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "organization branches",
            fileExtension: "xlsx",
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  const listToTest = [
    {
      active: true,
      title: "Total Branches",
      type: "branch",
      count: branches?.data?.branches?.meta?.total ?? 0,
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
        <DashboardLayout headerTitle="Branches" back>
          <section className="p-5">
            {branches?.length < 1 ? (
              <ReusableEmptyState
                loading={isLoadingBranches}
                textTitle="Branches"
                btnTitle="branch"
                href={ADMIN.CREATE_BRANCH}
                onBulkUpload={handleBulkUploadDialog}
              />
            ) : (
              <>
                {/* testing metrics card start */}
                <ParentModuleCard list={listToTest} />
                {/* testing metrics card end */}

                <TableWrapper
                  tableheaderList={[
                    "Name",
                    processInputAsArray(
                      user?.organization?.hierarchy
                    )?.includes("subsidiary") && "Subsidiary",
                    "Country",
                    "State",
                    "Address",
                    "Status",
                    "Action",
                  ]}
                  perPage={branches?.data?.branches?.meta?.per_page}
                  totalPage={branches?.data?.branches?.meta?.total}
                  currentPage={branches?.data?.branches?.meta?.current_page}
                  onPageChange={(p) => {
                    setPage(p);
                  }}
                  hideNewBtnOne={false}
                  tableBodyList={FORMAT_TABLE_DATA(
                    branches?.data?.branches?.data
                  )}
                  loading={isFetchingBranches}
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
                          ADMIN.BRANCH_DETAILS({
                            id: dataTwo?.name?.props?.children[0]?.props
                              ?.children,
                            tab: "departments",
                          })
                        );
                      },
                    },
                  ]}
                  onManualBtn={handleAddBranch}
                  onBulkUploadBtn={handleBulkUploadDialog}
                  // onPdfChange={}
                  onCsvChange={() => handleExportDownload()}
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
                modalTitle="Branch"
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
                loading={isCreatingBulkBranches}
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
        <BranchDetails />
      )}
    </>
  );
};

export default Branches;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.branch_id}</span>
        <p>{org?.name}</p>
      </>
    ),
    subsidiary: org?.subsidiary?.name,
    country: org?.country,
    state: org?.state,
    address: org?.address,
    status: (
      <BadgeComponent
        text={org?.status}
        color={org?.status.toLowerCase() === "active" ? "green" : "red"}
      />
    ),
  }));
};
