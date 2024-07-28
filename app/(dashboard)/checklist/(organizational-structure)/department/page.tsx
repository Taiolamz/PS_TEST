import React from "react";
import { ChecklistLayout } from "../../_components/checklist-layout";

export default function Department() {
  const emptyStateClass = "flex justify-center items-center";
  return (
    <ChecklistLayout
      //   onCancel={handleCancelDialog}
      title="Departament"
      step={`Step 3 of 4`}
      className={false ? emptyStateClass : ""}
      btnDisabled
      showBtn
      shouldProceed={false}
      //   onProceedBtn={handleProceedDialog}
    >
      Department
    </ChecklistLayout>
  );
}
