import { Dictionary } from "@/@types/dictionary";
import EndFinancialYearModal from "@/components/atoms/modals/end-financial-year";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FYExtendModal from "../_modal/fy-extend-modal";
import CustomDateInput from "@/components/custom-date-input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { useExtendFinancialYearMutation } from "@/redux/services/mission-plan/allmissionplanApi";
import { formatDate, formatRMDatePicker } from "@/utils/helpers/date-formatter";
import { useSearchParams } from "next/navigation";
import EndFinancialYearCompleteModal from "@/components/atoms/modals/end-fianancial-year-complete";
import { useGetOrganizationMissionPlansQuery } from "@/redux/services/mission-plan/missionPlanApi";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { Button } from "@/components/ui/button";
import EndFYModal from "../_modal/end-fy-modal";
import ConfirmationModal from "@/components/atoms/modals/confirm";

const FiscalYearInfo = () => {
  const [endFY, setExtendSubmission] = useState<boolean>(false);
  const [showSuccessExtendModal, setShowExtendSuccessModal] = useState(false);
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const btn =
    "px-[1rem] py-[4px] text-[var(--primary-color)] bg-white text-sm border border-[var(--primary-color)] text-center rounded-sm font-[500] h-fit cursor-pointer hover:bg-[var(--primary-accent-color)] select-none";

  const [extendFinancialYear, { isLoading, error: apiError }]: any =
    useExtendFinancialYearMutation();

  const dispatch = useAppDispatch();

  const [date, setdate] = useState({ new_end_date: "" });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleSubmit = async () => {
    let value = { fiscal_year_id: id, new_end_date: date.new_end_date };

    value.new_end_date = formatDate(value.new_end_date);

    extendFinancialYear(value)
      .unwrap()
      .then((payload: Dictionary) => {
        // Fetch and update fiscal year information after extending financial year
        dispatch(
          updateMissionPlanDetails({
            slug: "active_fy_info",
            data: payload?.data?.organization_mission_plan,
          })
        );
        setExtendSubmission(false);
        setShowExtendSuccessModal(true);
      });
  };

  const handleChange = (date: any | null) => {
    if (date) {
      setdate({ new_end_date: formatDate(date) });
    }
  };

  const handleEndFinancialYearClick = () => {
    setShowSuccessModal(true);
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };
  //Modal for End Financial Year
  const [endFinancialYear, setEndFinancialYear] = useState<boolean>(false);
  //Modal for Success End Financial Year
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <div className="space-y-5 mb-6 px-5 mt-1 text-[var(--text-color3)]">
      {/* Financial Year */}
      <div className="flex gap-[10px] justify-end ">
        <Button
          className={cn(btn, "disabled:opacity-30")}
          disabled={active_fy_info?.status !== "active"}
          onClick={() => setExtendSubmission(true)}
        >
          Extend Financial Year
        </Button>
        <Button
          className={cn(btn, "disabled:opacity-30")}
          disabled={active_fy_info?.status !== "active"}
          onClick={() => {
            setEndFinancialYear(true);
          }}
        >
          End Financial Year
        </Button>
      </div>

      {/* <EndFinancialYearModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="You Are About to End the Current Financial Year?"
        message="Ending this Financial year closes all mission plans and task progress will also be lost and saved as at the time of this action, This action is permanent, Proceed?"
        // show={showSuccessModal}
        handleClose={() => {
          setShowSuccessModal(false);
        }}
        actionBtnTitle="Yes, End Financial Year"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      /> */}

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
        show={endFY}
        handleClose={() => setExtendSubmission(false)}
        handleSubmit={handleSubmit}
        style="lg:max-w-[700px] lg:w-[600px] h-[600px "
        loading={isLoading}
        disabled={!date?.new_end_date}
      >
        <form className="p-10">
          <div className="flex text-custom-gray-scale-300">
            <div className="">
              <CustomDateInput
                id="start_date"
                name="start_date"
                error=""
                handleChange={handleCloseModal}
                labelClass="text-custom-gray-scale-300 pb-1"
                disabled={true}
                format=""
                selected={active_fy_info.start_date}
                placeholder="September 2024"
                showIcon={false}
                label="Previous Start date"
                className="p-2" // Adjust the padding here as needed
              />
            </div>
            <div className="ml-5">
              <CustomDateInput
                id="end_date"
                name="end_date"
                error="nothing"
                labelClass="text-custom-gray-scale-300 pb-1"
                handleChange={handleCloseModal}
                selected={active_fy_info.end_date}
                disabled={true}
                placeholder="October 2024"
                showIcon={false}
                label="Previous End date"
                className="p-2"
              />
            </div>
          </div>
          <div className="flex flex-col mt-5 w-[195px] h-[40px]">
            <CustomDateInput
              id="new_end_date"
              label="New End Date"
              handleChange={handleChange}
              className="w-full h-full"
              placeholder="YYYY-MM-DD"
              labelClass="text-custom-gray-scale-300 pb-1"
              showIcon={true}
              format=""
              error=""
            />
          </div>
          <div className="mt-16">
            <Textarea
              label="Reason For Extension"
              placeholder=" "
              id="reason_for_extension"
              name="reason_for_extension"
              className="w-[405px] mt-2 h-[71px] rounded-md border-[2px] outline-none border-custom-divider resize-none p-2"
              labelClass="text-custom-gray-scale-300 pb-1"
            />
          </div>
        </form>
      </FYExtendModal>
      {/* <EndFinancialYearCompleteModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Financial Year Extended!!!"
        message="Congratulations! You have successfully extended your financial year. Click on the button below to continue."
        show={showSuccessExtendModal}
        handleClose={() => {
          setShowExtendSuccessModal(false);
        }}
        modalClass="lg:w-[753px] lg:max-w-[605px] p-6"
      /> */}
      {/* End FY */}
      <EndFYModal
        show={endFinancialYear}
        setSuccessModal={setShowSuccessModal}
        handleClose={() => setEndFinancialYear(false)}
        fy_id={id ?? ""}
      />
      {/* Confirm Modal for End of FY */}
      <ConfirmationModal
        icon="/assets/images/success.gif"
        iconClass="w-40"
        title="Current Financial Year Ended!"
        message="Congratulations! you have successfully brought the current Financial Year to a close"
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        handleClick={() => setShowSuccessModal(false)}
        actionBtnTitle="Complete"
        modalClass="lg:w-[30.5rem] lg:max-w-[30.5rem]"
      />
    </div>
  );
};

export default FiscalYearInfo;
