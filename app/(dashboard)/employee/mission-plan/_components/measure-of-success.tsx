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
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";
import { findItemById, getStatus } from "@/utils/helpers";
import { EditableLabel } from "@/components/fragment";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: MeasureOfSuccessType[];
  approvables?: [];
  loading: boolean;
};

const MeasureOfSuccess = ({
  setShowTextArea,
  showTextArea,
  data,
  approvables,
  loading,
}: Props) => {
  const approvableTypeId = data?.map((item) => item.id as string);
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const measureColumnData = useMemo(() => measureColumns(), []);
  const commentItem = useGetComments({ approvables, approvableTypeId });
  const approval_type = "success-measure";
  const matchingIds: any =
    approvables !== undefined &&
    approvables
      .filter((item: approveItems) => item.approvable_type === approval_type)
      .map((item: approveItems) => item.approvable_id);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [itemsToApprove, setItemsToApprove] = useState<itemsApprove[]>([]);

  const transformedMeasureOfSuccessRows = (
    mappedData: MeasureOfSuccessType[]
  ): MeasureOfSuccessType[] => {
    return mappedData.map((item, index) => ({
      id: item.id,
      measure: item.measure,
      status: item.status,
      target: item.target,
      unit: item.unit,
      actions: (
        <div className="flex gap-2.5 ml-[40px] items-end justify-end" key={index}>
          {!loading &&
            data?.length !== null &&
            status === "pending" &&
            !isSuccess && (
              <Button
                variant="outline"
                size={"sm"}
                className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                onClick={() => {
                  setShowTextArea(true);

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
                              comments: commentItem?.comment ?? [], // Update the comments
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
                        comments: commentItem?.comment ?? [],
                      },
                    ];
                  });

                  handleReject();
                }}
                loading={isLoading && actionType === "rejected"}
                disabled={
                  (isLoading && actionType === "rejected") ||
                  approvables?.length === 0
                }
              >
                Reject
              </Button>
            )}
          {!isLoading &&
            data?.length !== null &&
            findItemById(matchingIds ?? [], item?.id as string)
            ?.status  === "pending" &&
            isSuccess && <EditableLabel status={actionType} />}
          {!isLoading &&
            data?.length !== null &&
            findItemById(matchingIds ?? [], item?.id as string)?.status !== "pending" &&
            !isSuccess && <EditableLabel status={status ?? ""} />}
        </div>
      ),
    }));
  };

  const measureOfSuccessData: MeasureOfSuccessType[] =
    transformedMeasureOfSuccessRows(data);

  const initialActionType = "";

  const { handleReject, handleApprove, FormikApprovalForm } = useApproval({
    initialComments: commentItem?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
    setIsLoading,
    setActionType,
    setIsSuccess,
    approvableTypeId: matchingIds,
    itemsToApprove,
    setItemsToApprove,
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
      <Comment
        label="measure of success"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={commentItem}
        formik={FormikApprovalForm}
      />
      {/* )} */}
    </section>
  );
};

export default MeasureOfSuccess;
