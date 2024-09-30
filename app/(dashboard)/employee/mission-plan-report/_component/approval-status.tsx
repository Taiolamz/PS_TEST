import React from "react";

export interface ApprovalStep {
  name: string;
  role: string;
  status: "Yet to Review" | "In Review" | "Approved";
}

const ApprovalStatus: React.FC<{ steps: ApprovalStep[] }> = ({ steps }) => {
  const getStatusStyle = (status: ApprovalStep["status"]) => {
    switch (status) {
      case "Yet to Review":
        return "bg-gray-100 border border-gray-200 text-gray-500";
      case "In Review":
        return "border border-[#43BECC] text-[#43BECC]";
      case "Approved":
        return "bg-gray-100 border border-gray-200 text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-md p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-6 mb-6">
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <span className="absolute left-0 top-0 h-full w-[1px] bg-gray-300"></span>
            )}

            {/* Dot */}
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-[#43BECC]"></span>

            {/* Card */}
            <div className={`p-4 rounded-lg ${getStatusStyle(step.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Icon */}
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#43BECC]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m-9 8h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-sm text-gray-400">{step.role}</p>
                  </div>
                </div>

                {/* Status Label */}
                <p
                  className={`${
                    step.status === "In Review"
                      ? "text-yellow-500 bg-yellow-100 px-2 py-1 rounded"
                      : step.status === "Approved"
                      ? "text-green-500 bg-green-100 px-2 py-1 rounded"
                      : ""
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
