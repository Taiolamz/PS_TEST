import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import React from "react";
import Comment from "./comment";
import { MissionStatementType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";
import { EditableLabel } from "@/components/fragment";
import { getStatus } from "@/utils/helpers";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data?: MissionStatementType;
  approvables?: [];
  setApprovalTypeId?: (e: string) => void;
  loading: boolean;
  approveLoading?: boolean;
};
const MissionStatement = ({
  setShowTextArea,
  showTextArea,
  data,
  approvables,
  // setApprovalTypeId,
  loading,
  approveLoading,
}: Props) => {
  const approvableTypeId = data?.id as string;
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";
  const approval_type = "mission-statement";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [itemsToApprove, setItemsToApprove] = useState<itemsApprove[]>([]);

  const { handleReject, handleApprove, FormikApprovalForm } = useApproval({
    initialComments: comments?.comment,
    initialActionType,
    missionplanid,
    approval_type,
    setIsLoading,
    setActionType,
    setIsSuccess,
    approvableTypeId,
    itemsToApprove,
    setItemsToApprove,
  });

  useEffect(() => {
    const status = getStatus(
      approvables,
      approval_type,
      approvableTypeId
    ) as string;

    setStatus(status);
  }, [data]);
  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
          Mission Statement
        </h2>
        <div className="flex justify-between items-end w-full">
          {loading && (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin mr-1" />
            </div>
          )}
          {!loading && (
            <p className="w-[52%] text-[#162238] text-sm">
              {data?.mission ?? "No Mission Statement"}
            </p>
          )}
          {!loading &&
            data?.mission !== null &&
            status === "pending" &&
            !isSuccess && (
              <div className="flex gap-2.5 mr-4">
                <Button
                  variant="outline"
                  size={"sm"}
                  className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                  onClick={() => {
                    setShowTextArea(true);
                    setItemsToApprove((prevItems) => {
                      const itemExists = prevItems.some(
                        (item) => item.id === approvableTypeId
                      );

                      if (itemExists) {
                        return prevItems.map((item) =>
                          item.id === approvableTypeId
                            ? {
                                ...item,
                                status: "rejected",
                                comments: comments?.comment,
                              } // Update the existing item
                            : item
                        );
                      }

                      return [
                        ...prevItems,
                        {
                          id: approvableTypeId,
                          status: "rejected",
                          comments: comments?.comment,
                        },
                      ];
                    });

                    handleReject();
                  }}
                  loading={isLoading && actionType === "rejected"}
                  disabled={
                    (isLoading && actionType === "rejected") ||
                    approvables?.length === 0 ||
                    approveLoading
                  }
                >
                  Reject
                </Button>
                <Button
                  size={"sm"}
                  onClick={() => {
                    setShowTextArea(true);
                    setItemsToApprove((prevItems) => {
                      const itemExists = prevItems.some(
                        (item) => item.id === approvableTypeId
                      );

                      if (itemExists) {
                        return prevItems.map((item) =>
                          item.id === approvableTypeId
                            ? {
                                ...item,
                                status: "approved",
                                // comments: comments?.comment,
                              } // Update the existing item
                            : item
                        );
                      }

                      return [
                        ...prevItems,
                        {
                          id: approvableTypeId,
                          status: "approved",
                          // comments: comments?.comment,
                        },
                      ];
                    });

                    handleApprove();
                  }}
                  loading={isLoading && actionType === "approved"}
                  disabled={
                    (isLoading && actionType === "approved") ||
                    approvables?.length === 0 ||
                    approveLoading
                  }
                >
                  Approve
                </Button>
              </div>
            )}
          {!loading &&
            data?.mission.length !== 0 &&
            status === "pending" &&
            isSuccess && <EditableLabel status={actionType} />}
          {!loading && data?.mission.length !== 0 && status !== "pending" && (
            <EditableLabel status={status ?? ""} />
          )}
        </div>
      </div>
      {/* {showTextArea && ( */}
      <Comment
        label="Mission statement"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={comments}
        formik={FormikApprovalForm}
      />
      {/* )} */}
    </section>
  );
};

export default MissionStatement;
