/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import routesPath from "@/utils/routes";
import {
  useCreateBulkSubsidiariesMutation,
  useGetSubsidiariesQuery,
  useLazyDownloadSubsidiaryTemplateQuery,
} from "@/redux/services/checklist/subsidiaryApi";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/store";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { downloadFile } from "@/utils/helpers/file-formatter";
import { getDataFromFileUpload } from "@/utils/helpers/extract-data-bulk";
import TableWrapper from "@/components/tables/TableWrapper";
import SubsidiaryDetails from "./_partials/subsidiary-details";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import { processInputAsArray } from "@/utils/helpers";
import BadgeComponent from "@/components/badge/BadgeComponents";

const { ADMIN } = routesPath;

const Subsidiary = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const { user } = useAppSelector((state) => state.auth);

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
    const proceedPath = ADMIN.BRANCH;
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

  const handleAddSubsidiary = () => {
    const path = ADMIN.CREATE_SUBSIDIARY;
    router.push(path);
  };

  const {
    data: subsidiariesData,
    isLoading: isLoadingSubsidiaries,
    isFetching: isFetchingSubsidiaries,
    refetch: refetchSubsidiaries,
  } = useGetSubsidiariesQuery({
    page: page,
    search: search,
  });
  const subsidiaries = subsidiariesData?.data?.data ?? [];

  const { organization } = useAppSelector(selectUser);

  const [createBulkSubsidiaries, { isLoading: isCreatingBulkSubsidiaries }] =
    useCreateBulkSubsidiariesMutation();
  const [downloadSubsidiaryTemplate] = useLazyDownloadSubsidiaryTemplateQuery();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;
    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("file", bulkFile);
    await createBulkSubsidiaries(formData)
      .unwrap()
      .then(() => {
        toast.success("Subsidiaries Uploaded Successfully");
        handleBulkUploadDialog();
        refetchSubsidiaries();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  const handleTemplateDownload = async (file: string) => {
    toast.loading("downloading...");
    downloadSubsidiaryTemplate(file)
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "subsidiary_template",
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
      title: "Total Subsidiaries",
      type: "subsidiary",
      count: subsidiariesData?.data?.total ?? 0,
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
        <DashboardLayout headerTitle="Subsidiaries">
          <section className="p-5 mt-6">
            {subsidiaries?.length < 1 ? (
              <ReusableEmptyState
                loading={isLoadingSubsidiaries}
                textTitle="subsidiaries"
                btnTitle="subsidiary"
                href={ADMIN.CREATE_SUBSIDIARY}
                onBulkUpload={handleBulkUploadDialog}
              />
            ) : (
              <>
                {/* testing metrics card start */}
                <ParentModuleCard list={listToTest} />

                <TableWrapper
                  tableheaderList={[
                    "Name",
                    "Country",
                    "Address",
                    "Status",
                    "Action",
                  ]}
                  perPage={subsidiariesData?.data?.per_page}
                  totalPage={subsidiariesData?.data?.total}
                  currentPage={subsidiariesData?.data?.current_page}
                  onPageChange={(p) => {
                    setPage(p);
                  }}
                  hideNewBtnOne={false}
                  tableBodyList={FORMAT_TABLE_DATA(subsidiaries)}
                  loading={isFetchingSubsidiaries}
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
                          ADMIN.SUBSIDIARY_DETAILS({
                            id: dataTwo?.name?.props.children[0].props.children,
                            tab: getTabParam(),
                          })
                        );
                      },
                    },
                  ]}
                  onManualBtn={handleAddSubsidiary}
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
                modalTitle="Subsidiary"
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
                loading={isCreatingBulkSubsidiaries}
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
          </section>{" "}
        </DashboardLayout>
      ) : (
        <SubsidiaryDetails />
      )}
    </>
  );
};

export default Subsidiary;

const FORMAT_TABLE_DATA = (obj: any) => {
  return obj?.map((org: any) => ({
    name: (
      <>
        <span className="hidden">{org.id}</span>
        <p>{org?.name}</p>
      </>
    ),
    country: org?.country,
    address: org?.address,
    status: (
      <BadgeComponent
        text={!org?.deleted_at ? "Active" : "Closed"}
        color={!org?.deleted_at ? "green" : "red"}
      />
    ),
  }));
};
