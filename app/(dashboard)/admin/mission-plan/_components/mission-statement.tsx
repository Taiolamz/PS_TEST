import { Button } from "@/components/ui/button";
import React from "react";
import Comment from "./comment";
import { MissionStatementType } from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data?: MissionStatementType;
};
const MissionStatement = ({ setShowTextArea, showTextArea, data }: Props) => {
  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
          Mission Statement
        </h2>
        <div className="flex justify-between items-end w-full">
          <p className="w-[52%] text-[#162238] text-sm">
            {data?.mission ?? ""}
          </p>
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
        label="Mission statement"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={[]}
      />
    </section>
  );
};

export default MissionStatement;
