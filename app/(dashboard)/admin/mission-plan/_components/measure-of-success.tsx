import React, { useMemo } from "react";
import MeasureOfSuccessTable from "./measure-of-success-table";
import { measureColumns } from "@/utils/data/dashboard/missionplan/dummy";
import { Button } from "@/components/ui/button";
import Comment from "./comment";
import { MeasureOfSuccessType } from "@/@types/missionPlan/MissionPlanAprovables";
import { useParams } from "next/navigation";
import { useApproval } from "./useApproval";
import useGetComments from "./useGetComments.hook";
import { Loader2 } from "lucide-react";

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
  const comments = useGetComments({ approvables, approvableTypeId });
  const approval_type = "success-measure";

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

  const { handleReject, handleApprove, FormikApprovalForm, undoStatus } = useApproval({
    initialComments: comments?.comment ?? [],
    initialActionType,
    missionplanid,
    approval_type,
  });

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
          {comments?.status === "pending" && !loading && data?.length !== null ? (
            <div className="flex gap-2.5 mr-4">
              <Button
                variant="outline"
                className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                onClick={() => {
                  setShowTextArea(true);
                  handleReject();
                }}
              >
                Reject
              </Button>
              <Button onClick={() => handleApprove()}>Approve</Button>
            </div>
          ) : comments?.status === "approved" &&
            !loading &&
            data?.length !== null ? (
            <div className="flex gap-2.5 mr-4">
              <Button onClick={() => undoStatus()}>Undo Approval</Button>
            </div>
          ) : comments?.status === "rejected" &&
            !loading &&
            data?.length !== null ? (
            <div className="flex gap-2.5 mr-4">
              <Button onClick={() => undoStatus()}>Undo Rejection</Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Comment
        label="measure of success"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={comments}
        formik={FormikApprovalForm}
      />
    </section>
  );
};

export default MeasureOfSuccess;
