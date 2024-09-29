import React from "react";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
export default function RejectModal({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) {
  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="h-[341px] !w-[423px] rounded "
      title="Close Subsidairy"
    >
      <div className="absolute top-0 text-right">
        <div className="w-full p-4 px-6 ">
          <div className="flex justify-between items-center mt-3 mb-[18px]">
            <h4 className="text-[var(--bg-red-100)]">Approve?</h4>
            <X className="size-[18px] cursor-pointer" onClick={handleClose} />
          </div>
          <p className="text-[var(--text-color4)] text-sm text-left">
            You’re about to deactivate this Subsidiary. The Departments, units
            and staffs under this Subsidiary would be inaccessible. Do you still
            want to deactivate?
          </p>
          <Button
            loading={false}
            loadingText="Deactivating"
            disabled={false}
            className={cn("font-light bg-[var(--bg-red-100)] mt-5 ")}
          >
            Yes, Deactivate
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
