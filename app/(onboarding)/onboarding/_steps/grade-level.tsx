import React, { useState } from "react";
import { FormHeader } from "../_components";
import Icon from "@/components/icon/Icon";
import CustomSelect from "@/components/custom-select";
import { Input } from "@/components/ui/input";
import { Field, FieldArray } from "formik";

interface GradeLevelProps {
  formik: any;
}

const GradeLevel = ({ formik }: GradeLevelProps) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");

  const handleStaffName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newName = e.target.value;
    setEmployeeName(newName);
    formik.setFieldValue(`staff_levels.${index}.name`, newName);
  };

  const handleStaffLevel = (newValue: string, index: number) => {
    formik.setFieldValue(`staff_levels.${index}.position`, newValue);
  };
  return (
    <section className="max-w-[54.625rem]">
      <FormHeader
        title="Setup Default Organization Operating Parameters"
        subTitle="Set organization operating guidelines"
      />
      <div>
        <h3 className="block mb-5 text-sm font-medium text-[#162238]">
          1. Staff Level
        </h3>
        <div className="space-y-5">
          <div>
            <div className="">
              <div>
                <label className="text-[#6E7C87] text-[0.8125rem]">
                  Input Staff Level
                </label>
              </div>

              <FieldArray name="staff_levels">
                {({ insert, remove, push }) => (
                  <div>
                    {formik.values.staff_levels?.length > 0 &&
                      formik.values.staff_levels.map(
                        (staff_levels: any, index: number) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 items-center space-x-2 w-[37.9375rem] mb-5 relative"
                          >
                            <Input
                              type="text"
                              id=""
                              name={`staff_levels.${index}.name`}
                              value={formik.values.staff_levels.name}
                              onChange={(e) => handleStaffName(e, index)}
                              placeholder="Input Staff Name"
                              className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                            {formik.errors.staff_levels?.[index]?.name &&
                              formik.touched.staff_levels?.[index]?.name && (
                                <div className="text-red-500">
                                  {formik.errors.staff_levels[index].name}
                                </div>
                              )}

                            <Field
                              name={`staff_levels.${index}.position`}
                              component={CustomSelect}
                              options={Array.from({ length: 10 }, (_, idx) => {
                                return {
                                  label: `Level ${idx + 1}`,
                                  value: `Level ${idx + 1}`,
                                };
                              })}
                              selected={
                                formik.values.staff_levels?.[index]?.position
                              }
                              setSelected={(value: any) => {
                                handleStaffLevel(value, index);
                                setEmployeePosition(value);
                              }}
                              className="mr-2"
                              value={
                                formik.values.staff_levels?.[index]?.position
                              }
                            />

                            {formik.errors.staff_levels?.[index]?.position &&
                              formik.touched.staff_levels?.[index]
                                ?.position && (
                                <div className="text-red-500">
                                  {formik.errors.staff_levels[index].position}
                                </div>
                              )}

                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 absolute -right-6"
                            >
                              <Icon
                                name="remove"
                                width={14.28}
                                height={18.63}
                              />
                            </button>
                          </div>
                        )
                      )}

                    <button
                      type="button"
                      onClick={() => push({ name: "", position: "" })}
                      className="flex items-center gap-2 mt-5 text-primary"
                    >
                      <Icon name="add" width={24} height={24} />
                      Add more level
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GradeLevel;