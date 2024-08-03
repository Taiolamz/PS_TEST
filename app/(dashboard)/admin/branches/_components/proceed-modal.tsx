import { Button } from "@/components/ui/button";
import React from "react";
import { ModalButtonClose } from "./modal-button";

const ProceedModal = ({ onProceed }: ModalType) => {
  const btnClass =
    "font-normal py-0 px-4 h-[32px] transition-all duration-300 ";
  return (
    <div className="flex flex-col gap-5 ">
      <p className="text-black text-center font-medium text-sm ">
        Would you like to continue with the checklist
      </p>
      <div className="flex justify-center items-center gap-4">
        <ModalButtonClose>
          <Button
            variant="outline"
            className={`border-primary text-primary hover:text-primary ${btnClass}`}
          >
            No
          </Button>
        </ModalButtonClose>
        <Button className={btnClass} onClick={onProceed}>
          Yes
        </Button>
      </div>
    </div>
  );
};

export default ProceedModal;
