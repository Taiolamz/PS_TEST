"use client";

import { GraySkeleton, PlusIcon } from "@/public/assets/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { missionPlanDetails } from "./checklist-steps";
// import { useGetMissionPlanTemplatesQuery } from "@/redux/services/checklist/missionPlanTemplateApi";
import { PageLoader } from "@/components/custom-loader";
import routesPath from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/features/auth/authSlice";
import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { useGetAllMissionPlanFlowQuery } from "@/redux/services/mission-plan/missionPlanApprovalFlow";

interface Props {
  handleClick: () => void;
  handleDefaultClick: () => void;
}

const MissionPlanApprovalFlowLevel = ({
  handleClick,
  handleDefaultClick,
}: Props) => {
  const user = useAppSelector(selectUser);
  const { data: approvalFlowData, isLoading } = useGetAllMissionPlanFlowQuery();
  console.log(approvalFlowData, "approval flow data");
  const router = useRouter();

  const createTemplate = (
    <div
      //   onClick={handleClick}
      onClick={() =>
        router.push(routesPath.ADMIN.CREATE_MISSION_PLAN_APPROVAL_FLOW)
      }
      className=" h-[199px]  border border-custom-gray group hover:border-primary transition-all duration-300 bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
    >
      <div className="flex flex-col gap-5 items-center">
        <p className="text-custom-gray-scale-300 text-center font-normal text-sm ">
          Create New <br />
          FLow
        </p>
        <div className="group-hover:scale-[1.02] ">
          <PlusIcon className="stroke-primary transition-all duration-300" />
        </div>
      </div>
    </div>
  );

  const infoIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99993 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99993 1.33325C4.31803 1.33325 1.33327 4.31802 1.33327 7.99992C1.33327 11.6818 4.31803 14.6666 7.99993 14.6666Z"
        fill="#84919A"
      />
      <path
        d="M8.9215 4.59985C9.38293 4.59985 9.61365 4.9139 9.61365 5.27375C9.61365 5.72314 9.21282 6.13877 8.69112 6.13877C8.25414 6.13877 7.99932 5.88051 8.01137 5.45351C8.01137 5.09435 8.31474 4.59985 8.9215 4.59985ZM7.50173 11.4869C7.1374 11.4869 6.87052 11.2624 7.12535 10.2734L7.54339 8.51998C7.61605 8.23967 7.6281 8.12707 7.54339 8.12707C7.43423 8.12707 6.96178 8.3206 6.68182 8.51171L6.5 8.20868C7.38568 7.45592 8.40462 7.01481 8.84195 7.01481C9.20593 7.01481 9.26654 7.45317 9.08472 8.12707L8.60572 9.97005C8.52101 10.2955 8.55717 10.4077 8.64223 10.4077C8.75139 10.4077 9.10951 10.2727 9.46144 9.99209L9.66806 10.2724C8.80648 11.1495 7.86536 11.4869 7.50173 11.4869Z"
        fill="white"
      />
    </svg>
  );

  const actionIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
        fill="#9AA6AC"
      />
    </svg>
  );

  const defaultTemplate = (
    <div
      onClick={handleDefaultClick}
      className=" h-[199px]  border border-custom-gray group hover:border-primary transition-all duration-300 bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
    >
      <div className="flex flex-col ml-[2rem] relative">
        <figure className="absolute right-0 -top-10 mr-4 cursor-pointer">
          {actionIcon}
        </figure>
        <p className=" text-black mb-3 font-medium text-sm capitalize">
          Default Mission <br /> Plan Approval Flow
        </p>
        <Image src={GraySkeleton} alt="default template" />
      </div>
    </div>
  );
  return (
    <DashboardLayout headerTitle="Mission Plan Template">
      <div className="flex flex-col p-5 w-full">
        <div className="flex gap-3 items-center">
          <p className="text-[16px] font-medium">Approval Flow</p>
          <figure>{infoIcon}</figure>
        </div>

        <>
          {/* {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <PageLoader />
            </div>
          ) : ( */}
          <div className=" mt-5 w-full grid grid-cols-6  gap-7 ">
            {createTemplate}
            {defaultTemplate}
            {/* {missionPlanTemplateData?.map((chi, idx) => {
                const { name } = chi;
                return (
                  <div
                    key={idx}
                    className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
                    onClick={() => {
                      router.push(routesPath.ADMIN.VIEW_MISSION_PLAN_TEMPLATE);
                      localStorage.setItem(
                        "selected-mission-plan-template-review",
                        JSON.stringify(chi)
                      );
                    }}
                  >
                    <div className="flex flex-col ml-[2rem]">
                      <div className="flex flex-col gap-5">
                        <p className="w-[107px] text-black mb-3 font-medium text-sm capitalize">
                          {name}
                        </p>
                      </div>
                      <Image src={GraySkeleton} alt={name} />
                    </div>
                  </div>
                );
              })} */}
            {/* {missionPlanTemplateData?.map((chi, idx) => {
                const { name } = chi;
                return (
                  <div
                    key={idx}
                    className="h-[199px] hover:border-primary transition-all duration-300 border border-custom-gray group bg-custom-light-gray-100 cursor-pointer flex flex-col justify-center"
                    onClick={() => {
                      router.push(routesPath.ADMIN.VIEW_MISSION_PLAN_TEMPLATE);
                      localStorage.setItem(
                        "selected-mission-plan-template-review",
                        JSON.stringify(chi)
                      );
                    }}
                  >
                    <div className="flex flex-col ml-[2rem]">
                      <div className="flex flex-col gap-5">
                        <p className="w-[107px] text-black mb-3 font-medium text-sm capitalize">
                          {name}
                        </p>
                      </div>
                      <Image src={GraySkeleton} alt={name} />
                    </div>
                  </div>
                );
              })} */}
          </div>
          {/* )} */}
        </>
      </div>
    </DashboardLayout>
  );
};

export default MissionPlanApprovalFlowLevel;
