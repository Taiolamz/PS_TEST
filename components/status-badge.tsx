import React from "react";

type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const statusStyles: { [key: string]: string } = {
    approved: "border-[#119C2B] text-[#119C2B] bg-[#119C2B0D]",
    pending: "border-[#FFC043] text-[#FFC043] bg-[#FFC0430D]",
    rejected: "text-red-700 bg-red-100 border-red-700",
    // Add more statuses if needed
  };

  const currentStatusStyle =
    statusStyles[status.toLowerCase()] || statusStyles["pending"];

  return (
    <div
      className={`inline-block border  px-2.5 py-[0.3125rem] rounded-[0.1875rem] ${currentStatusStyle}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default StatusBadge;
