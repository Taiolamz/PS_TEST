import React from "react";
import { ModalButtonClose } from "./modal-button";
import { Button } from "@/components/ui/button";

const DeleteSpecifiedTaskModal = ({ onProceed, isLoading }: any) => {
  const btnClass =
    "font-normal py-0 px-4 h-[32px] transition-all duration-300 ";
  return (
    <div className="flex flex-col gap-5 ">
      <p className="text-black text-center font-medium text-sm ">
        Are you sure you want to delete this specified task?
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
        <Button
          className={btnClass}
          onClick={onProceed}
          loading={isLoading}
          loadingText="Delete Task"
          disabled={isLoading}
        >
          Delete Task
        </Button>
      </div>
    </div>
  );
};

export default DeleteSpecifiedTaskModal;
