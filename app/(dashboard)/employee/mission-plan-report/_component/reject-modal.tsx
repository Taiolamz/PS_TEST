import React from "react";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ModalContainer from "@/components/modal-container";
import { useApproveORRejectTaskOutcomeMutation } from "@/redux/services/mission-plan/reports/employee/missionPlanReportApi";
import { toast } from "sonner";
import { getCurrentMonth } from "@/utils/helpers/date-formatter";
import { trimLongString } from "@/app/(dashboard)/_layout/Helper";
export default function RejectModal({
  show,
  handleClose,
  loading,
  // handleSubmit,
  data,
  approvableType,
  approvableAction,
}: {
  show: boolean;
  handleClose: () => void;
  loading?: boolean;
  // handleSubmit: (value: { message: string }) => void;
  data?: any;
  approvableType?: string;
  approvableAction?: string;
}) {
  const [approveORRejectTaskOutcome, { isLoading, data: taskData }] =
    useApproveORRejectTaskOutcomeMutation();

  const handleSubmit = async () => {
    const payload = {
      approvable_id: data?.task_outcome?.id,
      approvable_type: approvableType,
      status: "rejected",
      action: approvableAction,
      comments: formik.values.message,
    };
    await approveORRejectTaskOutcome(payload)
      .unwrap()
      .then(() => {
        toast.success(
          `${getCurrentMonth()} (${trimLongString(
            data?.task_outcome?.expected_outcome,
            15
          )}) Expected Outcome Rejected Successfully`
        );
        handleClose();
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: handleSubmit,
    // onSubmit: (value) => handleSubmit(value),
    validationSchema: Yup.object({
      message: Yup.string()
        .min(10, "Message must be at least 10 characters") // Minimum 10 characters
        .required("Please provide a valid reason"),
    }),
  });

  React.useEffect(() => {
    formik.resetForm();
  }, [show]);

  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="min-h-[331px] !w-[423px] rounded "
    >
      <div className="absolute top-0">
        <form onSubmit={formik.handleSubmit} className="w-full p-4 px-6 ">
          <div className="flex justify-between items-center mt-3 mb-[18px]">
            <h4 className="text-[var(--bg-red-100)]">Reject Submission</h4>
            <X className="size-[18px] cursor-pointer" onClick={handleClose} />
          </div>
          <Textarea
            id="message"
            name="message"
            className="w-full h-[100px] resize-none my-2"
            onChange={formik.handleChange}
            value={formik.values.message}
            error={formik.errors.message}
            touched={formik.touched.message}
          />

          <p className="text-[var(--text-color4)] text-sm text-left select-none">
            You’re about to reject this submission. This action will send a
            notification to the user with your comment. Press the button below
            to proceed?
          </p>
          <div className="flex items-center justify-end space-x-4 select-none">
            <Button
              type="button"
              onClick={handleClose}
              disabled={loading}
              variant={"outline"}
              className={cn(
                "font-light rounded mt-5 border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-accent-color)]"
              )}
            >
              No
            </Button>
            <Button
              type="submit"
              // loading={loading}
              // onClick={handleSubmit}
              loading={isLoading}
              // loadingText="Yes, Reject"
              loadingText="Rejecting..."
              disabled={loading}
              className={cn(
                "font-light ml-4 rounded mt-5 bg-[var(--bg-red-100)]"
              )}
            >
              Yes, Reject
            </Button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
}
