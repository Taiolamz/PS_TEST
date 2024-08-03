"use client"
import React, { useMemo, useState } from 'react';
import DashboardLayout from '../../_layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import useDisclosure from './_hooks/useDisclosure';
import routesPath from '@/utils/routes';
import { useCreateBulkUnitsMutation, useGetUnitsQuery } from '@/redux/services/checklist/unitApi';
import { unitColumns } from './unit-column';
import { useAppSelector } from '@/redux/store';
import { selectUser } from '@/redux/features/auth/authSlice';
import { toast } from 'sonner';
import { ChecklistLayout } from './_components/checklist-layout';
import EmptyState from './_components/empty-state';
import DashboardTable from './_components/checklist-dashboard-table';
import DashboardModal from './_components/checklist-dashboard-modal';
import CancelModal from './_components/cancel-modal';
import ProceedModal from './_components/proceed-modal';
import BulkUploadModal from './_components/bulk-upload-modal';
import BulkRequirementModal from './_components/bulk-requrement-modal';

const { ADMIN } = routesPath

const Units = () => {
    const emptyStateClass = "flex justify-center items-center";
    const router = useRouter();
    const [bulkFile, setBulkFile] = useState<File | null>(null);

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
        const proceedPath = ADMIN.EMPLOYEES
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
    } = useGetUnitsQuery({
        to: 0,
        total: 0,
        per_page: 50,
        currentPage: 0,
        next_page_url: "",
        prev_page_url: "",
    });

    const units = unitsData ?? [];
    console.log(units, "units");

    const unitsColumnData = useMemo(
        () => unitColumns(isFetchingUnits),
        [isFetchingUnits]
    );

    const user = useAppSelector(selectUser);
    const { organization } = user;

    const [createBulkUnits, { isLoading: isCreatingBulkUnits }] =
        useCreateBulkUnitsMutation();

    const handleSubmitBulkUpload = async () => {
        if (!bulkFile) return;

        const payload = {
            organization_id: organization?.id,
            file: bulkFile,
            branch_id: "jsdfsd",
            department_id: "sdfsdf",
        };
        console.log(payload, "form data");
        await createBulkUnits(payload)
            .unwrap()
            .then(() => {
                toast.success("Units Uploaded Successfully");
                new Promise(() => {
                    setTimeout(() => {
                        toast.dismiss();
                        handleBulkUploadDialog();
                    }, 2000);
                });
            });
    };
    return (
        // <DashboardLayout>
        <ChecklistLayout
            onCancel={handleCancelDialog}
            title="Units"
            step={`Step 4 of 4`}
            className={units?.length < 1 ? emptyStateClass : ""}
            btnDisabled={units?.length < 1}
            showBtn
            shouldProceed
            onProceedBtn={handleProceedDialog}
        >
            {units?.length < 1 ? (
                <EmptyState
                    loading={isLoadingUnits}
                    textTitle="Units"
                    btnTitle="unit"
                    href={ADMIN.CREATE_UNIT}
                    onBulkUpload={handleBulkUploadDialog}
                />
            ) : (
                <DashboardTable
                    isLoading={isFetchingUnits}
                    header="Unit"
                    data={units}
                    columns={unitsColumnData}
                    onBulkUploadBtn={handleBulkUploadDialog}
                    onOpenBtnChange={handleBtnDrop}
                    newBtnOpen={openNewBtn}
                    onManualBtn={handleAddUnit}
                />
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
                className={"w-[600px] max-w-full"}
                open={openBulkUploadModal}
                onOpenChange={handleBulkUploadDialog}
            >
                <BulkUploadModal
                    loading={isCreatingBulkUnits}
                    onCancel={handleBulkUploadDialog}
                    onSampleCsvDownload={handleBulkRequirementDialog}
                    onSampleExcelDownload={handleBulkRequirementDialog}
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
                    onTemplateDownload={() => console.log("template download")}
                    onCancel={handleBulkRequirementDialog}
                />
            </DashboardModal>
        </ChecklistLayout>
        // </DashboardLayout>
    );
}

export default Units;
