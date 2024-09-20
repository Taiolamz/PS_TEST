"use client";

import { GraySkeleton, PlusIcon } from "@/public/assets/icons";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useGetAllMissionPlanFlowQuery } from "@/redux/services/mission-plan/missionPlanApprovalFlow";
import routesPath from "@/utils/routes";

const MissionPlanApprovalFlowLevel = () => {
  const user = useAppSelector(selectUser);
  const { data: approvalFlowData, isLoading } = useGetAllMissionPlanFlowQuery();
  const router = useRouter();

  const createTemplate = (
    <div
      onClick={() =>
        router.push(routesPath.ADMIN.CREATE_MISSION_PLAN_APPROVAL_FLOW)
      }
      className=" h-[199px] border border-custom-gray group hover:border-primary transition-all duration-300 bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
    >
      <div className="flex flex-col gap-5 items-center">
        <p className="text-custom-gray-scale-300 text-center font-normal text-sm">
          Create New <br />
          FLow
        </p>
        <div className="group-hover:scale-[1.02]">
          <PlusIcon className="stroke-primary transition-all duration-300" />
        </div>
      </div>
    </div>
  );

  const defaultTemplate = (
    <div
      onClick={() => console.log("default")}
      className="h-[199px] border border-custom-gray group hover:border-primary transition-all duration-300 bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
    >
      <div className="flex flex-col ml-[2rem] relative">
        <figure className="absolute right-0 -top-10 mr-4 cursor-pointer">
          {/* Action Icon */}
        </figure>
        <p className="text-black mb-3 font-medium text-sm capitalize">
          Default Mission <br /> Plan Approval Flow
        </p>
        <Image src={GraySkeleton} alt="default template" />
      </div>
    </div>
  );

  return (
    <DashboardLayout headerTitle="Mission Plan Approval Flow">
      <div className="flex flex-col p-5 w-full">
        <div className="flex gap-3 items-center">
          <p className="text-[16px] font-medium">Approval Flow</p>
          <figure>{/* Info Icon */}</figure>
        </div>
        <div className="mt-5 w-full grid grid-cols-6 gap-7">
          {createTemplate}
          {/* {defaultTemplate} */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MissionPlanApprovalFlowLevel;
