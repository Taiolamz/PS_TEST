"use client";
import { Select } from "@/components/ui/select";
import React, { useState } from "react";

import { useMissionApprovalFlow } from "../../../_hooks/useMissionApprovalFlow";
import Routes from "@/lib/routes/routes";
import { ChecklistLayout } from "../../../_components/checklist-layout";
import CustomSelect from "@/components/custom-select";

const AddApprovalFlow = () => {
  const cancelRoute = Routes.ChecklistRoute.ChecklistOverview();
  const {
    formik,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    reviewers,
    level,
  } = useMissionApprovalFlow({ cancelPath: cancelRoute });

  return (
    <ChecklistLayout
      onCancel={handleCancelDialog}
      className="flex"
      step="step 2 of 2"
      title="Mission Plan Flow"
      showBtn
    >
      <form
        className="mt-5 max-w-full"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 mb-10">
            <p className="font-medium text-sm">Approval Flow</p>
            <p className="text-sm font-normal text-custom-gray-scale-400">
              Arrange how you want your mission plan approval flow should
              process
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <p className="font-normal text-[16px]">
                1. How many levels of approval should be for employee mission
                plan
              </p>
              <CustomSelect
                isRequired
                placeholder="Select..."
                options={level}
                className=" w-[127px]"
                selected={formik.values.level}
                setSelected={(value) => formik.setFieldValue("level", value)}
              />
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <p className="font-normal text-[16px]">
                2. Who reviews MD mission plan?
              </p>
              <CustomSelect
                isRequired
                placeholder="Select..."
                options={reviewers}
                className=" w-[303px]"
                selected={formik.values.reviewers}
                setSelected={(value) =>
                  formik.setFieldValue("reviewers", value)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </ChecklistLayout>
  );
};

export default AddApprovalFlow;
