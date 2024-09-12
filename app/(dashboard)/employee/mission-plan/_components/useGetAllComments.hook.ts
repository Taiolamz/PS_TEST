import { useMemo } from "react";

type ApprovablesType = {
  comments: string[];
  approvable_id: string;
  approver: { name: string };
  created_at: string;
  approvable_type: string;
  status: string;
};

export type CommentType = {
  id: string;
  title: string;
  author: string;
  comment: string[];
  date: string;
  time: string;
  status?: string;
};

type Props = {
  approvables?: ApprovablesType[] | [];
  approval_type?: string;
};

const useGetAllComments = ({
  approvables,
  approval_type,
}: Props): CommentType[] => {
  return useMemo(() => {
    const matchingApprovables = approvables?.filter(
      (approvable) =>
        approvable?.approvable_type === approval_type &&
        approvable?.comments?.length > 0
    );

    if (matchingApprovables && matchingApprovables.length > 0) {
      return matchingApprovables.map((approvable) => {
        const { approver, created_at, approvable_type, comments, status } =
          approvable;
        const date = new Date(created_at);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        return {
          id: approvable.approvable_id,
          title: approvable_type,
          author: approver.name,
          comment: comments,
          date: formattedDate,
          time: formattedTime,
          status: status,
        };
      });
    }

    return [];
  }, [approvables, approval_type]);
};

export default useGetAllComments;
