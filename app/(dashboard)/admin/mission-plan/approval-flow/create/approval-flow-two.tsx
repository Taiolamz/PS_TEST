import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/custom-select";
import { CustomAccordion } from "@/components/custom-accordion";
import { useGetGradeLevelsQuery } from "@/redux/services/onboarding/gradeLevelApi";
import { PageLoader } from "@/components/custom-loader";

interface Option {
  label: string | number;
  value: string | number;
}

interface Dropdown {
  name: string;
  value: string;
}

interface SelectedLevels {
  [key: string]: string;
}

interface NumLevels {
  [key: number]: number;
}

interface Prop {
  options: Option[];
  approvals: Dropdown[];
  setOrderValue: (field: string, value: any) => void;
  approvalsArray: {
    title: string;
    approvals: string[];
  }[];
  setFieldValue: (field: string, value: any) => void;
  allRoles: { name: string; value: string }[];
}

const ApprovalFlowTwo = ({
  options,
  approvals,
  setOrderValue,
  approvalsArray,
  setFieldValue,
  allRoles,
}: Prop) => {
  const [selectedLevels, setSelectedLevels] = useState<SelectedLevels>({});
  const [numLevels, setNumLevels] = useState<NumLevels>({});
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";

  const handleSelectChangeForLevel = (
    index: number,
    level: number,
    value: string
  ) => {
    setSelectedLevels((prevSelectedLevels) => {
      const updatedSelectedLevels = {
        ...prevSelectedLevels,
        [`${index}-${level}`]: value,
      };

      const updatedApprovals = convertObjectToArray(
        updatedSelectedLevels,
        index
      );

      setFieldValue(`order_of_approvals[${index}].approvals`, updatedApprovals);

      return updatedSelectedLevels;
    });
  };

  const handleNumLevelsChange = (index: number, value: number) => {
    setNumLevels((prevNumLevels) => {
      const updatedNumLevels = {
        ...prevNumLevels,
        [index]: value,
      };

      const updatedApprovals = convertObjectToArray(selectedLevels, index);
      setFieldValue(`order_of_approvals[${index}].approvals`, updatedApprovals);

      return updatedNumLevels;
    });
  };

  const generateLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  const convertObjectToArray = (obj: SelectedLevels, idx: number): string[] => {
    return Object.entries(obj)
      .filter(([key]) => key.startsWith(`${idx}-`))
      .map(([, value]) => value);
  };

  const { data: gradeLevelData, isLoading: isLoadingGradeLevel } =
    useGetGradeLevelsQuery({});
  const gradeLevels = gradeLevelData ?? [];

  const mappedData = (items: any[]) => {
    return items.map((item) => ({
      title: item.name,
      approvals: [],
    }));
  };

  const handleSelectChangeForHeadOfOrganization = (value: string) => {
    setSelectedLevels((prevSelectedLevels) => {
      const updatedSelectedLevels = {
        ...prevSelectedLevels,
        "head-of-organization": value,
      };
      setFieldValue(`order_of_approvals.head_of_organization`, value);

      return updatedSelectedLevels;
    });
  };

  useEffect(() => {
    if (gradeLevels.length > 0) {
      const newMappedData = mappedData(gradeLevels);
      setFieldValue("order_of_approvals", newMappedData);
    }
  }, [gradeLevels]);

  return (
    <div className="flex flex-col gap-5">
      {isLoadingGradeLevel ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <PageLoader />
        </div>
      ) : gradeLevels?.length > 0 ? (
        <>
          {approvalsArray.map((chi, idx) => (
            <CustomAccordion
              key={idx}
              className="mb-4 p-5 border border-custom-divider rounded flex flex-col gap-1"
              title={
                <p className="font-medium text-sm mb-2">
                  {idx + 1}. How many levels of approval should be for{" "}
                  <span className="text-primary capitalize">{chi.title}</span>{" "}
                  before the final approval?
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
                  <div className="flex flex-col gap-10 mt-6">
                    {numLevels[idx] > 0 && (
                      <>
                        {Array.from({ length: numLevels[idx] }, (_, i) => (
                          <div key={i}>
                            <CustomSelect
                              label={`${generateLabel(
                                i
                              )}. Who should have approval power for Level ${
                                i + 1
                              }`}
                              placeholder="Select..."
                              options={approvals.map((chi) => ({
                                ...chi,
                                label: chi?.name,
                                value: chi?.name,
                              }))}
                              selected={selectedLevels[`${idx}-${i + 1}`] || ""}
                              setSelected={(value) =>
                                handleSelectChangeForLevel(idx, i + 1, value)
                              }
                              labelClass={labelClassName}
                              className="w-[226px]"
                            />
                          </div>
                        ))}
                        <div>
                          <CustomSelect
                            label={`${generateLabel(
                              numLevels[idx]
                            )}. Who has the final approval flow`}
                            placeholder="Select..."
                            options={approvals.map((chi) => ({
                              ...chi,
                              label: chi?.name,
                              value: chi?.name,
                            }))}
                            selected={
                              selectedLevels[`${idx}-${numLevels[idx] + 1}`] ||
                              ""
                            }
                            setSelected={(value) =>
                              handleSelectChangeForLevel(
                                idx,
                                numLevels[idx] + 1,
                                value
                              )
                            }
                            labelClass={labelClassName}
                            className="w-[226px]"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              }
            />
          ))}

          <CustomAccordion
            key={"head-of-organization-mission-plan"}
            className="mb-4 p-5 border border-custom-divider rounded flex flex-col gap-1"
            title={
              <p className="font-medium text-sm mb-2">
                {approvalsArray.length + 1}. Who reviews{" "}
                <span className="text-primary capitalize">
                  Head of Organization
                </span>{" "}
                mission plan?
              </p>
            }
            content={
              <CustomSelect
                placeholder="Select..."
                options={allRoles.map((chi) => ({
                  ...chi,
                  label: chi?.name,
                  value: chi?.name,
                }))}
                selected={selectedLevels["head-of-organization"] || ""}
                setSelected={handleSelectChangeForHeadOfOrganization}
                labelClass={labelClassName}
                className="w-[226px]"
              />
            }
          />
        </>
      ) : (
        <p className="font-medium text-lg">No Approval Flow</p>
      )}
    </div>
  );
};

export default ApprovalFlowTwo;
