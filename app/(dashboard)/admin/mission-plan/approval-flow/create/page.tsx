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
import DashboardModal from "../../template/_components/checklist-dashboard-modal";
import CancelModal from "../../template/_components/cancel-modal";

const { ADMIN } = routesPath;

const AddApprovalFlow = () => {
  const cancelRoute = ADMIN.CHECKLIST;
  const router = useRouter();
  const {
    formik,
    handleProceedCancel,
    openCancelModal,
    handleCancelDialog,
    reviewers,
    level,
<<<<<<< HEAD
  } = useMissionApprovalFlow({ cancelPath: cancelRoute });

  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");

  const handleProceed = () => {
    if (ui === "approval-flow-step-two") {
      router.push(ADMIN.CHECKLIST);
    } else {
      router.push(`${location}?ui=approval-flow-step-two`);
    }
  };

=======
    handleProceed,
    ui,
    isCreatingMissionFlow,
  } = useMissionApprovalFlow({ cancelPath: cancelRoute });

>>>>>>> 8704a0d605738538a2ba3ccc2f8f00d76ec9dd37
  return (
    <DashboardLayout headerTitle="Mission Plan Flow">
      <ReusableStepListBox
        btnText="Continue"
        activeStep="2"
        totalStep="2"
        title="Mission Plan Template"
        onSave={handleProceed}
        onCancel={handleCancelDialog}
<<<<<<< HEAD
=======
        loading={isCreatingMissionFlow}
>>>>>>> 8704a0d605738538a2ba3ccc2f8f00d76ec9dd37
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
<<<<<<< HEAD
            <ApprovalFlowTwo options={level} />
=======
            <ApprovalFlowTwo
              options={level}
              reviewersOption={reviewers}
              approvalsArray={formik.values.order_of_approvals}
              setOrderValue={formik.setFieldValue}
            />
>>>>>>> 8704a0d605738538a2ba3ccc2f8f00d76ec9dd37
          ) : null}
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
