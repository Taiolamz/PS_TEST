"use client";
import React from "react";
import ProgressReport from "../../_component/progress-report";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";

export default function ViewDownlineProgress({
  params,
}: {
  params: { reportId: string };
}) {
  return (
    <DashboardLayout back headerTitle="My Downlines">
      <ProgressReport id={params.reportId} />
    </DashboardLayout>
  );
}
