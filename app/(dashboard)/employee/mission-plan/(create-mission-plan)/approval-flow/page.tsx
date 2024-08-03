"use client"
import {
  MissionHeader,
  MissionItems,
  MissionPlanWrapper,
  MissionWrapper,
  constraints,
  freedom,
  impliedTask,
  specificTask,
  strategicIntent,
} from "@/components/dashboard/missionplan/component";
import { MeasureOfSuccessTable } from "@/components/dashboard/missionplan/table";
import React from "react";
import back from "@/public/svgs/back.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { measuresData, measureColumns } from "@/utils/data/dashboard/missionplan/dummy";

export default function Upload() {
  const prevPath = "/employee/mission-plan/";
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <div className="w-full  h-screen overflow-y-scroll pb-[10rem]">
      <div className="w-[90%]">
        <div className="mb-[20px]">
          <h4 className="text-primary font-600 text-base">
            Preview Mission Plan Information
          </h4>
          <p className="text-grayText text-sm mt-[8px]">Filled Information</p>
        </div>

        <div className="flex flex-col gap-[12px]">
          <MissionPlanWrapper>
            <MissionHeader
              title="Mission Statement"
              link={`${prevPath}mission-plan-overview`}
              index="1"
            />
            <MissionWrapper
              title="Mission Statement"
              status="approved"
              comment="2"
            >
              <p className="leading-relaxed  text-xs">
                My MISSION PLAN Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Feugiat sit sed at neque. Semper suspendisse
                diam habitant pulvinar arcu, mi.
              </p>
            </MissionWrapper>
          </MissionPlanWrapper>
          <MissionPlanWrapper>
            <MissionHeader
              title="Measure of Success"
              link={`${prevPath}measure-of-success`}
              index="2"
            />
            <MissionWrapper
              title="Measure of Success"
              status="rejected"
              comment="2"
            >
              <MeasureOfSuccessTable
                data={measuresData}
                columns={measureColumns}
              />
            </MissionWrapper>
          </MissionPlanWrapper>

          <MissionPlanWrapper>
            <MissionHeader
              title="Strategic Intent"
              link={`${prevPath}set-strategic-intent`}
              index="3"
            />
            <MissionWrapper title="Strategic Intent" status="pending">
              <MissionItems data={strategicIntent} />
            </MissionWrapper>
          </MissionPlanWrapper>
          <MissionPlanWrapper>
            <MissionHeader
              title="Specified Task"
              link={`${prevPath}specified-task`}
              index="4"
            />
            <MissionWrapper title="Specified Task 1" status="approved">
              <MissionItems data={specificTask} />
            </MissionWrapper>
          </MissionPlanWrapper>
          <MissionPlanWrapper>
            <MissionHeader
              title="Implied Task"
              link={`${prevPath}implied-task`}
              index="5"
            />
            <MissionWrapper title="Implied Task 1" status="approved">
              <MissionItems data={impliedTask} />
            </MissionWrapper>
          </MissionPlanWrapper>
          <MissionPlanWrapper>
            <MissionHeader
              title="Freedom & Constraints"
              link={`${prevPath}freedom-constraints`}
              index="6"
            />
            <MissionWrapper title="Freedom" status="approved">
              <div className="flex flex-col gap-[1rem]">
                <MissionItems data={freedom} />
                <div>
                  <div className="text-primary font-500 leading-relaxed pb-[11px]">
                    <h4>Constraints</h4>
                  </div>
                  <MissionItems data={constraints} />
                </div>
              </div>
            </MissionWrapper>
          </MissionPlanWrapper>
        </div>
        <div className="flex mt-[20px] gap-[20px] items-center">
          <div className="flex text-xs items-center gap-[5px] text-primary cursor-pointer select-none" onClick={goBack}>
            <span>
              <Image src={back} alt="back" />
            </span>
            <span>Go Back to Edit</span>
          </div>

          <div className="bg-primary text-sm text-white px-[22px] py-[8px] cursor-pointer select-none hover:bg-[var(--btn-hover-backgroundColor)] rounded-sm shadow-md">
            <p>Upload</p>
          </div>
        </div>
      </div>
    </div>
  );
}