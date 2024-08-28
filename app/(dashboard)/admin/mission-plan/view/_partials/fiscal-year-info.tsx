import { Dictionary } from "@/@types/dictionary";
import EndFinancialYearModal from "@/components/atoms/modals/end-financial-year";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import React, { useState } from "react";
import FYExtendModal from "../_modal/fy-extend-modal";
import CustomDateInput from "@/components/custom-date-input";
import { Textarea } from "@/components/ui/textarea";

const FiscalYearInfo = () => {
  const [extendSubmission, setExtendSubmission] = useState<boolean>(false);
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] bg-white text-sm border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEndFinancialYearClick = () => {
    setShowSuccessModal(true);
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="space-y-5 mb-6 px-5 mt-1 text-[var(--text-color3)]">
      {/* Financial Year */}
      <div className="flex gap-[10px] justify-end ">
        <button
          className={cn(
            btn,
            active_fy_info?.status !== "active" && "opacity-30 hover:bg-white"
          )}
          onClick={() => setExtendSubmission(true)}
          disabled={active_fy_info?.status !== "active"}
        >
          Extend Financial Year
        </button>
        <button
          className={cn(
            btn,
            active_fy_info?.status !== "active" && "opacity-30 hover:bg-white"
          )}
          disabled={active_fy_info?.status !== "active"}
          onClick={handleEndFinancialYearClick}
        >
          End Financial Year
        </button>
      </div>

      <EndFinancialYearModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="You Are About to End the Current Financial Year?"
        message="Ending this Financial year closes all mission plans and task progress will also be lost and saved as at the time of this action, This action is permanent, Proceed?"
        show={showSuccessModal}
        handleClose={() => {
          setShowSuccessModal(false);
        }}
        actionBtnTitle="Yes, End Financial Year"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      />

      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">1. Financial Year</h3>
        <div className="grid grid-cols-10 gap-5 mt-4 max-w-4xl">
          {/* Title */}
          <div className="col-span-4 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Title
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.title}
            </p>
          </div>
          {/* Start Period */}
          <div className="col-span-3 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Start Period
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.start_date}
            </p>
          </div>
          {/* End Period */}
          <div className="col-span-3 space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              End Period
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.end_date}
            </p>
          </div>
        </div>
      </div>
      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">2. Mission and Vision</h3>
        <div className="space-y-7 mt-4 max-w-4xl">
          {/* Mission */}
          <div className="space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Mission
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.mission}
            </p>
          </div>
          {/* Vision */}
          <div className="space-y-2">
            <h4 className="text-[var(--text-color4)] font-light text-sm">
              Vision
            </h4>
            <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
              {active_fy_info?.vision}
            </p>
          </div>
        </div>
      </div>
      <div className="border bg-white rounded-[5px] border-[var(--input-border-[1.5px])] px-8 py-7">
        <h3 className="text-sm font-normal ">3. Strategic Pillars</h3>
        <div className="mt-4 max-w-lg">
          {/* Pillar 1 */}
          {active_fy_info?.strategic_pillars?.map(
            (item: Dictionary, idx: number) => (
              <div className="mb-6" key={idx}>
                <h4 className="text-[var(--text-color4)] font-light text-sm">
                  Pillar {idx + 1}
                </h4>
                <p className="border-[1.5px] rounded-[5px] border-[var(--input-border-[1.5px])] min-w-52 place-content-center text-sm font-normal px-4 py-2">
                  {item?.title}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <FYExtendModal
        show={extendSubmission}
        handleClose={() => setExtendSubmission(false)}
        style="lg:max-w-[900px] lg:w-[800px]"
      >
        <form className="p-5">
          <div className=" flex text-custom-gray-scale-300">
            <div className=" ">
              <CustomDateInput
                id="start_date"
                name="start_date"
                error="nothing"
                handleChange={handleCloseModal}
                labelClass=" text-[16px]"
                disabled={true}
                format=" "
                placeholder="previous start date"
                showIcon={false}
                label=" Previous Start date"
              />
            </div>
            <div className=" ml-5">
              <CustomDateInput
                id="end_date"
                name="end_date"
                error="nothing"
                labelClass=" text-[16px]"
                handleChange={handleCloseModal}
                disabled={true}
                format=" "
                placeholder="previous end date"
                showIcon={false}
                label=" Previous End date"
              />
            </div>
          </div>
          <div className=" flex flex-col mt-5 w-[205px] h-[40px]">
            <CustomDateInput
              id="new_end_date"
              label="New End Date"
              handleChange={handleCloseModal}
              className="w-full h-full"
              placeholder=" "
              labelClass=" text-[16px] text-black"
              showIcon={false}
              format=""
              error="nothing"
            />
          </div>
          <div className=" mt-16">
            <Textarea
              label="Reason For Extension"
              placeholder=" "
              id="reason_for_extension"
              name="reason_for_extension"
              className="w-[425px] mt-2 h-[71px] rounded-md border-[2px] outline-none border-custom-divider resize-none"
              labelClass="text-custom-gray-scale-300 pb-1"
            />
          </div>
        </form>
      </FYExtendModal>
    </div>
  );
};

export default FiscalYearInfo;
