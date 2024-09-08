import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useEndFinancialYearMutation } from "@/redux/services/mission-plan/allmissionplanApi";
import { useAppDispatch } from "@/redux/store";
import React, { useState } from "react";

interface ModalContainerProps {
  show: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  fy_id: string;
}
export default function EndFYModal({
  show,
  fy_id,
  setSuccessModal,
  handleClose,
}: ModalContainerProps) {
  const dispatch = useAppDispatch();
  //Service for end fy
  const [endFinancialYear, { isLoading, data: updatedData }] =
    useEndFinancialYearMutation();
  const handleConfirm = () => {
    try {
      endFinancialYear({ fiscal_year_id: fy_id })
        .unwrap()
        .then(
          (res) => {
            dispatch(
              updateMissionPlanDetails({
                slug: "active_fy_info",
                data: res?.data.organization_mission_plan,
              })
            );
            setSuccessModal(true);
            handleClose();
          },
          (error) => {
            console.log(error, "unknown error");
          }
        );
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <ModalContainer
      show={show}
      title="Reopen Submission"
      handleClose={handleClose}
      hasCloseButton={false}
      modalClass="rounded-none py-10 px-6 bg-white md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[527px] lg:max-w-[547px]"
    >
      <section>
        <div className="">
          <div className="text-center mb-5">
            <h3 className="mt-[14px] text-[var(--text-color5)] text-2xl font-semibold mx-auto">
              You Are About to End the Current Financial Year?
            </h3>
            <p className="text-sm px-9 font-normal mx-auto mt-4 text-[#5B6871]">
              Ending this Financial year closes all mission plans and task
              progress will also be lost and saved as at the time of this
              action, This action is permanent, Proceed?
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <Button
                disabled={isLoading}
                className="bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-color2)] border rounded shadow-none disabled:cursor-not-allowed"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isLoading}
                loading={isLoading}
                loadingText="Yes, End Financial Year"
                className="px-9 rounded bg-red-500"
              >
                Yes, End Financial Year
              </Button>
            </div>
          </div>
        </div>
      </section>
    </ModalContainer>
  );
}
