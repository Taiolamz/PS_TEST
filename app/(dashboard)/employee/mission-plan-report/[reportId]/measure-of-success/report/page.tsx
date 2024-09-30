"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function MOSReport({
  params,
}: {
  params: { reportId: string };
}) {
  return (
    <DashboardLayout back headerTitle="Measure of Success Percentage Achieved">
      <div>mos repoort</div>
    </DashboardLayout>
  );
}
