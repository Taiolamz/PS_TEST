import React from "react";
import { DashboardLayout } from "../../../_components/dashboard-layout";
import DashboardNavContent from "../../../_components/dashboard-layout/dashboard-nav-content";

export default function Create() {
  return (
    <DashboardLayout
      dynamiccontent={<DashboardNavContent title="Mission Plan" showBack />}
    >
      Kickstart LAyout and Create
    </DashboardLayout>
  );
}
