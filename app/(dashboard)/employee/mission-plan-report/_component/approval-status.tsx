import Image from "next/image";
import React from "react";
import noteIcon from "@/public/assets/icons/NoteIcon.svg";
import noteIconGreen from "@/public/assets/icons/NoteIconGreen.svg";

export interface ApprovalStep {
  name: string;
  role: string;
  status: "Yet to Review" | "In Review" | "Approved";
}

const ApprovalStatus: React.FC<{ steps: ApprovalStep[] }> = ({ steps }) => {
  // Sorting the steps based on their status
  const sortedSteps = steps.sort((a, b) => {
    const order = { "Yet to Review": 0, "In Review": 1, Approved: 2 };
    return order[a.status] - order[b.status];
  });

  const getStatusStyle = (status: ApprovalStep["status"]) => {
    switch (status) {
      case "Yet to Review":
        return "bg-[#fafdff] border border-[#D9D9D9] text-gray-500";
      case "In Review":
        return "border border-[var(--primary-color)] text-[#43BECC]";
      case "Approved":
        return "bg-[#fafdff] border border-[#D9D9D9] text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-md bg-white border-t pt-10 h-[90vh] overflow-auto">
      <div className="relative">
        {sortedSteps.map((step, index) => (
          <div key={index} className="relative px-5 mb-[70px]">
            {/* Connector Line */}
            {index !== sortedSteps.length - 1 && (
              <span className="absolute left-[188px] -bottom-12 h-6 w-[2px] bg-[#E5E9EB]"></span>
            )}

            {/* Card */}
            <div
              className={`p-4 rounded-lg relative ${getStatusStyle(
                step.status
              )}`}
            >
              {/* EDGES STYLE */}
              <div
                className={`absolute -top-5 left-1/2 transform -translate-x-1/2 rotate-180 bg-[#fafdff] w-10 h-5 rounded-b-full border-l border-r border-b flex items-center justify-center ${
                  step.status === "In Review"
                    ? "border-r-[var(--primary-color)] border-l-[var(--primary-color)] border-b-[var(--primary-color)] hidden"
                    : "border-b-[#D9D9D9]"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]"></div>
              </div>
              <div
                className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-[#fafdff] w-10 h-5 rounded-b-full border-l border-r  border-b flex items-center justify-center ${
                  step.status === "In Review"
                    ? "border-r-[var(--primary-color)] border-l-[var(--primary-color)] border-b-[var(--primary-color)]"
                    : "border-b-[#D9D9D9]"
                }`}
              >
                <div
                  className={` ${
                    step.status === "In Review" ? "w-2.5 h-2.5" : "w-1.5 h-1.5"
                  } rounded-full bg-[var(--primary-color)]`}
                ></div>
              </div>
              {/* ******** */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Icon */}
                  <Image
                    src={step.status === "In Review" ? noteIconGreen : noteIcon}
                    alt=""
                  />

                  <div>
                    <p className="text-sm text-[#252C32] font-medium pb-1">
                      {step.name}
                    </p>
                    <p className="text-xs text-[#6E7C87]">{step.role}</p>
                  </div>
                </div>

                {/* Status Label */}
                <p
                  className={`${
                    step.status === "In Review"
                      ? "text-[#FFC043] bg-[#FFC0430D] px-2 py-1 rounded border border-[#FFC04380] text-xs"
                      : step.status === "Approved"
                      ? "text-[#119C2B] bg-[#119C2B0D] border border-[#119C2B] px-2 py-1 rounded text-xs"
                      : "bg-[#9AA6AC0D] border px-2 py-1 rounded border-[#9AA6AC80] text-[#9AA6AC] text-xs"
                  }`}
                >
                  {step.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalStatus;
