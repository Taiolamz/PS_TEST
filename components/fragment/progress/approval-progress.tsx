import { cn } from "@/lib/utils";
import React from "react";

const ApprovalProgress = ({ steps = 5, completedSteps = 3 }) => {
  // Array to represent steps for the progress bar
  const progressSteps = Array(steps).fill(0);

  return (
    <div className="flex items-center space-x-1">
      {progressSteps.map((_, index) => {
        // Conditional colors for different stages of the approval
        const bgColor = index < completedSteps ? "bg-[#008080]" : "bg-gray-300";

        return (
          <div key={index} className={cn("h-1.5 w-5 rounded-full", bgColor)} />
        );
      })}
    </div>
  );
};

export default ApprovalProgress;
