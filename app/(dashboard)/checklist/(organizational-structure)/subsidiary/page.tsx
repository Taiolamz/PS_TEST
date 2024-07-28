import React from "react";
import { ChecklistLayout } from "../../_components/checklist-layout";

export default function Subsidiary() {
  const emptyStateClass = "flex justify-center items-center";
  return (
    <ChecklistLayout
      //   onCancel={handleCancelDialog}
      title="Subsidiaries"
      step={`Step 1 of 4`}
      className={false ? emptyStateClass : ""}
      btnDisabled
      showBtn
      shouldProceed={false}
      //   onProceedBtn={handleProceedDialog}
    >
      Subsidiary
    </ChecklistLayout>
  );
}
