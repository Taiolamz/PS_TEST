import Image from "next/image";
import { StatsIcon } from "@/public/assets/icons";
import { GrayPlusIcon } from "@/public/assets/icons";
import React from "react";
import Link from "next/link"; 
import { DashboardLayout } from "../_components/dashboard-layout";
import YearMissionPlanCard from "./_components/year-mission-plan-card";

export default function page() {
  const kickstartcard = (
    <Link
      href="mission-plan/kickstart"
      className=" h-[140px] border bg-transparent rounded-[5px] border-custom-gray group hover:border-primary transition-all duration-300 p-4 cursor-pointer"
    >
      <div className="flex justify-between">
        <Image className="" src={StatsIcon} alt="plus" />
        <Image
          className="group-hover:scale-[1.02] transition-all duration-300"
          src={GrayPlusIcon}
          alt="plus"
        />
      </div>
      <div className="text-custom-gray-scale-400 mt-5 font-normal text-base ">
        Kickstart New <br /> Mission Plan
      </div>
    </Link>
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col p-5 w-full">
        <p className="text-lg font-medium">All Mission Plan</p>
        <div className=" mt-5 w-full grid grid-cols-4 gap-4">
          {kickstartcard}
          <YearMissionPlanCard
            state="completed"
            href="mission-plan/2023/missionplan"
          />
          <YearMissionPlanCard
            state="completed"
            href="mission-plan/2023/missionplan"
          />
          <YearMissionPlanCard
            state="in-progress"
            href="mission-plan/2023/missionplan"
          />
          <YearMissionPlanCard
            state="completed"
            href="mission-plan/2023/missionplan"
          />
          <YearMissionPlanCard
            state="in-progress"
            href="mission-plan/2023/missionplan"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
