"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";

import SpecifiedTasks from "../../_components/specified-task";
import ImpliedTask from "../../_components/implied-task";
import MeasureOfSuccessTable from "../../_components/measure-of-success-table";
import {
  measureColumns,
  measuresData,
  specifiedTask,
  impliedTask,
} from "@/utils/data/dashboard/missionplan/dummy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PresentationView from "./_presentation/presentation-view";
import Comment from "../../_components/comment";
import StrategicIntent from "../../_components/strategic-intent";
import MissionStatement from "../../_components/mission-statement";
import FreedomConstraint from "../../_components/freedom-constraint";
import MeasureOfSuccess from "../../_components/measure-of-success";
import useDisclosure from "@/utils/hooks/useDisclosure";
import { useGetMissionPlanItemsByIdQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { MissionStatementType } from "@/@types/missionPlan/MissionPlanAprovables";

const ApproveMissionPlan = () => {
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const params = useParams();

  const missionStatementComment = useDisclosure();
  const measureOfSuccessComment = useDisclosure();
  const strategicIntentComment = useDisclosure();
  const freedomConstraintComment = useDisclosure();

  const { data, isLoading } = useGetMissionPlanItemsByIdQuery({
    missionplanid: params.missionplanid as string,
  });

  console.log({ data, params });
  return (
    <DashboardLayout headerTitle="Approve Mission Plan" back>
      {!ui ? (
        <div className="py-14 px-[1.625rem] bg-white text-sm">
          <div className="flex justify-between mb-7">
            <div className="flex items-center gap-[0.5625rem]">
              <h1 className="font-semibold text-lg text-[#3E4345]">
                Oluwaseyi Ajayi Mission Plan
              </h1>
              <Button
                type="button"
                variant="outline"
                className="border-primary text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-transparent"
                onClick={() => {
                  router.push(`${location}?ui=presentation&step=1`);
                }}
              >
                View Presentation Mode
              </Button>
            </div>
            <Button>Approve All</Button>
          </div>
          <div className="flex flex-col gap-10 text-[#162238]">
            <MissionStatement
              showTextArea={missionStatementComment.isOpen}
              setShowTextArea={missionStatementComment.toggle}
              data={data?.data?.mission_statement}
            />

            <MeasureOfSuccess
              showTextArea={measureOfSuccessComment.isOpen}
              setShowTextArea={measureOfSuccessComment.toggle}
              data={data?.data?.measure_of_success}
            />

            <StrategicIntent
              showTextArea={strategicIntentComment.isOpen}
              setShowTextArea={strategicIntentComment.toggle}
              data={data?.data?.strategic_intents ?? []}
            />

            <SpecifiedTasks data={data?.data?.specified_tasks ?? []} />

            <ImpliedTask data={data?.data?.specified_tasks ?? []} />

            <FreedomConstraint
              showTextArea={freedomConstraintComment.isOpen}
              setShowTextArea={freedomConstraintComment.toggle}
              data={data?.data?.boundaries ?? []}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white">
          <PresentationView data={data?.data ?? []} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApproveMissionPlan;
