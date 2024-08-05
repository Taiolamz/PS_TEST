"use client";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import React from "react";
import PresentationViewContent from "../../_components/PresentationViewContent";

const PresentationViewPage = ({
  params,
}: {
  params: { detailedView: string; missionplanid: string };
}) => {
  console.log("PARAMS", { params });
  return (
    <DashboardLayout>
      <div className="h-screen bg-white">
        <PresentationViewContent params={params} />
      </div>
    </DashboardLayout>
  );
};

export default PresentationViewPage;
