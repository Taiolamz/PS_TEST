"use client";

import React from "react";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardNav from "./dashboard-navbar";

const DashboardLayout = ({
  children,
  className,
  collaspe,
  dynamiccontent,
  childrenclassName,
}: DashboardLayoutType) => {
  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <div className={`w-full flex flex-col overflow-y-auto ${className}`}>
        <DashboardNav dynamiccontent={dynamiccontent} />
        <div className={`relative ${childrenclassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
