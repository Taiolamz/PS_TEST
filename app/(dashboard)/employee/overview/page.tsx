"use client";
import React from "react";
import DashboardLayout from "../../_layout/DashboardLayout";
import { useAppSelector } from "@/redux/store";
import ProfileBanner from "./_partials/profile-banner";
import QuickAccess from "./_partials/quick-access";
import MyMissionPlanCard from "./_partials/my-mission-plan";
import RecentActivity from "./_partials/recent-activity";
import SideContent from "./_partials/side-content";
import SpecifiedTaskProgress from "./_partials/specified-task-progress";
import TeamPerformance from "./_partials/team-performance";

const OverView = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <DashboardLayout headerTitle={`Welcome ${user?.name?.split(" ")[0]}`}>
      <div className="h-full flex flex-col overflow-y-hidden">
        {/* Employee checklist to complete profile */}
        <ProfileBanner />
        {/* Main Content */}
        <div className="flex-1 relative">
          <div className="h-full pb-10 pl-5 w-full lg:w-[calc(100%-400px)] max-lg:pr-5 absolute top-0 left-0 space-y-6 custom-scrollbar">
            {/* Quick access */}
            <QuickAccess />

            {/* My mission plan */}
            <MyMissionPlanCard />

            {/* My Team Performance Task Bar and My Downline Team Performance Task Bar */}
            <TeamPerformance />

            {/* Specified task progress */}
            <SpecifiedTaskProgress />

            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Right Side Content --Todo, Mission and Vision-- */}
          <SideContent />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OverView;
