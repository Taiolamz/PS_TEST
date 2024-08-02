"use client";
import React, { useState } from "react";
import { useMissionApprovalFlow } from "../../../_hooks/useMissionApprovalFlow";
import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import CustomSelect from "@/components/custom-select";
import ApprovalFlow from "./approval-flow-two";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ApprovalFlowOne from "./approval-flow-one";
import ApprovalFlowTwo from "./approval-flow-two";

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
      router.push(Routes.ChecklistRoute.ChecklistOverview());
    } else {
      router.push(`${location}?ui=approval-flow-step-two`);
    }
  };

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      step="step 2 of 2"
      title="Mission Plan Flow"
      showBtn
      shouldProceed
      onProceedBtn={handleProceed}
    >
      <form
        className="mt-5 w-full"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col gap-4 mb-10">
          <p className="font-medium text-sm">Approval Flow</p>
          <p className="text-sm font-normal text-custom-gray-scale-400">
            Arrange how you want your mission plan approval flow should process
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
    </ChecklistLayout>
  );
};

export default AddApprovalFlow;
