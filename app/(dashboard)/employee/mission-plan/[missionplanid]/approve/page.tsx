"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import DashboardLayout from "@/app/(dashboard)/_layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PresentationView from "./_presentation/presentation-view";
import StrategicIntent from "../../_components/strategic-intent";
import MissionStatement from "../../_components/mission-statement";
import FreedomConstraint from "../../_components/freedom-constraint";
import MeasureOfSuccess from "../../_components/measure-of-success";
import useDisclosure from "@/utils/hooks/useDisclosure";
import { useGetMissionPlanItemsByIdQuery } from "@/redux/services/mission-plan/missionPlanApi";
import Tasks from "../../_components/tasks";
import { useApproveAllItemsMutation } from "@/redux/services/mission-plan/approveItemsApi";
import { toast } from "sonner";

type StatusObject = { [key: string]: any };

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

  const { data, isLoading: isGettingMissionPlanItems } =
    useGetMissionPlanItemsByIdQuery({
      missionplanid: missionplanid as string,
    });
  const name = data?.data?.staff_member ?? "";

  const [approveAllItems, { isLoading, isSuccess, isError }] =
    useApproveAllItemsMutation();

  useEffect(() => {
    if (isLoading && !isSuccess) {
      toast.loading("Processing...");
      setTimeout(() => {
        toast.dismiss();
      }, 1000);
      return;
    }
    if (!isLoading && isSuccess) {
      toast.success("Approval status updated successfully");
      return;
    }
    if (!isLoading && isError) {
      toast.error("Approval status updated failed");
      return;
    }
  }, [isLoading, isSuccess, isError]);

  const checkStatuses = (obj: any): boolean => {
    let hasRejected = false;
    let allApproved = true;
    let allPending = true;

    const checkStatus = (item: any): void => {
      if (typeof item === "object" && item !== null) {
        for (const key in item) {
          if (key === "status") {
            if (item[key] === "rejected") {
              hasRejected = true;
            }
            if (item[key] !== "approved") {
              allApproved = false;
            }
            if (item[key] !== "pending") {
              allPending = false;
            }
          } else if (
            typeof item[key] === "object" ||
            Array.isArray(item[key])
          ) {
            checkStatus(item[key]);
          }
        }
      }
    };

    checkStatus(obj);

    // If any status is rejected, return false
    if (hasRejected) {
      return true;
    }

    // If all statuses are approved, return false
    if (allApproved) {
      return true;
    }

    // If all statuses are pending, return true
    if (allPending) {
      return false;
    }

    // Return true if the statuses are mixed (i.e., not all approved or rejected)
    return true;
  };

  return (
    <DashboardLayout headerTitle="Approve Mission Plan" back>
      {!ui ? (
        <div className="py-14 px-[1.625rem] bg-white text-sm">
          <div className="flex justify-between mb-7">
            <div className="flex items-center gap-[0.5625rem]">
              <h1 className="font-semibold text-lg text-[#3E4345] capitalize">
                {name} Mission Plan
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
              <Button
                disabled={
                  checkStatuses(data?.data) ||
                  isLoading ||
                  data?.data?.approvables.length === 0
                }
                loading={isLoading}
                onClick={() =>
                  approveAllItems({
                    missionPlan: missionplanid,
                  })
                }
              >
                Approve All
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-10 text-[#162238]">
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
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />

            <StrategicIntent
              data={data?.data?.strategic_intents ?? []}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />

            <Tasks
              data={data?.data?.specified_tasks ?? []}
              approvables={data?.data?.approvables ?? []}
              loading={isGettingMissionPlanItems}
            />

            <FreedomConstraint
              showTextArea={freedomConstraintComment.isOpen}
              setShowTextArea={freedomConstraintComment.toggle}
              data={data?.data?.boundaries ?? []}
              loading={isGettingMissionPlanItems}
              approvables={data?.data?.approvables ?? []}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white">
          <PresentationView
            data={data?.data}
            loading={isGettingMissionPlanItems}
            name={name}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApproveMissionPlan;
