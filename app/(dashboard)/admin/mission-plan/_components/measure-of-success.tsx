import React, { useMemo } from "react";
import MeasureOfSuccessTable from "./measure-of-success-table";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import { Button } from "@/components/ui/button";
import Comment from "./comment";
import { MeasureOfSuccessType } from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: MeasureOfSuccessType;
};

const MeasureOfSuccess = ({ setShowTextArea, showTextArea, data }: Props) => {
  const measureColumnData = useMemo(() => measureColumns(), []);
  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
          Measure of Success
        </h2>
        <div className="flex justify-between items-end">
          <div className="basis-3/4">
            <MeasureOfSuccessTable
              data={measuresData}
              columns={measureColumnData}
            />
          </div>
          <div className="flex gap-2.5 mr-4">
            <Button
              variant="outline"
              className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
              onClick={() => {
                setShowTextArea(true);
              }}
            >
              Reject
            </Button>
            <Button>Approve</Button>
          </div>
        </div>
      </div>
      <Comment
        label="measure of success"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={[]}
      />
    </section>
  );
};

export default MeasureOfSuccess;
