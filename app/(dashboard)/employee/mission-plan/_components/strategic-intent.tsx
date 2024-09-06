import React, { useState, useEffect } from "react";
import Comment from "./comment";
import { Button } from "@/components/ui/button";
// import { useApproveMissionPlanItemsMutation } from "@/redux/services/mission-plan/approveItemsApi";
// import { Formik, useFormik } from "formik";
import { StrategicIntentType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
// import { ApprovalItemsSchema } from "@/utils/schema/mission-plan";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";
import { findItemById } from "@/utils/helpers";
import { EditableLabel } from "@/components/fragment";

type Props = {
  data: StrategicIntentType[];
  approvables?: [];
  loading: boolean;
};

const StrategicIntent = ({ data, approvables, loading }: Props) => {
  const approvableTypeId = data?.map((item) => item.id as string);
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const comments = useGetComments({ approvables, approvableTypeId });
  const initialActionType = "";

  const approval_type = "strategic-intent";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedId, setSelectedID] = useState<string>("");
  const [matchingIds, setMatchingIds] = useState<any>([]);
  const [itemsToApprove, setItemsToApprove] = useState<itemsApprove[]>([]);
  useEffect(() => {
    const matchingIds: any =
      approvables !== undefined &&
      approvables
        .filter((item: approveItems) => item.approvable_type === approval_type)
        .map((item: approveItems) => {
          return {
            approvable_id: item.approvable_id,
            status: item.status,
          };
        });
    setMatchingIds(matchingIds);
  }, [data]);

  const {
    openCommentId,
    toggleComment,
    handleReject,
    handleApprove,
    FormikApprovalForm,
  } = useApproval({
    initialComments: comments?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
    setIsLoading,
    setActionType,
    setIsSuccess,
    approvableTypeId: selectedId,
    itemsToApprove,
    setItemsToApprove,
  });

  return (
    <div className="flex flex-col gap-10">
      {loading && (
        <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
          <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
            Strategic Intent
          </h2>

          <div className="w-full flex justify-center items-center">
            <Loader2 className="w-6 h-6 animate-spin mr-1" />
          </div>
        </div>
      )}
      {!loading &&
        data?.length !== 0 &&
        data?.map((item, index) => (
          <section key={item?.id}>
            <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5 text-sm text-[#162238]">
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Strategic Intent
              </h2>
              <div className="mt-2.5 ml-1.5">
                <h3 className="font-normal">- Strategic Intent {index + 1}</h3>
                <div className="flex justify-between items-end">
                  <div className="ml-3">
                    <p className="mt-2 font-light">
                      <span className="font-normal">Intent:</span>{" "}
                      {item?.intent}
                    </p>
                    <p className="mt-1 font-light">
                      <span className="font-normal">Behaviors: </span>
                      {item?.behaviours}
                    </p>
                  </div>
                  {!loading &&
                    data?.length !== null &&
                    findItemById(matchingIds ?? [], item?.id)?.status ===
                      "pending" &&
                    !isSuccess && (
                      <div className="flex gap-2.5 mr-4">
                        <Button
                          variant="outline"
                          size={"sm"}
                          className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                          onClick={() => {
                            setSelectedID(item?.id);
                            setItemsToApprove((prevItems) => {
                              const itemExists = prevItems.some(
                                (items) => items.id === item.id
                              );

                              if (itemExists) {
                                return prevItems.map((items) =>
                                  items.id === item.id
                                    ? {
                                        ...items,
                                        status: "rejected",
                                        comments: comments?.comment,
                                      } // Update the existing item
                                    : items
                                );
                              }

                              return [
                                ...prevItems,
                                {
                                  id: item.id,
                                  status: "rejected",
                                  comments: comments?.comment,
                                },
                              ];
                            });
                            handleReject(item.id);
                          }}
                          loading={
                            isLoading &&
                            actionType === "rejected" &&
                            selectedId === item?.id
                          }
                          disabled={
                            (isLoading &&
                              actionType === "rejected" &&
                              selectedId === item?.id) ||
                            approvables?.length === 0
                          }
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedID(item?.id);
                            handleApprove();
                          }}
                          loading={
                            isLoading &&
                            actionType === "approved" &&
                            selectedId === item?.id
                          }
                          disabled={
                            isLoading &&
                            actionType === "approved" &&
                            selectedId === item?.id
                          }
                          className="hidden"
                        >
                          Approve
                        </Button>
                      </div>
                    )}
                  {!isLoading &&
                    data?.length !== null &&
                    findItemById(matchingIds, item?.id)?.status === "pending" &&
                    isSuccess && <EditableLabel status={actionType} />}
                  {!isLoading &&
                    data?.length !== null &&
                    findItemById(matchingIds, item?.id)?.status !== "pending" &&
                    !isSuccess && (
                      <EditableLabel
                        status={
                          findItemById(matchingIds, item?.id)?.status ??
                          "pending"
                        }
                      />
                    )}
                </div>
              </div>
            </div>
            <Comment
              label="Strategic intent"
              showTextArea={openCommentId === item.id}
              setShowTextArea={() => toggleComment(item.id)}
              comments={comments}
              formik={FormikApprovalForm}
            />
          </section>
        ))}
      {!loading && data?.length === 0 && (
        <>
          <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] text-sm text-[#162238]">
            <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
              Strategic Intent
            </h2>
            <div className="mt-2.5 ml-1.5">
              <h3 className="font-normal">No Strategic Intent Found</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StrategicIntent;
