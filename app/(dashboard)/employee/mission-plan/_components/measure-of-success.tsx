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
import { getStatus } from "@/utils/helpers";
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

  const transformedMeasureOfSuccessRows = (
    mappedData: MeasureOfSuccessType[]
  ): MeasureOfSuccessType[] => {
    return mappedData.map((item) => ({
      id: item.id,
      measure: item.measure,
      status: item.status,
      target: item.target,
      unit: item.unit,
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
    approvableTypeId: matchingIds[0],
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
          {!loading &&
            data?.length !== null &&
            status === "pending" &&
            !isSuccess && (
              <div className="flex gap-2.5 mr-4">
                <Button
                  variant="outline"
                  className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                  onClick={() => {
                    setShowTextArea(true);
                    handleReject();
                  }}
                  loading={isLoading && actionType === "rejected"}
                  disabled={isLoading && actionType === "rejected"}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove()}
                  loading={isLoading && actionType === "approved"}
                  disabled={isLoading && actionType === "approved"}
                >
                  Approve
                </Button>
              </div>
            )}

          {!isLoading &&
            data?.length !== null &&
            status === "pending" &&
            isSuccess && <EditableLabel status={actionType} />}
          {!isLoading &&
            data?.length !== null &&
            status !== "pending" &&
            !isSuccess && <EditableLabel status={status ?? ""} />}
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
