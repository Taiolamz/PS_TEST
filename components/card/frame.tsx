import React from "react";

const MetricFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-5 bg-[#FFFFFF] rounded-[4px] ${className}`}>
      <div>{children}</div>
    </div>
  );
};

export default MetricFrame;
