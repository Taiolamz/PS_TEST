import React, { useEffect, useMemo, useState } from "react";
import MeasureOfSuccessTable from "./measure-of-success-table";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import { Button } from "@/components/ui/button";
import Comment from "./comment";
import { MeasureOfSuccessType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments, { CommentType } from "./useGetComments.hook";
import { Loader2 } from "lucide-react";
import { findItemById, getStatus } from "@/utils/helpers";
import { EditableLabel } from "@/components/fragment";
import useGetAllComments from "./useGetAllComments.hook";
import MultipleComment from "./multipleComments";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: MeasureOfSuccessType[];
  approvables?: [];
  loading: boolean;
  approveLoading?: boolean;
};

const MeasureOfSuccess = ({
  setShowTextArea,
  showTextArea,
  data,
  approvables,
  loading,
  approveLoading,
}: Props) => {
  const approvableTypeId = data?.map((item) => item.id as string);
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const measureColumnData = useMemo(() => measureColumns(), []);
  const approval_type = "success-measure";
  const commentItem = useGetAllComments({ approvables, approval_type });
  const [matchingIds, setMatchingIds] = useState<any>([]);
  const [allComments, setAllComments] = useState<CommentType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [itemsToApprove, setItemsToApprove] = useState<itemsApprove[]>([]);
  const [selectedId, setSelectedID] = useState<string>("");

  console.log("commentItem", commentItem);

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

  useEffect(() => {
    if (commentItem.length !== 0) {
      setAllComments(commentItem);
    }
  }, [commentItem]);

  const transformedMeasureOfSuccessRows = (
    mappedData: MeasureOfSuccessType[]
  ): MeasureOfSuccessType[] => {
    return mappedData.map((item, index) => ({
      id: item.id,
      measure: item.measure,
      status: item.status,
      target: item.target,
      unit: item.unit,
      weight: `${Math.round(parseInt(item?.weight))}%`,
      actions: (
        <div
          className="flex gap-2.5 ml-[40px] items-end justify-end"
          key={index}
        >
          {!loading &&
            data?.length !== null &&
            findItemById(matchingIds ?? [], item?.id as string)?.status ===
              "pending" &&
            findItemById(matchingIds ?? [], item?.id as string)?.status !==
              "rejected" &&
            findItemById(matchingIds ?? [], item?.id as string)?.status !==
              "approved" && (
              <div className="flex gap-2.5 mr-4">
                <Button
                  variant="outline"
                  size={"sm"}
                  className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                  onClick={() => {
                    const filteredComments = commentItem.find(
                      (comment) => comment.id === item.id
                    );
                    setShowTextArea(true);
                    setSelectedID(item.id as string);
                    setItemsToApprove((prevItems: any) => {
                      const itemExists = prevItems.some(
                        (items: itemsApprove) => items.id === item.id
                      );

                      if (itemExists) {
                        // If the item exists, update the existing item
                        return prevItems.map((items: itemsApprove) =>
                          items.id === item.id
                            ? {
                                ...items,
                                status: "rejected",
                                comments: filteredComments?.comment ?? [], // Update the comments
                              }
                            : items
                        );
                      }

                      // If the item doesn't exist, add the new item and ensure no duplicates
                      return [
                        ...prevItems.filter(
                          (items: itemsApprove) => items.id !== item.id
                        ),
                        {
                          id: item.id,
                          status: "rejected",
                          comments: filteredComments?.comment ?? [],
                        },
                      ];
                    });

                    handleReject();
                  }}
                  loading={
                    isLoading &&
                    actionType === "rejected" &&
                    findItemById(matchingIds ?? [], item?.id as string)
                      ?.approvable_id === selectedId
                  }
                  disabled={
                    (isLoading &&
                      actionType === "rejected" &&
                      findItemById(matchingIds ?? [], item?.id as string)
                        ?.approvable_id === selectedId) ||
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
                    setSelectedID(item.id as string);
                    setItemsToApprove((prevItems: any) => {
                      const itemExists = prevItems.some(
                        (items: itemsApprove) => items.id === item.id
                      );

                      if (itemExists) {
                        // If the item exists, update the existing item
                        return prevItems.map((items: itemsApprove) =>
                          items.id === item.id
                            ? {
                                ...items,
                                status: "approved",
                                comments: [], // Update the comments
                              }
                            : items
                        );
                      }

                      // If the item doesn't exist, add the new item and ensure no duplicates
                      return [
                        ...prevItems.filter(
                          (items: itemsApprove) => items.id !== item.id
                        ),
                        {
                          id: item.id,
                          status: "approved",
                          comments: [],
                        },
                      ];
                    });

                    handleApprove();
                  }}
                  loading={
                    isLoading &&
                    actionType === "approved" &&
                    findItemById(matchingIds ?? [], item?.id as string)
                      ?.approvable_id === selectedId
                  }
                  disabled={
                    (isLoading &&
                      actionType === "approved" &&
                      findItemById(matchingIds ?? [], item?.id as string)
                        ?.approvable_id === selectedId) ||
                    approvables?.length === 0 ||
                    approveLoading
                  }
                >
                  Approve
                </Button>
              </div>
            )}
          {/* {!loading &&
            data?.length !== null &&
            findItemById(matchingIds ?? [], item?.id as string)?.status ===
              "pending" &&
            isSuccess && <EditableLabel status={actionType} />} */}
          {!loading &&
            !isLoading &&
            data?.length !== null &&
            findItemById(matchingIds ?? [], item?.id as string)?.status ===
              "pending" &&
            findItemById(matchingIds ?? [], item?.id as string)
              ?.approvable_id === selectedId &&
            isSuccess && <EditableLabel status={actionType} />}
          {!loading &&
            data?.length !== null &&
            findItemById(matchingIds ?? [], item?.id as string)?.status !==
              "pending" && (
              <EditableLabel
                status={`${
                  findItemById(matchingIds ?? [], item?.id as string)?.status
                }`}
              />
            )}
        </div>
      ),
    }));
  };

  const measureOfSuccessData: MeasureOfSuccessType[] =
    transformedMeasureOfSuccessRows(data);

  const initialActionType = "";

  const { handleReject, handleApprove, FormikApprovalForm } = useApproval({
    initialComments: [],
    initialActionType,
    missionplanid,
    approval_type,
    setIsLoading,
    setActionType,
    setIsSuccess,
    approvableTypeId: matchingIds,
    itemsToApprove,
    setItemsToApprove,
    setSelectedID,
  });

  useEffect(() => {
    const status = getStatus(
      approvables,
      approval_type,
      matchingIds[0]
    ) as string;

    setStatus(status);
  }, [data]);

  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
          Measure of Success
        </h2>
        <div className="flex justify-between items-end">
          <div className="w-full">
            {loading ? (
              <div className="w-full flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-1" />
              </div>
            ) : (
              <div className="basis-3/4">
                <MeasureOfSuccessTable
                  data={measureOfSuccessData}
                  columns={measureColumnData}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {showTextArea && ( */}
      <MultipleComment
        label="measure of success"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={allComments}
        setComments={setAllComments}
        formik={FormikApprovalForm}
        id={selectedId}
      />
      {/* )} */}
    </section>
  );
};

export default MeasureOfSuccess;
