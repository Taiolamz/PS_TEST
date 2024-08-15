import { Button } from "@/components/ui/button";
import React from "react";
import Comment from "./comment";

type Props = {
  showTextArea: boolean;
  setShowTextArea: (e: boolean) => void;
};

const FreedomConstraint = ({ setShowTextArea, showTextArea }: Props) => {
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
                <h3 className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5">
                  <span>-</span> Transportation to and from client location
                </h3>
                <h3 className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5">
                  <span>-</span> Lack of experienced team members
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-[var(--primary-color)] text-sm mb-[0.6875rem] font-medium">
                Constraints
              </h2>
              <div className="mt-2">
                <h3 className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5">
                  <span>-</span> Ability to innovate design process
                </h3>
                <h3 className="text-sm font-normal flex items-center gap-[0.9375rem] ml-1.5">
                  <span>-</span> Select skill to improve on
                </h3>
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
      />
    </section>
  );
};

export default FreedomConstraint;
