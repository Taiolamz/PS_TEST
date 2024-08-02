import React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import ChecklistNavbar from "./checklist-navbar";
import ChecklistSidebar from "./checklist-sidebar";

const ChecklistLayout = ({
  children,
  title,
  onProceedBtn,
  showBtn,
  step,
  className,
  btnDisabled,
  shouldProceed,
  onCancel,
  loading,
}: DashboardSettingsLayoutType) => {
  return (
    <Dialog>
      <div className="relative">
        <ChecklistNavbar
          onCancel={onCancel}
          title={title}
          onProceedBtn={onProceedBtn}
          step={step}
          showBtn={showBtn}
          btnDisabled={btnDisabled}
          shouldProceed={shouldProceed}
          loading={loading}
        />
        <ChecklistSidebar />
        <div
          className={`absolute right-0 bottom-0 bg-white w-[calc(100%-235px)] pb-[40px] overflow-auto h-[calc(100%-56px)] ${className}`}
        >
          <div className="relative p-3 px-8 pr-16 ">
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ChecklistLayout;
