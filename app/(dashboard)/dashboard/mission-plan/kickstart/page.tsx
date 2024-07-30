import React from "react";
import { DashboardLayout } from "../../_components/dashboard-layout";
import EmptyKickstart from "./_component/empty-kickstart";
import DashboardNavContent from "../../_components/dashboard-layout/dashboard-nav-content";

export default function KickStart() {
    return (
      <DashboardLayout
        dynamiccontent={
          <DashboardNavContent
            title="Mission Plan"
            showBack
          />
        }
        childrenclassName="h-full grid place-content-center"
      >
        <EmptyKickstart href="kickstart/create" />
      </DashboardLayout>
    );
}
