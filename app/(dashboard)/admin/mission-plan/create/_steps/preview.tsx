import ConfirmationModal from "@/components/atoms/modals/confirm";
import MeasureOfSuccessTable from "@/components/fragment/measure-of-success-table";
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
} from "@/components/fragment/mission-plan-template";
import {
  measureColumns,
  measuresData,
} from "@/utils/data/dashboard/missionplan/dummy";
import routesPath from "@/utils/routes";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import back from "@/public/svgs/back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MissionDetailPreview = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = usePathname()

  const router = useRouter();
  const goBack = () => router.back();

  const { ADMIN } = routesPath;

  const prevPath = "";

  return (
    <div className="w-[60vw]">
      <h1 className="text-primary"> Preview Mission Plan Information</h1>
      <span className="block mt-1 text-[#6E7C87] text-sm">
        Filled Information
      </span>
      <div className="flex flex-col gap-[12px] mt-[1rem]">
        <MissionPlanWrapper>
          <MissionHeader
            title="Mission Statement"
            link={`${location}?ui=mission-statement`}
            index="1"
          />
          <MissionWrapper
            title="Mission Statement"
            status="approved"
            comment="2"
          >
            <p className="leading-relaxed  text-xs">
              My MISSION PLAN Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Feugiat sit sed at neque. Semper suspendisse diam habitant
              pulvinar arcu, mi.
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
              data={measuresData}
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
            <MissionItems data={strategicIntent} />
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
        <div
          className="flex text-xs items-center gap-[5px] text-primary cursor-pointer select-none"
          onClick={goBack}
        >
          <span>
            <Image src={back} alt="back" />
          </span>
          <span>Go Back to Edit</span>
        </div>

        <Button
          type="button"
          onClick={() => setShowSuccessModal(true)}
          className="bg-primary text-sm text-white px-[22px] py-[8px] cursor-pointer select-none hover:bg-[var(--btn-hover-backgroundColor)] rounded-sm shadow-md"
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
