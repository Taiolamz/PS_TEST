import { cn } from "@/lib/utils";
import React from "react";

const ApprovalProgress = ({
  progressSteps = [],
}: {
  progressSteps: string[];
}) => {
  return (
    <div className="flex items-center space-x-1">
      {progressSteps?.length < 1
        ? Array(1)
            .fill(1)
            .map((item) => (
              <div
                key={item}
                className={cn("h-1.5 w-5 rounded-full", "bg-gray-300")}
              />
            ))
        : progressSteps.map((data) => {
            // Conditional colors for different stages of the approval
            const bgColor =
              data.toLowerCase() === "approved"
                ? "bg-[#008080]"
                : data.toLowerCase() === "rejected"
                ? "bg-[var(--bg-red-100)]"
                : "bg-[var(--bg-yellow-400)]";

            return (
              <div
                key={data}
                className={cn("h-1.5 w-5 rounded-full", bgColor)}
              />
            );
          })}
    </div>
  );
};

export default ApprovalProgress;
