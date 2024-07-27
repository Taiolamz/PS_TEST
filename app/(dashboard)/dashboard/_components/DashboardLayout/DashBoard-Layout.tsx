"use client";

import React from "react";
import DashboardSidebar from "./Dashboard-Sidebar";
import DashboardNav from "./Dashboard-Navbar";

const DashboardLayout = ({
  children,
  className,
  collaspe,
  dynamiccontent,
}: DashboardLayoutType) => {
  return (
    <div className="flex bg-white">
      <DashboardSidebar/>
      <div className={`w-full h-screen overflow-y-auto ${className}`}>
        <DashboardNav dynamiccontent={dynamiccontent} />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
