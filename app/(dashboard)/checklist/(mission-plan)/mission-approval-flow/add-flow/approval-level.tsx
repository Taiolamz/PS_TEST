import CustomSelect from "@/components/custom-select";
import React from "react";

interface Option {
  label: string | number;
  value: string | number;
}

interface Prop {
  levelOneOption: Option[];
  oneSelectedLevel: string;
  setOneSelectedLevel: () => void;
  levelTwoOption: Option[];
  twoSelectedLevel: string;
  setTwoSelectedLevel: () => void;
  levelThreeOption: Option[];
  threeSelectedLevel: string;
  setThreeSelectedLevel: () => void;
  levelFourOption: Option[];
  fourSelectedLevel: string;
  setFourSelectedLevel: () => void;
  levelFiveOption: Option[];
  fiveSelectedLevel: string;
  setFiveSelectedLevel: () => void;
}

const ApprovalLevel = ({
  levelOneOption,
  oneSelectedLevel,
  setOneSelectedLevel,
  levelTwoOption,
  twoSelectedLevel,
  setTwoSelectedLevel,
  levelThreeOption,
  threeSelectedLevel,
  setThreeSelectedLevel,
  levelFourOption,
  fourSelectedLevel,
  setFourSelectedLevel,
  levelFiveOption,
  fiveSelectedLevel,
  setFiveSelectedLevel,
}: Prop) => {
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  return (
    <div>
      <CustomSelect
        label="A. Who should have approval power for Level 1 "
        isRequired
        placeholder="Select..."
        options={levelOneOption}
        selected={oneSelectedLevel}
        setSelected={setOneSelectedLevel}
        labelClass={labelClassName}
      />

      <CustomSelect
        label="C. Who should have approval power for Level 2"
        isRequired
        placeholder="Select..."
        options={levelTwoOption}
        selected={twoSelectedLevel}
        setSelected={setTwoSelectedLevel}
        labelClass={labelClassName}
      />

      <CustomSelect
        label="D. Who should have approval power for Level 3"
        isRequired
        placeholder="Select..."
        options={levelThreeOption}
        selected={threeSelectedLevel}
        setSelected={setThreeSelectedLevel}
        labelClass={labelClassName}
      />

      <CustomSelect
        label="E. Who should have approval power for Level 4"
        isRequired
        placeholder="Select..."
        options={levelFourOption}
        selected={fourSelectedLevel}
        setSelected={setFourSelectedLevel}
        labelClass={labelClassName}
      />

      <CustomSelect
        label="E. Who should have approval power for Level 5"
        isRequired
        placeholder="Select..."
        options={levelFiveOption}
        selected={fiveSelectedLevel}
        setSelected={setFiveSelectedLevel}
        labelClass={labelClassName}
      />
    </div>
  );
};

export default ApprovalLevel;
