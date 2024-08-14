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
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MissionHeader,
  MissionItems,
  MissionPlanWrapper,
  MissionWrapper,
} from "@/components/fragment";
import BackIcon from "@/public/assets/icons/BackIcon";

interface Props {
  missionDetails: any;
}

const MissionDetailPreview = ({ missionDetails }: Props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = usePathname();

  const router = useRouter();
  const goBack = () => router.back();

  const { ADMIN } = routesPath;

  console.log(missionDetails, "mission details");

  return (
    <div className="w-[60vw]">
      <h1 className=" text-[var(--primary-color)] font-[600] text-base">
        Preview Mission Plan Information
      </h1>
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
            status={missionDetails?.mission_statement?.status}
            // status={"approved"}
            comment="2"
          >
            <p className="leading-relaxed  text-sm">
              {/* My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
              pulvinar arcu, mi. */}
              {missionDetails?.mission_statement?.mission || "_"}
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
            status="rejected"
            comment="2"
          >
            <MeasureOfSuccessTable
              data={missionDetails?.measure_of_success}
              // data={measuresData}
              columns={measureColumns}
            />
          </MissionWrapper>
        </MissionPlanWrapper>

        <MissionPlanWrapper>
          <MissionHeader
            title="Strategic Intent"
            link={`${location}?ui=strategic-intent`}
            index="3"
          />
          <MissionWrapper title="Strategic Intent" status="pending">
            <MissionItems
              data={strategicIntent}
              strategicIntent={missionDetails?.strategic_intent}
            />
          </MissionWrapper>
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Specified Task"
            link={`${location}?ui=specified-intent`}
            index="4"
          />
          <MissionWrapper title="Specified Task 1" status="approved">
            <MissionItems data={specificTask} />
          </MissionWrapper>
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Implied Task"
            link={`${location}?ui=implied-task`}
            index="5"
          />
          <MissionWrapper title="Implied Task 1" status="approved">
            <MissionItems data={impliedTask} />
          </MissionWrapper>
        </MissionPlanWrapper>
        <MissionPlanWrapper>
          <MissionHeader
            title="Freedom & Constraints"
            link={`${location}?ui=boundaries`}
            index="6"
          />
          <MissionWrapper title="Freedom" status="approved">
            <div className="flex flex-col gap-[1rem]">
              <MissionItems data={freedom} />
              <div>
                <div className="text-[var(--primary-color)] font-[500] leading-relaxed pb-[11px]">
                  <h4>Constraints</h4>
                </div>
                <MissionItems data={constraints} />
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
          type="button"
          onClick={() => setShowSuccessModal(true)}
          className="bg-[var(--primary-color)] text-sm text-white px-[22px] py-[8px] cursor-pointer select-none hover:bg-[var(--primary-accent-color)] rounded-sm shadow-md"
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
