"use client";
import React from "react";
import ProgressReport from "../../_component/progress-report";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";

export default function ViewApprovalProgress({
  params,
}: {
  params: { reportId: string };
}) {
  return (
    <DashboardLayout back headerTitle="My Approvals">
      <ProgressReport id={params.reportId} />
    </DashboardLayout>
  );
}
