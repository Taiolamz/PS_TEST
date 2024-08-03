import { Button } from "@/components/ui/button";
import React from "react"; 
import { ModalButtonClose } from "./modal-button";

const CancelModal = ({ modalTitle, onProceed }: ModalType) => {
  const btnClass =
    "font-normal py-0 px-4 h-[32px] transition-all duration-300 ";
  return (
    <div className="flex flex-col gap-3 ">
      <p className="font-normal text-base text-custom-dark-blue">
        {` Cancel ${!modalTitle ? "Unit" : modalTitle}`}
      </p>
      <p className="text-custom-gray-scale-400 font-light text-sm ">
        You are about to cancel this action. Are you sure you want to proceed ?
      </p>
      <div className="flex justify-end items-center gap-4">
        <ModalButtonClose>
          <Button
            variant="outline"
            className={`border-primary text-primary hover:text-primary ${btnClass}`}
          >
            No
          </Button>
        </ModalButtonClose>
        <Button className={btnClass} onClick={onProceed}>
          Yes, cancel
        </Button>
      </div>
    </div>
  );
};

export default CancelModal;
