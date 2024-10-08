import DashboardModal from "@/app/(dashboard)/admin/checklist/_components/checklist-dashboard-modal";
import ModalContainer from "@/components/modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { X } from "lucide-react";
import React from "react";

const DeactivateOrgModal = ({
  show,
  onModalChange,
  organization,
  content,
  onDeactivate,
  isLoading,
}: {
  show: boolean;
  onModalChange: () => void;
  organization?: string;
  content?: string;
  onDeactivate?: () => void;
  isLoading?: boolean;
}) => {
  const cancelIcon = (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.333008"
        width="32.6672"
        height="32.667"
        rx="16.3335"
        fill="#EEF0F2"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.9235 16.3336L21.7396 12.5176C22.0871 12.17 22.0871 11.6082 21.7396 11.2607C21.392 10.9131 20.8302 10.9131 20.4827 11.2607L16.6666 15.0767L12.8506 11.2607C12.503 10.9131 11.9412 10.9131 11.5937 11.2607C11.2461 11.6082 11.2461 12.17 11.5937 12.5176L15.4097 16.3336L11.5937 20.1496C11.2461 20.4972 11.2461 21.059 11.5937 21.4065C11.767 21.5799 11.9946 21.667 12.2221 21.667C12.4497 21.667 12.6772 21.5799 12.8506 21.4065L16.6666 17.5905L20.4827 21.4065C20.656 21.5799 20.8835 21.667 21.1111 21.667C21.3387 21.667 21.5662 21.5799 21.7396 21.4065C22.0871 21.059 22.0871 20.4972 21.7396 20.1496L17.9235 16.3336Z"
        fill="#EC1410"
      />
    </svg>
  );

  return (
    <DashboardModal
      className={"!rounded-none "}
      open={show}
      onOpenChange={onModalChange}
    >
      <>
        <div className="flex relative justify-between items-center mb-[18px]">
          <h4 className="text-[var(--bg-red-100)]">
            Deactivate {organization || "Department"}
          </h4>
          <figure
            className="absolute cursor-pointer right-0 -mr-3 z-[999] -mt-3"
            onClick={onModalChange}
          >
            {cancelIcon}
          </figure>
          {/* <X className="size-[18px] cursor-pointer" onClick={onModalChange} /> */}
        </div>
        <p className="text-[var(--text-color4)] leading-5 text-sm font-light text-left">
          {content}
        </p>
        <div className="flex justify-end">
          <Button
            loading={isLoading}
            loadingText="Deactivating..."
            disabled={isLoading}
            // className={cn("font-light bg-[var(--bg-red-100)] mt-5 ")}
            className={` font-light ${
              isLoading
                ? "border  border-custom-divider font-medium  bg-custom-bg  text-custom-gray-scale-300 hover:bg-transparent cursor-not-allowed"
                : ""
            } font-light bg-[var(--bg-red-100)] mt-5  `}
            onClick={onDeactivate}
          >
            Yes, Deactivate
          </Button>
        </div>
      </>
    </DashboardModal>
  );
};

export default DeactivateOrgModal;
