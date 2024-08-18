// hooks/useApproval.ts
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useApproveMissionPlanItemsMutation } from "@/redux/services/mission-plan/approveItemsApi";
import { ApprovalItemsSchema } from "@/utils/schema/mission-plan";
import { toast } from "sonner";

type ApprovablesType = {
  comments: string[];
  approvable_id: string;
};
type Props = {
  approvableTypeId?: string;
  initialComments: string[];
  initialActionType: string;
  missionplanid: string;
  approval_type?: string;
  approvables?: ApprovablesType[] | [];
};

export const useApproval = ({
  initialComments,
  initialActionType,
  missionplanid,
  approval_type,
  approvableTypeId,
  approvables,
}: Props) => {
  const [comments, setComments] = useState<string[] | []>();
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [approveMissionPlanItems] = useApproveMissionPlanItemsMutation();

  const FormikApprovalForm = useFormik({
    initialValues: {
      // comments: [...initialComments],
      comments: initialComments,
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
    toggleComment(id as string);
  };

  const handleApprove = () => {
    FormikApprovalForm.setFieldValue("actionType", "approved");
    FormikApprovalForm.handleSubmit();
  };

  const handleSubmit = async (allComments: string[]) => {
    toast.loading("Processing...");
    const payload = {
      mission_plan_id: missionplanid,
      approval_type: `${approval_type}`,
      status: FormikApprovalForm.values.actionType,
      comments: allComments,
    };
    try {
      await approveMissionPlanItems(payload).unwrap();
      toast.dismiss();
      toast.success("Approval status updated successfully");
    } catch (error) {
      toast.dismiss();
      console.error(error);
    }
  };

  // Get comments
  // const getCommentsFromApprovables = () => {
  //   const approvable = approvables?.find(
  //     (approvable) =>
  //       approvable?.approvable_id === approvableTypeId &&
  //       approvable?.comments?.length > 0
  //   );

  //   if (approvable) {
  //     setComments([...approvable.comments]);
  //   }
  // };

  // useEffect(() => {
  //   getCommentsFromApprovables();
  // }, [approvableTypeId]);

  return {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
    comments,
  };
};
