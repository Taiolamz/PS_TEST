import React, { useState } from "react";
import { approvalFlowDetails } from "./utils";
import CustomSelect from "@/components/custom-select";
import { CustomAccordion } from "@/components/custom-accordion";

interface Option {
  label: string | number;
  value: string | number;
}

interface SelectedLevels {
  [key: string]: string;
}

interface NumLevels {
  [key: number]: number;
}
interface Prop {
  options: Option[];
  reviewersOption: Option[];
  setOrderValue: any;
  approvalsArray: any[];
}

const ApprovalFlowTwo = ({
  options,
  reviewersOption,
  setOrderValue,
  approvalsArray,
}: Prop) => {
  const [selectedLevels, setSelectedLevels] = useState<SelectedLevels>({});
  const [numLevels, setNumLevels] = useState<NumLevels>({});
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";
  console.log(selectedLevels, "selected levels");
  const handleSelectChangeForLevel = (
    index: number,
    level: number,
    value: string
  ) => {
    setSelectedLevels((prevSelectedLevels) => ({
      ...prevSelectedLevels,
      [`${index}-${level}`]: value,
    }));
  };

  const handleNumLevelsChange = (index: number, value: number) => {
    setNumLevels((prevNumLevels) => ({
      ...prevNumLevels,
      [index]: value,
    }));
  };

  const generateLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  const convertObjectToArray = (obj: SelectedLevels): string[] => {
    return Object.values(obj);
  };

  const handleFormatOrderOfApproval = (title: string, approvals: string[]) => {
    const array = approvalFlowDetails?.map((chi, idx) => {
      return {
        title: title,
        approvals: [approvals],
      };
    });
    console.log(array, "array");
    return array;
  };

  return (
    <div className="flex flex-col gap-5">
      {approvalFlowDetails.map((chi, idx) => (
        <CustomAccordion
          key={idx}
          className="mb-4 p-5 border border-custom-divider rounded flex flex-col gap-1"
          title={
            <p className="font-medium text-sm mb-2">
              {idx + 1}. How many levels of approval should be for{" "}
              <span className="text-primary">{chi}</span> before the final
              approval?
            </p>
          }
          content={
            <>
              <CustomSelect
                placeholder="Select..."
                options={options}
                selected={numLevels[idx]?.toString() || ""}
                setSelected={(value) =>
                  handleNumLevelsChange(idx, Number(value))
                }
                className="w-[150px]"
              />
              <div className="flex flex-col gap-10 mt-5">
                {Array.from({ length: numLevels[idx] || 1 }, (_, i) => (
                  <div key={i}>
                    <CustomSelect
                      label={`${generateLabel(
                        i
                      )}. Who should have approval power for Level ${i + 1}`}
                      placeholder="Select..."
                      options={reviewersOption}
                      selected={selectedLevels[`${idx}-${i + 1}`] || ""}
                      setSelected={(value) => {
                        handleSelectChangeForLevel(idx, i + 1, value);
                        const updatedSelectedLevels = {
                          ...selectedLevels,
                          [`${idx}-${i + 1}`]: value,
                        };
                        // handleFormatOrderOfApproval(
                        //   chi,
                        //   convertObjectToArray(updatedSelectedLevels)
                        // );
                        setOrderValue(
                          "order_of_approvals",
                          handleFormatOrderOfApproval(
                            chi,
                            convertObjectToArray(updatedSelectedLevels)
                          )
                        );
                      }}
                      labelClass={labelClassName}
                      className="w-[226px]"
                    />
                  </div>
                ))}
                {/* {Array.from({ length: numLevels[idx] || 1 }, (_, i) => (
                  <div key={i}>
                    <CustomSelect
                      label={`${generateLabel(i)}. Who should have approval power for Level ${i + 1}`}
                      placeholder="Select..."
                      options={reviewersOption}
                      selected={selectedLevels[`${idx}-${i + 1}`] || ""}
                      setSelected={(value) => handleSelectChangeForLevel(idx, i + 1, value)}
                      labelClass={labelClassName}
                      className="w-[226px]"
                    />
                  </div>
                ))} */}
              </div>
            </>
          }
        />
      ))}
    </div>
  );
};

export default ApprovalFlowTwo;
