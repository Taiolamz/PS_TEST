import EndFinancialYearCompleteModal from "@/components/atoms/modals/end-fianancial-year-complete";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import React, { useState } from "react";

interface ModalContainerProps {
  show: boolean;
  loading?: boolean;
  disabled?: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  style?: string;
  handleSubmit: () => void;
}

export default function FYExtendModal({
  show,
  loading,
  disabled,
  handleClose,
  handleSubmit,
  children,
  style,
}: ModalContainerProps) {
  return (
    <ReusableModalContainer
      show={show}
      handleClose={handleClose}
      hasCloseButton={true}
      title="Financial Year Extension"
      modalClass={`md:w-[28.8rem] md:max-w-[30.8rem] ${style}`}
    >
      {children}
      <div className="px-6 pb-10">
        <Button
          className="w-fit rounded-sm p-3 px-9 ml-4 font-normal transition-all duration-200"
          loading={loading}
          disabled={disabled || loading}
          loadingText="Extend Financial Year"
          onClick={handleSubmit}
        >
          Extend Financial Year
        </Button>
      </div>
    </ReusableModalContainer>
  );
}
