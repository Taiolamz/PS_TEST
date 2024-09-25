/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDisclosure from "./_hooks/useDisclosure";
import routesPath from "@/utils/routes";
import {
  useCreateBulkUnitsMutation,
  useGetUnitsQuery,
  useLazyDownloadUnitTemplateQuery,
} from "@/redux/services/checklist/unitApi";
import {
  //  unitColumns,
  useUnitColumnData,
} from "./unit-column";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import DashboardTable from "./_components/checklist-dashboard-table";
import DashboardModal from "./_components/checklist-dashboard-modal";
import CancelModal from "./_components/cancel-modal";
import ProceedModal from "./_components/proceed-modal";
import BulkUploadModal from "./_components/bulk-upload-modal";
import BulkRequirementModal from "./_components/bulk-requrement-modal";
import ReusableEmptyState from "@/components/fragment/ReusableEmptyState";
import { downloadFile } from "@/utils/helpers/file-formatter";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import UnitDetails from "./_components/units-details";
import TableWrapper from "@/components/tables/TableWrapper";

const { ADMIN } = routesPath;

const Units = () => {
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

  const handleAddUnit = () => {
    const path = ADMIN.CREATE_UNIT;
    router.push(path);
  };

  const {
    data: unitsData,
    isLoading: isLoadingUnits,
    isFetching: isFetchingUnits,
    refetch: refetchUnits,
  } = useGetUnitsQuery({
    // to: 0,
    // total: 0,
    per_page: 50,
    currentPage: page,
    search: search,
    // next_page_url: "",
    // prev_page_url: "",
  });

  const units = unitsData ?? [];

  // const unitsColumnData = useMemo(
  //   () => unitColumns(isFetchingUnits),
  //   [isFetchingUnits]
  // );

  const user = useAppSelector(selectUser);
  const { organization } = user;

  const { unitColumns, data, openDeleteModal, handleDeleteDialog } =
    useUnitColumnData(isFetchingUnits);

  const unitsColumnData = useMemo(() => unitColumns, [isFetchingUnits]);

  const [createBulkUnits, { isLoading: isCreatingBulkUnits }] =
    useCreateBulkUnitsMutation();
  const [downloadUnitTemplate] = useLazyDownloadUnitTemplateQuery();

  const handleSubmitBulkUpload = async () => {
    if (!bulkFile) return;

    const formData = new FormData();
    formData.append("organization_id", organization?.id as string);
    formData.append("file", bulkFile);
    await createBulkUnits(formData)
      .unwrap()
      .then(() => {
        toast.success("Units Uploaded Successfully");
        handleBulkUploadDialog();
        refetchUnits();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  const handleTemplateDownload = async (file: string) => {
    toast.loading("downloading...");
    downloadUnitTemplate({ template: "unit", format: file })
      .unwrap()
      .then((payload) => {
        toast.dismiss();
        toast.success("Download completed");
        if (payload) {
          downloadFile({
            file: payload,
            filename: "unit_template",
            fileExtension: fileType,
          });
        }
      })
      .catch(() => toast.dismiss());
  };

  const listToTest = [
    {
      active: true,
      title: "Total Units",
      type: "unit",
      count: units?.data?.data?.length ?? 0,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {},
      pending: false,
      primaryColor: "",
    },
  ];

  const FORMAT_TABLE_DATA = (obj: any) => {
    return obj?.map((org: any) => ({
      name: (
        <>
          <span className="hidden">{org.id}</span>
          <p>{org?.name}</p>
        </>
      ),
      head_of_unit: org?.organization?.name,
      department: org?.deparment?.name,
      branch: org?.branch?.name,
  
    }));
  };

  return (
    <>
      {ui !== "details" ? (
        <DashboardLayout headerTitle="Unit" back>
          <section className="p-5">
            {units?.length < 1 ? (
              <ReusableEmptyState
                loading={isLoadingUnits}
                textTitle="Units"
                btnTitle="unit"
                href={ADMIN.CREATE_UNIT}
                onBulkUpload={handleBulkUploadDialog}
              />
            ) : (
              <>
                {/* testing metrics card start */}
                <ParentModuleCard list={listToTest} />
                {/* testing metrics card end */}

                <TableWrapper
                  tableheaderList={[
                    "Unit Name",
                    "Head of Unit",
                    "Department",
                    "Branch",
                    "Action",
                  ]}
                  perPage={units?.meta?.per_page}
                  totalPage={units?.meta?.total}
                  currentPage={units?.meta?.current_page}
                  onPageChange={(p) => {
                    setPage(p);
                  }}
                  hideNewBtnOne={false}
                  tableBodyList={FORMAT_TABLE_DATA(units?.data?.data)}
                  loading={isFetchingUnits}
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
                          ADMIN.UNIT_DETAILS({
                            id: dataTwo?.name?.props?.children[0]?.props
                              ?.children,
                            tab: "staffs",
                          })
                        );
                      },
                    },
                  ]}
                  onManualBtn={handleAddUnit}
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
              <CancelModal onProceed={handleProceedCancel} modalTitle="Unit" />
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
                loading={isCreatingBulkUnits}
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
        <UnitDetails />
      )}
    </>
  );
};

export default Units;
