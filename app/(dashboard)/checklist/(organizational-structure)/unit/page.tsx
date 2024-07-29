import React from "react";
import { ChecklistLayout } from "../../_components/checklist-layout";

export default function Units() {
  const emptyStateClass = "flex justify-center items-center";
  return (
    <ChecklistLayout
      //   onCancel={handleCancelDialog}
      title="Units"
      step={`Step 4 of 4`}
      className={false ? emptyStateClass : ""}
      btnDisabled
      showBtn
      shouldProceed={false}
      //   onProceedBtn={handleProceedDialog}
    >
      Unit
    </ChecklistLayout>
  );
}
