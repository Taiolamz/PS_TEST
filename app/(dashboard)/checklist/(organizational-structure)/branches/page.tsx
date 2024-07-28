import React from 'react'
import { ChecklistLayout } from '../../_components/checklist-layout'

export default function Brances() {
    const emptyStateClass = "flex justify-center items-center";
  return (
    <ChecklistLayout
    //   onCancel={handleCancelDialog}
      title="Branches"
      step={`Step 2 of 4`}
      className={false ? emptyStateClass : ""}
      btnDisabled
      showBtn
      shouldProceed={false}
    //   onProceedBtn={handleProceedDialog}
    >
      Brances
    </ChecklistLayout>
  );
}
