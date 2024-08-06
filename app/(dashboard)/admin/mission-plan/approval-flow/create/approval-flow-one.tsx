import CustomSelect from "@/components/custom-select";
import React, { useState } from "react";

interface Option {
  label: string | number;
  value: string | number;
}

interface Prop {
  levelOption: Option[];
  reviewersOption: Option[];
  selectedReviewer: string;
  setSelectedReviewer: (event: string) => void;
}

const ApprovalFlowOne = ({
  levelOption,
  reviewersOption,
  selectedReviewer,
  setSelectedReviewer,
}: Prop) => {
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  const [numLevels, setNumLevels] = useState(1);
  const [selectedLevels, setSelectedLevels] = useState<{
    [key: number]: string;
  }>({});
  const handleSelectChangeForLevel = (level: number, value: string) => {
    setSelectedLevels((prevSelectedLevels) => ({
      ...prevSelectedLevels,
      [level]: value,
    }));
  };

  const generateLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-3">
          <p className="font-normal text-[16px]">
            1. How many levels of approval should be for employee mission plan
          </p>

          <CustomSelect
            placeholder="Select number of levels..."
            options={levelOption}
            selected={numLevels.toString()}
            setSelected={(value) => setNumLevels(Number(value))}
            className="w-[127px]"
          />

          <div className="flex flex-col gap-10 mt-5">
            {Array.from({ length: numLevels }, (_, i) => (
              <div key={i}>
                <CustomSelect
                  label={`${generateLabel(
                    i
                  )}. Who should have approval power for Level ${i + 1}`}
                  placeholder="Select..."
                  options={reviewersOption}
                  selected={selectedLevels[i + 1] || ""}
                  setSelected={(value) =>
                    handleSelectChangeForLevel(i + 1, value)
                  }
                  labelClass={labelClassName}
                  className="w-[226px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <p className="font-normal text-[16px]">
            2. Who reviews MD mission plan?
          </p>
          <CustomSelect
            placeholder="Select..."
            options={reviewersOption}
            className=" w-[303px]"
            selected={selectedReviewer}
            setSelected={setSelectedReviewer}
          />
        </div>
      </div>
    </div>
  );
};

export default ApprovalFlowOne;
