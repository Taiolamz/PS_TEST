import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/custom-select";
import { CustomAccordion } from "@/components/custom-accordion";
import { useGetGradeLevelsQuery } from "@/redux/services/onboarding/gradeLevelApi";
import { PageLoader } from "@/components/custom-loader";
import { Form, Formik } from "formik";

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
  // setOrderValue: (field: string, value: any) => void;
  approvalsArray: {
    title: string;
    approvals: string[];
  }[];
  setNewFieldValue: (field: string, value: any) => void;
  allRoles: { name: string; value: string }[];
  // hodVal?: any;
  isLoading: boolean;
}

const ApprovalFlowTwo = ({
  options,
  approvals,
  // setOrderValue,
  approvalsArray,
  setNewFieldValue,
  // allRoles,
  // hodVal,
  isLoading,
}: Prop) => {
  const [numLevels, setNumLevels] = useState<NumLevels>({});
  const labelClassName = "block text-xs text-[#6E7C87] font-normal pb-2";

  const generateLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  useEffect(() => {
    if (approvalsArray?.length) {
      const initialNumLevels: NumLevels = {};
      approvalsArray.forEach((chi, index) => {
        initialNumLevels[index] = chi?.approvals?.length || 0;
      });

      setNumLevels((prevNumLevels) => {
        const updatedNumLevels = { ...prevNumLevels };
        approvalsArray.forEach((chi, index) => {
          if (updatedNumLevels[index] === undefined) {
            updatedNumLevels[index] = initialNumLevels[index];
          }
        });
        return updatedNumLevels;
      });
    }
  }, [approvalsArray]);

  const newOptions = options.slice(1);

  return (
    <>
      {isLoading ? (
        <div className="h-[65vh] grid place-content-center">
          <PageLoader />
        </div>
      ) : (
        <Formik
          initialValues={{
            order_of_approvals: approvalsArray.map((chi, idx) => ({
              title: chi.title,
              approvals: chi?.approvals,
            })),
            head_of_organization: "",
          }}
          onSubmit={() => {}}
        >
          {({ values, setFieldValue }) => {
            // console.log(values, "values");
            const handleNumLevelsChange = (
              index: number,
              numLevelsValue: number
            ) => {
              setNumLevels((prev) => {
                const updatedNumLevels = {
                  ...prev,
                  [index]: numLevelsValue,
                };

                const newApprovals =
                  values.order_of_approvals[index]?.approvals?.slice(
                    0,
                    numLevelsValue
                  ) || [];

                for (let i = newApprovals.length; i < numLevelsValue; i++) {
                  newApprovals.push("");
                }

                setFieldValue(
                  `order_of_approvals[${index}].approvals`,
                  newApprovals
                );
                setNewFieldValue(
                  `order_of_approvals[${index}].approvals`,
                  newApprovals
                );

                return updatedNumLevels;
              });
            };
            return (
              <Form>
                <div className="flex flex-col gap-5">
                  {approvalsArray?.length > 0 ? (
                    <>
                      {approvalsArray?.map((chi, idx) => (
                        <CustomAccordion
                          type="multiple"
                          defaultValue={["item-1"]}
                          key={idx}
                          className="mb-4 p-5 border border-custom-divider rounded flex flex-col gap-1"
                          title={
                            <p className="font-medium text-sm mb-2">
                              {idx + 1}. How many levels of approval should be
                              for{" "}
                              <span className="text-primary capitalize">
                                {chi.title}
                              </span>{" "}
                              ?{/* before the final approval? */}
                            </p>
                          }
                          content={
                            <>
                              <CustomSelect
                                placeholder="Select..."
                                options={
                                  chi?.title === "organization head"
                                    ? options
                                    : newOptions
                                }
                                selected={numLevels[idx]?.toString() || ""}
                                setSelected={(value) => {
                                  handleNumLevelsChange(idx, Number(value));
                                  setFieldValue(
                                    `order_of_approvals[${idx}].approvals[${idx}]`,
                                    ""
                                  );
                                  setNewFieldValue(
                                    `order_of_approvals[${idx}].approvals[${idx}]`,
                                    ""
                                  );
                                }}
                                className="w-[150px]"
                              />
                              <div className="flex flex-col">
                                {numLevels[idx] > 0 && (
                                  <div className="flex flex-col gap-10 mt-10">
                                    {Array.from(
                                      { length: numLevels[idx] },
                                      (_, i) => (
                                        <div key={i}>
                                          {i + 1 < numLevels[idx] && (
                                            <CustomSelect
                                              label={`${generateLabel(i)}${
                                                i === 0
                                                  ? ". Who should be the first approval"
                                                  : ". Who should be the next approval"
                                              }
                                              `}
                                              // label={`${generateLabel(
                                              //   i
                                              // )}. Who should have approval power for Level ${
                                              //   i + 1
                                              // }`}
                                              placeholder="Select..."
                                              options={approvals.map((chi) => ({
                                                label: chi?.name,
                                                value: chi?.name,
                                              }))}
                                              selected={
                                                values.order_of_approvals[idx]
                                                  ?.approvals[i] || ""
                                              }
                                              setSelected={(value) => {
                                                setFieldValue(
                                                  `order_of_approvals[${idx}].approvals[${i}]`,
                                                  value
                                                );
                                                setNewFieldValue(
                                                  `order_of_approvals[${idx}].approvals[${i}]`,
                                                  value
                                                );
                                              }}
                                              labelClass={labelClassName}
                                              className="w-[226px]"
                                            />
                                          )}
                                        </div>
                                      )
                                    )}

                                    <CustomSelect
                                      label={`${generateLabel(
                                        numLevels[idx] - 1
                                      )}. Who has the final approval power`}
                                      placeholder="Select..."
                                      options={approvals.map((chi) => ({
                                        label: chi?.name,
                                        value: chi?.name,
                                      }))}
                                      selected={
                                        values.order_of_approvals[idx]
                                          ?.approvals[numLevels[idx] - 1] || ""
                                      }
                                      setSelected={(value) => {
                                        setFieldValue(
                                          `order_of_approvals[${idx}].approvals[${
                                            numLevels[idx] - 1
                                          }]`,
                                          value
                                        );
                                        setNewFieldValue(
                                          `order_of_approvals[${idx}].approvals[${
                                            numLevels[idx] - 1
                                          }]`,
                                          value
                                        );
                                      }}
                                      labelClass={labelClassName}
                                      className="w-[226px]"
                                      mainClass="!-mt-10"
                                    />
                                  </div>
                                )}
                              </div>
                            </>
                          }
                        />
                      ))}

                      {/* <CustomAccordion
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
                            selected={values.head_of_organization}
                            setSelected={(e) => {
                              setFieldValue("head_of_organization", e);
                            }}
                            labelClass={labelClassName}
                            className="w-[226px]"
                          />
                        }
                      /> */}
                    </>
                  ) : (
                    <p className="font-medium text-lg">No Approval Flow</p>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default ApprovalFlowTwo;
