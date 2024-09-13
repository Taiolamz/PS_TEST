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
  setSelectedID?: (value: string) => void;
  setItemsToApprove?: (value: itemsApprove[]) => void;
  approvableTypeId?: string;
  itemsToApprove?: itemsApprove[];
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
  itemsToApprove,
  setItemsToApprove,
  setSelectedID,
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
          ? // ? [...values.comments, values.newComment]
            [values.newComment]
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
  };

  const handleSubmit = async (allComments: string[]) => {
    toast.loading("Processing...");
    setIsLoading && setIsLoading(true);

    const updatedItemsToApprove =
      itemsToApprove !== undefined
        ? itemsToApprove.map((item) => ({
            ...item,
            // comments: allComments,
            // Add the comments key only if actionType is "rejected"
            ...(FormikApprovalForm?.values?.actionType === "rejected"
              ? {
                  comments: allComments,
                }
              : {
                  comments: [],
                }),
          }))
        : [];

    const payload = {
      mission_plan_id: missionplanid,
      approval_type: `${approval_type}`,
      items_to_approve: updatedItemsToApprove,
      // status: FormikApprovalForm.values.actionType,
      // comments: allComments,
      // approvable_id: approvableTypeId ?? "",
    };

    try {
      await approveMissionPlanItems(payload).unwrap();
      toast.dismiss();
      setIsSuccess && setIsSuccess(true);
      setItemsToApprove && setItemsToApprove([]);

      setTimeout(() => {
        toast.dismiss();
        toast.success("Approval status updated successfully");
        setIsLoading && setIsLoading(false);
        setIsSuccess && setIsSuccess(false);
        setSelectedID && setSelectedID("");
      }, 15000);
    } catch (error) {
      setIsLoading && setIsLoading(false);
      setIsSuccess && setIsSuccess(false);
      setItemsToApprove && setItemsToApprove([]);
      setSelectedID && setSelectedID("");
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
