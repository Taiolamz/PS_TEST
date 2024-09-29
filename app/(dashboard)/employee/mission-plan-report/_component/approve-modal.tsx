import React from "react";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function ApproveModal({
  show,
  desc,
  handleClose,
  loading,
  title,
  handleSubmit,
}: {
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  desc?: string;
  title?: string;
  loading?: boolean;
}) {
  return (
    <ModalContainer
      show={show}
      handleClose={handleClose}
      modalClass="!min-h-[220px] !min-w-[373px] rounded "
    >
      <div className="absolute top-0 text-right">
        <div className="  w-full p-4 px-6 ">
          <div className="flex justify-between items-center mt-3 mb-[18px]">
            <h4 className="font-medium">{title ? title : "Approve?"}</h4>
            <X className="size-[18px] cursor-pointer" onClick={handleClose} />
          </div>
          <p className="text-[var(--text-color4)] text-sm text-left">
            {desc
              ? desc
              : ` Are you sure you want to approve this submission. Approving will
            send this submission to the next approval line, press the button
            below to proceed.  `}
          </p>
          <Button
            onClick={handleClose}
            loading={loading}
            loadingText="Deactivating"
            disabled={loading}
            variant={"outline"}
            className={cn(
              "font-light rounded mt-5 border-[var(--primary-color)] text-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-accent-color)]"
            )}
          >
            Review Inputs
          </Button>
          <Button
            loading={loading}
            loadingText="Deactivating"
            disabled={loading}
            onClick={handleSubmit}
            className={cn("font-light ml-4 rounded mt-5 ")}
          >
            Yes, Submit
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
