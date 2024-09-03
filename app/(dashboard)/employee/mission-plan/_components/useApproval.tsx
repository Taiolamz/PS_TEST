// hooks/useApproval.ts
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { useApproveMissionPlanItemsMutation } from "@/redux/services/mission-plan/approveItemsApi";
import { ApprovalItemsSchema } from "@/utils/schema/mission-plan";
import { toast } from "sonner";
import ActionContext from "@/app/(dashboard)/context/ActionContext";
import { addAlphaToHex } from "@/utils/helpers/add-alpha-to-hex";

type Props = {
  initialComments: string[];
  initialActionType: string;
  missionplanid: string;
  approval_type?: string;
  setIsLoading?: (value: boolean) => void;
  setIsSuccess?: (value: boolean) => void;
  setActionType?: (value: string) => void;
  approvableTypeId?: string;
};

export const useApproval = ({
  initialComments,
  initialActionType,
  missionplanid,
  approval_type,
  setIsLoading,
  setActionType,
  setIsSuccess,
  approvableTypeId,
}: Props) => {
  const { primaryColorHexValue } = useContext(ActionContext);
  const colorWithAlpha = primaryColorHexValue
    ? addAlphaToHex(primaryColorHexValue, 0.05)
    : "";
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [approvalTimeout, setApprovalTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [approveMissionPlanItems] = useApproveMissionPlanItemsMutation();

  const FormikApprovalForm = useFormik({
    initialValues: {
      comments: [...initialComments],
      newComment: "",
      actionType: initialActionType,
    },
    validationSchema: ApprovalItemsSchema,
    onSubmit: async (values) => {
      const allComments =
        values.actionType === "rejected"
          ? [...values.comments, values.newComment]
          : [...values.comments];
      FormikApprovalForm.setFieldValue("comments", allComments);
      FormikApprovalForm.setFieldValue("newComment", "");
      await handleSubmit(allComments);
    },
  });

  const toggleComment = (id: string) => {
    setOpenCommentId((prevId) => (prevId === id ? null : id));
  };

  const handleReject = (id?: string) => {
    FormikApprovalForm.setFieldValue("actionType", "rejected");
    setActionType && setActionType("rejected");
    toggleComment(id as string);
  };

  const handleApprove = () => {
    FormikApprovalForm.setFieldValue("actionType", "approved");
    setActionType && setActionType("approved");
    FormikApprovalForm.handleSubmit();
    // const timeoutId = setTimeout(() => {
    //   FormikApprovalForm.handleSubmit();
    //   FormikApprovalForm.setFieldValue("actionType", "approved");
    // }, 5000);
    // setApprovalTimeout(timeoutId);
    // toast(
    //   <div className="flex gap-5 items-center">
    //     <div className="flex-1">
    //       <p className="text-primary text-base font-semibold">Approval</p>
    //       <p className="text-gray-400 text-sm">This item is about to be approved</p>
    //     </div>
    //     <button
    //       onClick={() => {
    //         clearTimeout(timeoutId);
    //         setApprovalTimeout(null);
    //         toast.dismiss();
    //       }}
    //       className="text-primary py-1 px-3 rounded-lg bg-primary-foreground"
    //       style={{
    //         backgroundColor: colorWithAlpha,
    //       }}
    //     >
    //       Cancel
    //     </button>
    //   </div>, {
    //   onAutoClose() {
    //     if (approvalTimeout) {
    //       clearTimeout(approvalTimeout);
    //     }
    //   },
    //   closeButton: false,
    //   duration: 5000,
    // },
    // )
  };

  const handleSubmit = async (allComments: string[]) => {
    toast.loading("Processing...");
    setIsLoading && setIsLoading(true);
    const payload = {
      mission_plan_id: missionplanid,
      approval_type: `${approval_type}`,
      status: FormikApprovalForm.values.actionType,
      comments: allComments,
      approvable_id: approvableTypeId ?? "",
    };
    try {
      await approveMissionPlanItems(payload).unwrap();
      toast.dismiss();
      setIsLoading && setIsLoading(false);
      setIsSuccess && setIsSuccess(true);
      toast.success("Approval status updated successfully");
    } catch (error) {
      setIsLoading && setIsLoading(false);
      setIsSuccess && setIsSuccess(false);
      toast.dismiss();
      console.error(error);
    }
  };

  return {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
  };
};
