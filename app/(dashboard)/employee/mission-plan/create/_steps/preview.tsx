import ConfirmationModal from "@/components/atoms/modals/confirm";
import MeasureOfSuccessTable from "@/app/(dashboard)/admin/mission-plan/create/_component/measure-of-success-table";
import {
  constraints,
  freedom,
  impliedTask,
  specificTask,
  strategicIntent,
} from "@/utils/data/mission-plan-template";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import routesPath from "@/utils/routes";
import { useRouter, usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MissionHeader,
  MissionItems,
  MissionPlanWrapper,
  MissionWrapper,
} from "@/components/fragment";
import BackIcon from "@/public/assets/icons/BackIcon";
import { useSubmitPreviewedMissionPlanMutation } from "@/redux/services/mission-plan/missionPlanApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SpecifiedTasksDropDown from "../../_components/specified-task-dropdown";

interface Props {
  missionDetails: any;
  isFetchingMissionPlan?: boolean;
}

const MissionDetailPreview = ({
  missionDetails,
  isFetchingMissionPlan,
}: Props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = usePathname();

  const router = useRouter();
  const goBack = () => router.back();

  const { ADMIN } = routesPath;
  const missionData = missionDetails || [];

  const measureColumnData = useMemo(
    () => measureColumns(),
    [isFetchingMissionPlan]
  );

  const [submitPreviewedMissionPlan, { isLoading: isSubmittingMissionPlan }] =
    useSubmitPreviewedMissionPlanMutation();

  const handleUpload = async () => {
    const payload = { ...missionData };
    await submitPreviewedMissionPlan(payload)
      .unwrap()
      .then(() => {
        setShowSuccessModal(true);
        new Promise(() => {
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
        });
      });
  };

  console.log(missionData?.specified_tasks);
  return (
    <div className="w-[60vw]">
      <h2 className=" text-[var(--primary-color)] font-[600] text-base">
        Preview Mission Plan Information
      </h2>
      <span className="block mt-1 text-[#6E7C87] text-sm">
        Filled Information
      </span>
      <div className="flex flex-col gap-[12px] mt-[26px]">
        <MissionPlanWrapper>
          <MissionHeader
            title="Mission Statement"
            link={`${location}?ui=mission-statement`}
            index="1"
          />
          <MissionWrapper
            title="Mission Statement"
            status={missionData?.mission_statement?.status}
            // status={"approved"}
            comment="2"
          >
            <p className="leading-relaxed  text-sm">
              {/* My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
              pulvinar arcu, mi. */}
              {missionData?.mission_statement?.mission || "_"}
            </p>
          </MissionWrapper>
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Measure of Success"
            link={`${location}?ui=measure-success`}
            index="2"
          />
          <MissionWrapper
            title="Measure of Success"
            status={missionData?.measure_of_success?.[0]?.status}
            comment="2"
          >
            <MeasureOfSuccessTable
              data={missionData?.measure_of_success}
              // data={measuresData}
              columns={measureColumnData}
            />
          </MissionWrapper>
        </MissionPlanWrapper>

        <MissionPlanWrapper>
          <MissionHeader
            title="Strategic Intent"
            link={`${location}?ui=strategic-intent`}
            index="3"
          />
          <MissionWrapper
            title="Strategic Intent"
            status={missionData?.strategic_intents?.[0]?.status}
          >
            <MissionItems
              // data={strategicIntent}
              strategicIntentData={missionData?.strategic_intents}
              strategicIntent
            />
          </MissionWrapper>
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Specified Task"
            link={`${location}?ui=specified-intent`}
            index="4"
          />
          <MissionWrapper
            title="Specified Task "
            status={missionData?.specified_tasks?.[0]?.status}
          >
            {/* <MissionItems data={missionData?.specified_tasks} /> */}
            <MissionItems
              // data={specificTask}
              specifiedTasks={missionData?.specified_tasks?.length > 0}
              specifiedTasksData={missionData?.specified_tasks}
            />
          </MissionWrapper>
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Implied Task"
            link={`${location}?ui=implied-task`}
            index="5"
          />
          {/* <MissionWrapper
            title="Implied Task"
            status={missionData?.specified_tasks?.[0]?.status}
          > */}
          {/* <MissionItems
              impliedTask={missionData?.specified_tasks?.length > 0}
              specifiedTasksData={missionData?.specified_tasks}
            /> */}

          <SpecifiedTasksDropDown
            data={missionData?.specified_tasks ?? []}
            approvables={missionData?.specified_tasks?.approvables ?? []}
            loading={false}
            bg="bg-white"
          />
          {/* <MissionItems data={impliedTask} /> */}
          {/* </MissionWrapper> */}
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Freedom & Constraints"
            link={`${location}?ui=boundaries`}
            index="6"
          />
          <MissionWrapper
            title=""
            status={missionData?.boundaries?.[0]?.status}
          >
            <div className="flex flex-col gap-[1rem]">
              {/* <MissionItems data={freedom} /> */}
              <div>
                {/* <MissionItems data={missionData?.boundaries[0]} /> */}
                <MissionItems
                  // data={constraints}
                  boundaries={missionData?.boundaries?.length > 0}
                  boundariesData={missionData?.boundaries}
                />
              </div>
            </div>
          </MissionWrapper>
        </MissionPlanWrapper>
      </div>
      <div className="flex mt-[20px] gap-[20px] items-center">
        <div
          className="flex text-xs items-center gap-[5px] text-primary cursor-pointer select-none"
          onClick={goBack}
        >
          <span>
            <BackIcon className="bg-transparent text-back" />
          </span>
          <span>Go Back to Edit</span>
        </div>

        <Button
          // type="button"
          onClick={handleUpload}
          // className="bg-[var(--primary-color)] text-sm text-white px-[22px] py-[8px] cursor-pointer select-none hover:bg-[var(--primary-accent-color)] rounded-sm shadow-md"
          type="submit"
          disabled={isSubmittingMissionPlan}
          loading={isSubmittingMissionPlan}
          loadingText="Uploading..."
          className={cn(
            "",
            isSubmittingMissionPlan
              ? "opacity-50 cursor-not-allowed w-max py-5 px-2 rounded-sm "
              : "bg-[var(--primary-color)] text-sm text-white px-[22px] py-[8px] cursor-pointer select-none hover:bg-[var(--primary-accent-color)] rounded-sm shadow-md"
          )}
        >
          <p>Upload</p>
        </Button>
      </div>
      <ConfirmationModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Mission Plan Submitted!"
        message="Congratulations ! you have successfully submitted your Mission Plan. Click on the button below to continue"
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        handleClick={() => router.push(ADMIN.MISSION_PLAN)}
        actionBtnTitle="View Status"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      />
    </div>
  );
};

export default MissionDetailPreview;
