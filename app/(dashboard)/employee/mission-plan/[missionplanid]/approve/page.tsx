"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";

import SpecifiedTasks from "../../_components/specified-task";
import ImpliedTask from "../../_components/implied-task";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PresentationView from "./_presentation/presentation-view";
import StrategicIntent from "../../_components/strategic-intent";
import MissionStatement from "../../_components/mission-statement";
import FreedomConstraint from "../../_components/freedom-constraint";
import MeasureOfSuccess from "../../_components/measure-of-success";
import useDisclosure from "@/utils/hooks/useDisclosure";
import { useGetMissionPlanItemsByIdQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { useApproval } from "../../_components/useApproval";
import { useAppSelector } from "@/redux/store";

const ApproveMissionPlan = () => {
  const router = useRouter();
  const location = usePathname();
  const searchParams = useSearchParams();
  const ui = searchParams.get("ui");
  const params = useParams();
  const missionplanid = params.missionplanid as string;
  const [approvalTypeId, setApprovalTypeId] = useState("");

  const missionStatementComment = useDisclosure();
  const measureOfSuccessComment = useDisclosure();
  const freedomConstraintComment = useDisclosure();

  const { name } = useAppSelector((state) => state?.single_employee);

  const { data, isLoading: isGettingMissionPlanItems } =
    useGetMissionPlanItemsByIdQuery({
      missionplanid: missionplanid as string,
    });

  return (
    <DashboardLayout headerTitle="Approve Mission Plan" back>
      {!ui ? (
        <div className="py-14 px-[1.625rem] text-sm bg-[var(--btn-light-color)]">
          <div className="flex justify-between mb-7">
            <div className="flex items-center gap-[0.5625rem]">
              <h1 className="font-semibold text-lg text-[#3E4345] capitalize">
                {data?.data?.staff_member} Mission Plan
              </h1>
              {!isGettingMissionPlanItems && (
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
              )}
            </div>
            {!isGettingMissionPlanItems && data?.data !== null && (
              <Button>Approve All</Button>
            )}
          </div>
          <div className="flex flex-col gap-2 text-[#162238]">
            <MissionStatement
              showTextArea={missionStatementComment.isOpen}
              setShowTextArea={missionStatementComment.toggle}
              data={data?.data?.mission_statement}
              setApprovalTypeId={setApprovalTypeId}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />

            <MeasureOfSuccess
              showTextArea={measureOfSuccessComment.isOpen}
              setShowTextArea={measureOfSuccessComment.toggle}
              data={data?.data?.measure_of_success ?? []}
              // setApprovalTypeId={setApprovalTypeId}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />

            <StrategicIntent
              data={data?.data?.strategic_intents ?? []}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />
            <SpecifiedTasks
              data={data?.data?.specified_tasks ?? []}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />
            <ImpliedTask
              data={data?.data?.specified_tasks ?? []}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />

            <FreedomConstraint
              showTextArea={freedomConstraintComment.isOpen}
              setShowTextArea={freedomConstraintComment.toggle}
              data={data?.data?.boundaries ?? []}
              loading={isGettingMissionPlanItems}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[var(--btn-light-color)]">
          <PresentationView
            data={data?.data}
            loading={isGettingMissionPlanItems}
            closeLocation={location}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApproveMissionPlan;