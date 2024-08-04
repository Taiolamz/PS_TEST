import React, { useState } from "react";
import { approvalFlowDetails } from "./utils";
import CustomSelect from "@/components/custom-select";
import { CustomAccordion } from "@/components/custom-accordion";

interface Option {
  label: string | number;
  value: string | number;
}

interface Prop {
  options: Option[];
}

interface SelectedLevels {
  [key: number]: string;
}

const ApprovalFlowTwo = ({ options }: Prop) => {
  const [selectedLevels, setSelectedLevels] = useState<SelectedLevels>({});

  const handleSelectChangeForLevel = (level: number, value: string) => {
    setSelectedLevels((prevSelectedLevels) => ({
      ...prevSelectedLevels,
      [level]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      {approvalFlowDetails.map((chi, idx) => (
        <CustomAccordion
          key={idx}
          className="mb-4 p-5 border border-custom-divider rounded  flex flex-col gap-1 "
          title={
            <p className="font-medium text-sm mb-2">
              {idx + 1}. How many levels of approval should be for{" "}
              <span className="text-primary">{chi}</span> before the final
              approval?
            </p>
          }
          content={
            <CustomSelect
              placeholder="Select..."
              options={options}
              selected={selectedLevels[idx] || ""}
              setSelected={(value) => handleSelectChangeForLevel(idx, value)}
              className="w-[150px]"
            />
          }
        />
      ))}
    </div>
  );
};

export default ApprovalFlowTwo;
