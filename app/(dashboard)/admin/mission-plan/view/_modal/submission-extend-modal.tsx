import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalContainerProps {
  show: boolean;
  handleClose?: () => void;
}

export default function SubmissionExtendModal({
  show,
  handleClose,
}: ModalContainerProps) {
  return (
    <ReusableModalContainer
      show={show}
      handleClose={handleClose}
      hasCloseButton={true}
      title="Submission Extension"
      modalClass="md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[39.5rem]"
    >
      <div className="px-6">
        <Button>Extend Mission Plan Submission</Button>
      </div>
    </ReusableModalContainer>
  );
}
