"use client";

import React from "react";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardNav from "./dashboard-navbar";
import NewDashboardLayout from "../../new-layout/NewDashboardLayout";
import { ActionContextProvider } from "@/app/(dashboard)/context/ActionContext";

const DashboardLayout = ({
  children,
  className,
  collaspe,
  dynamiccontent,
  childrenclassName,
}: DashboardLayoutType) => {
  return (
    // <div className="flex h-screen bg-white">
    //   <DashboardSidebar />
    //   <div className={`w-full flex flex-col overflow-hidden ${className}`}>
    //     <DashboardNav dynamiccontent={dynamiccontent} />
    //     <div className={`relative ${childrenclassName}`}>{children}</div>
    //   </div>
    // </div>
    <>
    <ActionContextProvider>
       <NewDashboardLayout>{children}</NewDashboardLayout>
    </ActionContextProvider>
     
    </>
  );
};

export default DashboardLayout;
