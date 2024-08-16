import React from "react";
import Comment from "./comment";
import { Button } from "@/components/ui/button";
import { StrategicIntentType } from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: StrategicIntentType[];
};

const StrategicIntent = ({ setShowTextArea, showTextArea, data }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      {data?.map((item, index) => (
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
                    <span className="font-normal">Intent:</span> {item?.intent}
                  </p>
                  <p className="mt-1 font-light">
                    <span className="font-normal">Behaviors: </span>
                    {item?.behaviours}
                  </p>
                </div>
                <div className="flex gap-2.5 mr-4">
                  <Button
                    variant="outline"
                    className="border-[#FF5855] text-[#FF5855] hover:text-[#FF5855]"
                    onClick={() => setShowTextArea(true)}
                  >
                    Reject
                  </Button>
                  <Button>Approve</Button>
                </div>
              </div>
            </div>
          </div>
          <Comment
            label="strategic intent"
            showTextArea={showTextArea}
            setShowTextArea={setShowTextArea}
          />
        </section>
      ))}
    </div>
  );
};

export default StrategicIntent;
