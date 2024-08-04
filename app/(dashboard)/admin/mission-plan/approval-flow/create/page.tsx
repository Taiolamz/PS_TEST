"use client";
import React from "react";
import { useMissionApprovalFlow } from "../../../checklist/_hooks/useMissionApprovalFlow";
import Routes from "@/lib/routes/routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ApprovalFlowOne from "./approval-flow-one";
import ApprovalFlowTwo from "./approval-flow-two";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import ReusableStepListBox from "@/components/fragment/reusable-step-fragment/ReusableStepListBox";
import routesPath from "@/utils/routes";

const { ADMIN } = routesPath;

const AddApprovalFlow = () => {
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const router = useRouter();
  const {
    formik,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    reviewers,
    level,
  } = useMissionApprovalFlow({ cancelPath: cancelRoute });

  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const handleProceed = () => {
    if (ui === "approval-flow-step-two") {
      router.push(ADMIN.OVERVIEW);
    } else {
      router.push(`${location}?ui=approval-flow-step-two`);
    }
  };

  return (
    <DashboardLayout headerTitle="Mission Plan Flow">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="2"
        totalStep="2"
        title="Mission Plan Template"
        onSave={handleProceed}
        onCancel={handleCancelDialog}
      />
      <div className="" style={{ padding: "0rem 2rem", marginTop: "1.5rem" }}>
        <form
          className="mt-5 w-full"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <div className="flex flex-col gap-4 mb-10">
            <p className="font-medium text-sm">Approval Flow</p>
            <p className="text-sm font-normal text-custom-gray-scale-400">
              Arrange how you want your mission plan approval flow should
              process
            </p>
          </div>
          {ui === "approval-flow-step-one" ? (
            <ApprovalFlowOne
              levelOption={level}
              reviewersOption={reviewers}
              selectedReviewer={formik.values.reviewers}
              setSelectedReviewer={(value) =>
                formik.setFieldValue("reviewers", value)
              }
            />
          ) : null}
          {ui === "approval-flow-step-two" ? (
            <ApprovalFlowTwo options={level} />
          ) : null}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddApprovalFlow;
