"use client";
import React, { useState } from "react";
import { useMissionApprovalFlow } from "../../../checklist/_hooks/useMissionApprovalFlow";
import Routes from "@/lib/routes/routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ApprovalFlowOne from "./approval-flow-one";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import routesPath from "@/utils/routes";
import DashboardModal from "../../template/_components/checklist-dashboard-modal";
import CancelModal from "../../template/_components/cancel-modal";
import ApprovalFlowTwo from "./approval-flow-two";
import { useGetAllRolesQuery } from "@/redux/services/role/rolesApi";
import { useGetAllApproverListQuery } from "@/redux/services/employee/employeeApi";
import { Input } from "@/components/ui/input";

const { ADMIN } = routesPath;

const AddApprovalFlow = () => {
  const cancelRoute = ADMIN.CHECKLIST;
  const router = useRouter();
  const {
    formik,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    isCreatingMissionFlow,
    reviewers,
    level,
  } = useMissionApprovalFlow({ cancelPath: cancelRoute });

  const { data: rolesData, isLoading: isLoadingroles } =
    useGetAllApproverListQuery();
  const formatRolesData = (roles: string[]) => {
    return roles?.map((role) => ({
      name: role,
      value: role,
    }));
  };
  const roles = formatRolesData(rolesData as string[]) ?? [];

  return (
    <DashboardLayout headerTitle="Mission Plan Flow">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="2"
        totalStep="2"
        title="Mission Plan Flow"
        onSave={formik.handleSubmit}
        onCancel={handleCancelDialog}
        loading={isCreatingMissionFlow}
      />
      <div className="" style={{ padding: "0rem 2rem", marginTop: "1.5rem" }}>
        <form className="mt-5 w-full" autoComplete="off">
          <div className="flex flex-col gap-4 mb-5">
            {/* <p className="font-medium text-sm">Approval Flow</p> */}
            <Input
              label="Approval Title"
              type="text"
              placeholder="FY 2024 Approval Flow"
              id="title"
              name="title"
              className="w-[425px]"
              value={formik.values.title}
              onChange={formik.handleChange}
              isRequired
            />
            <p className="text-sm font-normal mt-5 text-custom-gray-scale-400">
              Arrange how you want your mission plan approval flow should
              process
            </p>
          </div>

          <ApprovalFlowTwo
            setFieldValue={formik.setFieldValue}
            options={level}
            approvals={roles}
            // approvals={reviewers}
            approvalsArray={formik.values.order_of_approvals}
            setOrderValue={formik.setFieldValue}
          />
        </form>
      </div>

      <DashboardModal
        className={"w-[420px]"}
        open={openCancelModal}
        onOpenChange={handleCancelDialog}
      >
        <CancelModal
          onProceed={handleProceedCancel}
          modalTitle="Mission Plan Flow"
        />
      </DashboardModal>
    </DashboardLayout>
  );
};

export default AddApprovalFlow;
