import React, { useMemo } from "react";
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

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: MeasureOfSuccessType[];
};

const MeasureOfSuccess = ({ setShowTextArea, showTextArea, data }: Props) => {
  const measureColumnData = useMemo(() => measureColumns(), []);

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
    
    const { missionplanid } = useParams();
    const initialComments = ['1', '2', '3']; // wiil be Replaced with actual data
    const initialActionType = "";
  
    const {
      handleReject,
      handleApprove,
      FormikApprovalForm,
    } = useApproval(initialComments, initialActionType, missionplanid as string, "success-measure");

  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
          Measure of Success
        </h2>
        <div className="flex justify-between items-end">
          <div className="basis-3/4">
            <MeasureOfSuccessTable
              data={measureOfSuccessData}
              columns={measureColumnData}
            />
          </div>
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
            <Button
                          onClick={() => handleApprove()}
            >Approve</Button>
          </div>
        </div>
      </div>
      <Comment
        label="measure of success"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={[]}
        formik={FormikApprovalForm}
      />
    </section>
  );
};

export default MeasureOfSuccess;
