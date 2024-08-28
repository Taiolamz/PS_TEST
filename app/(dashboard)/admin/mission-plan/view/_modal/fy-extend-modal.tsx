import EndFinancialYearCompleteModal from "@/components/atoms/modals/end-fianancial-year-complete";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ModalContainerProps {
  show: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  style?: string;
}

export default function FYExtendModal({
  show,
  handleClose,
  children,
  style,
}: ModalContainerProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEndFinancialYearClick = () => {
    setShowSuccessModal(true);
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <ReusableModalContainer
      show={show}
      handleClose={handleClose}
      hasCloseButton={true}
      title="Financial Year Extension"
      modalClass={`md:w-[28.8rem] md:max-w-[30.8rem] ${style}`}
    >
      {children}
      <div className="px-6">
        <Button
          className="w-fit rounded-sm p-3 px-9 font-normal transition-all duration-200"
          onClick={handleEndFinancialYearClick}
        >
          Extend Financial Year
        </Button>
        <EndFinancialYearCompleteModal
          icon="/assets/images/success.gif"
          iconClass="w-40"
          title="Financial Year Extended!!!"
          message="Congratulations! You have successfully extended your financial year. Click on the button below to continue."
          show={showSuccessModal}
          handleClose={() => {
            handleClose();
            setShowSuccessModal(false);
          }}
          modalClass="lg:w-[750px] lg:max-w-[600px]"
        />
      </div>
    </ReusableModalContainer>
  );
}
