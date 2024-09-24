"use client";

import CustomTab from "@/components/custom-tab";
import routesPath from "@/utils/routes";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

const ReuseProfileTabs = () => {
  // const pathname = usePathname();
  // const router = useRouter();

  const profileTabList = [
    {
      id: 1,
      title: "Personal Information",
      accessor: "mission-plan",
      default_link: routesPath?.PROFILE?.PERSONAL,
    },
    {
      id: 2,
      title: "Work Information",
      accessor: "all-employees",
      default_link: routesPath?.PROFILE?.WORK,
    },
  ];

  return (
    <div className="w-full">
      <CustomTab canControl={true} options={profileTabList} slug="ui" />
    </div>
  );
};

export default ReuseProfileTabs;
