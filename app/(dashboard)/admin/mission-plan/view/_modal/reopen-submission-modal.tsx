import SecondModalContainer from "@/components/second-modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalContainerProps { 
  show: boolean;
  handleClose?: () => void;     
}

export default function ReopenSubmissionModal({
  show,
  handleClose, 
}: ModalContainerProps) {
  return (
    <SecondModalContainer
      show={show}
      title="Reopen Submission"
      handleClose={handleClose}
      hasCloseButton={true}
      modalClass="md:w-[32.8rem] md:max-w-[37.8rem] lg:w-[50.4rem] lg:max-w-[50.4rem]"
    >
      <div className="px-6">
        <Button>Re-open</Button>
      </div>
    </SecondModalContainer>
  );
}
