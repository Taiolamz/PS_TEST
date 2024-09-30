"use client";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function EmployeeMOSProgress({
  params,
}: {
  params: { reportId: string };
}) {
  const router = useRouter();
  return (
    <DashboardLayout back headerTitle="Measure of Success Percentage Achieved">
      <div>mos details</div>
    </DashboardLayout>
  );
}
