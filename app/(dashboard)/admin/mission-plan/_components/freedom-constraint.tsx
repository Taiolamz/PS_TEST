import { Button } from "@/components/ui/button";
import React from "react";
import Comment from "./comment";
import { BoundariesType } from "@/@types/missionPlan/MissionPlanAprovables";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
  data: BoundariesType[];
};

const FreedomConstraint = ({ setShowTextArea, showTextArea, data }: Props) => {
  return (
    <section>
      <div className="rounded-[0.3125rem] border border-[#E5E9EB] p-[1.8125rem] mb-5">
        <div className=" flex justify-between items-end">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Freedom{" "}
              </h2>
              <div className="mt-2">
                {data[0]?.freedoms?.map((freedom) => (
                  <h3
                    className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5"
                    key={freedom}
                  >
                    <span>-</span> {freedom}
                  </h3>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Constraints
              </h2>
              <div className="mt-2">
                {data[0]?.constraints?.map((item) => (
                  <h3
                    className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5"
                    key={item}
                  >
                    <span>-</span> {item}
                  </h3>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 items-end">
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
        label="freedom & constraints"
        showTextArea={showTextArea}
        setShowTextArea={setShowTextArea}
        comments={[]}
      />
    </section>
  );
};

export default FreedomConstraint;
