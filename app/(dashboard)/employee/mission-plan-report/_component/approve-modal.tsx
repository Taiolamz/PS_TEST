import React from "react";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useApproveORRejectTaskOutcomeMutation } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { toast } from "sonner";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import { trimLongString } from "@/app/(dashboard)/_layout/Helper";

export default function ApproveModal({
  show,
  desc,
  handleClose,
  loading,
  title,
  // handleSubmit,
  data,
  approvableType,
  approvableAction,
}: {
  show: boolean;
  handleClose: () => void;
  // handleSubmit: () => void;
  desc?: string;
  title?: string;
  id?: string;
  loading?: boolean;
  data?: any;
  approvableType?: string;
  approvableAction?: string;
}) {
  console.log(data, "data check");

  const [approveORRejectTaskOutcome, { isLoading, data: taskData }] =
    useApproveORRejectTaskOutcomeMutation();

  const handleApproveTaskOutcome = async () => {
    const payload = {
      approvable_id: data?.task_outcome?.id,
      approvable_type: approvableType,
      status: "approved",
      action: approvableAction,
      comments: "",
    };
    await approveORRejectTaskOutcome(payload)
      .unwrap()
      .then(() => {
        toast.success(
          `${getCurrentMonth()} (${trimLongString(
            data?.task_outcome?.expected_outcome,
            15
          )}) Expected Outcome Approved Successfully`
        );
        handleClose();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="!min-h-[220px] !min-w-[373px] rounded "
    >
      <div className="absolute top-0 text-right select-none ">
        <div className="  w-full p-4 px-6 ">
          <div className="flex justify-between items-center mt-3 mb-[18px]">
            <h4 className="font-medium ">
              {title
                ? title
                : `Approve(${
                    trimLongString(data?.task_outcome?.expected_outcome, 15) ||
                    ""
                  }) ?`}
            </h4>
            <X className="size-[18px] cursor-pointer" onClick={handleClose} />
          </div>
          <p className="text-[var(--text-color4)] text-sm text-left">
            {desc
              ? desc
              : ` Are you sure you want to approve this submission. Approving will
            send this submission to the next approval line, press the button
            below to proceed.  `}
          </p>
          <div className="flex justify-end items-end space-x-4 mt-5">
            <Button
              onClick={handleClose}
              disabled={loading}
              variant={"outline"}
              className={cn(
                "font-light rounded border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-accent-color)]"
              )}
            >
              Review Inputs
            </Button>
            <Button
              // loading={loading}
              loading={isLoading}
              loadingText="Submitting..."
              // loadingText="Yes, Submit"
              disabled={loading}
              // onClick={handleSubmit}
              onClick={handleApproveTaskOutcome}
              className={cn("font-light rounded")}
            >
              Yes, Submit
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
