import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
import ApprovalCard from "./_components/approval-card";
import { approvalData } from "./_data/data";

const Approvals = () => {
  return (
    <DashboardLayout headerTitle="Approval Flow">
      <div className="px-8 mt-6 flex gap-x-3 flex-wrap">
        {approvalData.map((item, idx) => (
          <ApprovalCard key={idx} id={item.id} title={item.title} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Approvals;
