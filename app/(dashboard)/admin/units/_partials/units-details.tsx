import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import routesPath from "@/utils/routes";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalContainer from "@/components/modal-container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { processInputAsArray } from "@/utils/helpers";
import ParentModuleCard from "@/components/card/module-cards/ParentModuleCard";
import useDisclosure from "../_hooks/useDisclosure";
import TableWrapper from "@/components/tables/TableWrapper";
import DashboardModal from "../_components/checklist-dashboard-modal";
import CancelModal from "../_components/cancel-modal";
import BulkUploadModal from "../_components/bulk-upload-modal";
import ProceedModal from "../_components/proceed-modal";
import BulkRequirementModal from "../_components/bulk-requrement-modal";
import {
  useCreateBulkUnitsMutation,
  useDeleteUnitMutation,
  useGetSingleUnitQuery,
  useGetUnitsQuery,
  useLazyDownloadUnitTemplateQuery,
} from "@/redux/services/checklist/unitApi";
import { toast } from "sonner";
import { downloadFile } from "@/utils/helpers/file-formatter";
import DeactivateOrgModal from "@/components/atoms/modals/deactivate-modal";

const { ADMIN } = routesPath;

export default function UnitDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const id = searchParams.get("id");
  const tab = searchParams.get("tab");

  const [createBulkUnits, { isLoading: isCreatingBulkUnits }] =
    useCreateBulkUnitsMutation();
  const [downloadUnitTemplate] = useLazyDownloadUnitTemplateQuery();

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

  const { organization } = user;

  const listToTest = [
    {
      active: tab === "staffs",
      title: "Total Staffs",
      type: "staff",
      count: 0,
      accentColor: "",
      hide: false,
      icon: "",
      onClick: () => {
        id &&
          router.replace(ADMIN.SUBSIDIARY_DETAILS({ id: id, tab: "staffs" }));
      },
      pending: false,
      primaryColor: "",
    },
  ];

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

  const handleAddStaff = () => {
    const path = ADMIN.ADD_EMPLOYEE;
    router.push(path);
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

  const {
    isOpen: openDeactivateModal,
    open: onOpenDeactivateModal,
    close: closeDeactivateModal,
  } = useDisclosure();

  const handleDeactivateModalChange = () => {
    onOpenDeactivateModal();
    if (openDeactivateModal) {
      closeDeactivateModal();
    }
  };

  const {
    data: unitDetail,
    error,
    isLoading,
  } = useGetSingleUnitQuery(id!, {
    skip: !id,
  });

  const [deleteUnit, { isLoading: isDeletingUnit }] = useDeleteUnitMutation();

  const handleDeleteUnit = async () => {
    await deleteUnit(id)
      .unwrap()
      .then(() => {
        toast.success(`Unit Deactivated Successfully`);
        new Promise(() => {
          setTimeout(() => {
            handleDeactivateModalChange();
            toast.dismiss();
            router.push(ADMIN.UNIT);
          }, 1000);
        });
      });
  };

  return (
    <DashboardLayout
      back
      headerTitle={unitDetail?.data?.unit?.name || "--- ---"}
    >
      <section className="p-5">
        <div className="flex justify-between mb-10">
          <div className="">
            <h3 className="text-2xl font-medium text-[var(--text-color3)]">
              {unitDetail?.data?.unit?.name || "--- ---"}
            </h3>

            <div className="inline-flex gap-x-[80px] text-[var(--text-color)] text-xs mt-5">
              <span className="space-y-3">
                <h4>
                  Head of Unit:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-2">
                    {unitDetail?.data?.unit?.head_of_unit?.name || "--- ---"}
                  </span>
                </h4>
                <h4>
                  Unit Email:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-2">
                    {unitDetail?.data?.unit?.unit_email || "--- ---"}
                  </span>
                </h4>
                <h4>
                  Head of Unit Email:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-2">
                    {unitDetail?.data?.unit?.unit_email || "--- ---"}
                  </span>
                </h4>
              </span>
              <span className="space-y-3">
                <h4>
                  Address:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-2">
                    {"--- ---"}
                    {/* { 9b, Akin Ogunmade Gbagada} */}
                  </span>
                </h4>
                <h4>
                  State:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-2">
                    {/* Lagos */}
                    {"--- ---"}
                  </span>
                </h4>
                <h4>
                  Country:{" "}
                  <span className="text-[var(--text-color4)] font-medium ml-2">
                    {/* Nigeria */}
                    {"--- ---"}
                  </span>
                </h4>
              </span>
            </div>
          </div>
          <div className="inline-flex justify-end gap-x-3">
            <Link href={ADMIN.EDIT_UNIT(id ?? "")}>
              <Button
                variant="outline"
                className="rounded border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-white"
                size="sm"
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenDeactivateModal}
              className="rounded border-[var(--bg-red-100)] text-[var(--bg-red-100)] hover:text-[var(--bg-red-100)] hover:bg-white"
            >
              Deactivate
            </Button>
          </div>
        </div>{" "}
        <div className="block mb-9">
          <ParentModuleCard list={listToTest} />
        </div>
        <section className="">
          {tab === "staffs" && (
            <TableWrapper
              tableheaderList={[
                "Staff Name",
                "Gender",
                "Work Email",
                "Job Title",
                "Role",
                "Line Manager",
                "Action",
              ]}
              hidePagination
              addText="New Staff"
              hideNewBtnOne={false}
              tableBodyList={[]}
              loading={false}
              onSearch={(param) => {
                console.log(param);
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
                    // router.push(
                    //   pathname +
                    //     "?" +
                    //     "ui=details" +
                    //     "&" +
                    //     "id=" +
                    //     dataTwo?.name?.props.children[0].props.children
                    // );
                  },
                },
              ]}
              onManualBtn={handleAddStaff}
              onBulkUploadBtn={handleBulkUploadDialog}
              // onPdfChange={}
              // onCsvChange={}
            />
          )}
        </section>
      </section>
      {/* <ModalContainer
        show={modal}
        handleClose={() => setModal(false)}
        modalClass="h-[220px] !w-[540px] rounded "
        title="Close Subsidairy"
      >
        <div className="absolute top-0 text-right">
          <div className="  w-full p-4 px-6 ">
            <div className="flex justify-between items-center mt-3 mb-[18px]">
              <h4 className="text-[var(--bg-red-100)]">Deactivate Unit</h4>
              <X
                className="size-[18px] cursor-pointer"
                onClick={() => setModal(false)}
              />
            </div>
            <p className="text-[var(--text-color4)] text-sm text-left">
              You’re about to deactivate this unit. the staffs under this unit
              would be inaccessible, Do you still want to deactivate?
            </p>
            <Button
              loading={false}
              loadingText="Deactivating"
              disabled={false}
              className={cn("font-light bg-[var(--bg-red-100)] mt-5 ")}
            >
              Yes, Deactivate
            </Button>
          </div>
        </div>
      </ModalContainer> */}

      <DeactivateOrgModal
        organization="Unit"
        isLoading={isDeletingUnit}
        onDeactivate={handleDeleteUnit}
        onModalChange={handleDeactivateModalChange}
        show={openDeactivateModal}
        content={
          "You’re about to deactivate this unit. the staffs under this unit would be inaccessible, Do you still want to deactivate?"
        }
      />

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
    </DashboardLayout>
  );
}
