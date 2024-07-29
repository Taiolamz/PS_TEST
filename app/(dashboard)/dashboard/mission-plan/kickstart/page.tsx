import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DashboardLayout } from "../../_components/dashboard-layout";
import EmptyKickstart from "./_component/empty-kickstart";

export default function KickStart() {
  return (
    <DashboardLayout childrenclassName="h-full grid place-content-center">
      <EmptyKickstart href="#" />
    </DashboardLayout>
  );
}
