import { useMemo } from "react";

type ApprovablesType = {
  comments: string[];
  approvable_id: string;
  approver: { name: string };
  created_at: string;
  approval_type: string;
};

type CommentType = {
  id: string;
  title: string;
  author: string;
  comment: string[];
  date: string;
  time: string;
};

type Props = {
  approvableTypeId?: string | string[];
  approvables?: ApprovablesType[] | [];
};

const useGetComments = ({
  approvables,
  approvableTypeId,
}: Props): CommentType | {} => {
  return useMemo(() => {
    const approvable = approvables?.find((approvable) => {
      if (Array.isArray(approvableTypeId)) {
        return (
          approvableTypeId.includes(approvable?.approvable_id) &&
          approvable?.comments?.length > 0
        );
      }
      return (
        approvable?.approvable_id === approvableTypeId &&
        approvable?.comments?.length > 0
      );
    });

    if (approvable) {
      const { approver, created_at, approvable_type, comments } = approvable;

      const date = new Date(created_at);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();

      return {
        id: Array.isArray(approvableTypeId)
          ? approvableTypeId.join(",")
          : approvableTypeId || "",
        title: approvable_type,
        author: approver.name,
        comment: comments,
        date: formattedDate,
        time: formattedTime,
      };
    }

    return {};
  }, [approvables, approvableTypeId]);
};

export default useGetComments;
