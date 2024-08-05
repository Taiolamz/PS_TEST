"use client";

import React, { useState } from "react";
import MissionStatementView from "./MissionStatementView";
import StrategicIntentView from "./StrategicIntentView";
import TasksView from "./TasksView";
import BoundariesView from "./BoundariesView";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const steps = [
  "Mission Statement",
  "Strategic Intent",
  "Task",
  "Boundaries",
];
type Params = {
  detailedView: string;
  missionplanid: string;
};

type Props = {
  params: Params;
};

const PresentationViewContent = ({ params }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextView = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousView = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="py-6 pl-[1.625rem] pr-14 bg-white">
      <div className="flex justify-between mb-7">
        <div className="flex items-center gap-[0.5625rem]">
          <h1 className="font-semibold text-lg text-[#3E4345]">
            Oluwaseyi Ajayi Mission Plan
          </h1>
        </div>
        <Button variant="outline">
          <Link
            href={`/dashboard/mission-plan/${params?.missionplanid}/allemployee/${params?.detailedView}`}
          >
            Close
          </Link>
        </Button>
      </div>
      {currentStep === 0 && <MissionStatementView />}
      {currentStep === 1 && <StrategicIntentView />}
      {currentStep === 2 && <TasksView />}
      {currentStep === 3 && <BoundariesView />}

      <div className="flex justify-start items-center gap-[1.625rem] mt-8">
        {currentStep > 0 && (
          <Button type="button" onClick={previousView} variant="outline">
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={nextView}
          className={`${
            currentStep >= steps.length - 1 &&
            "bg-[#F6F8F9] text-[#9AA6AC] border-[#E5E9EB] border-[0.0313rem]"
          }`}
          disabled={currentStep >= steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PresentationViewContent;
