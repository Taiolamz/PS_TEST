import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalContainerProps {
  show: boolean;
  handleClose?: () => void;
  children?: React.ReactNode
}

export default function FYExtendModal({
  show,
  handleClose,
  children
}: ModalContainerProps) {
  return (
    <ReusableModalContainer
      show={show}
      handleClose={handleClose}
      hasCloseButton={true}
      title="Financial Year Extension"
      modalClass="md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[39.5rem]"
    >
      {children}
      <div className="px-6">
        <Button>Extend Financial Year</Button>
      </div>
    </ReusableModalContainer>
  );
}
