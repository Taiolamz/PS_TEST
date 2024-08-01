<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 41ff531 (updates)
import { FormHeader } from "../_components";
import Icon from "@/components/icon/Icon";
import CustomSelect from "@/components/custom-select";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { Field, FieldArray } from "formik";
=======
>>>>>>> 41ff531 (updates)

interface GradeLevelProps {
  formik: any;
}

const GradeLevel = ({ formik }: GradeLevelProps) => {
<<<<<<< HEAD
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
    formik.setFieldValue(`staff_levels.${index}.level`, newValue);
  };

=======
>>>>>>> 41ff531 (updates)
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
<<<<<<< HEAD

              <FieldArray name="staff_levels">
                {({ insert, remove, push }) => (
                  <div>
                    {formik.values.staff_levels?.length > 0 &&
                      formik.values.staff_levels.map(
                        (staff_levels: any, index: number) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 items-center space-x-2 w-[37.9375rem] mb-5 relative mt-4"
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
                              name={`staff_levels.${index}.level`}
                              component={CustomSelect}
                              options={Array.from({ length: 10 }, (_, idx) => {
                                return {
                                  label: `Level ${idx + 1}`,
                                  value: `Level ${idx + 1}`,
                                };
                              })}
                              placeholder={"Select Level"}
                              selected={
                                formik.values.staff_levels?.[index]?.level
                              }
                              setSelected={(value: any) => {
                                handleStaffLevel(value, index);
                                setEmployeePosition(value);
                              }}
                              className="mr-2"
                              value={formik.values.staff_levels?.[index]?.level}
                            />

                            {formik.errors.staff_levels?.[index]?.level &&
                              formik.touched.staff_levels?.[index]?.level && (
                                <div className="text-red-500">
                                  {formik.errors.staff_levels[index].level}
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
                      onClick={() => push({ name: "", level: "" })}
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
=======
              <div className="grid grid-cols-2 items-center space-x-2 w-[37.9375rem] mb-5 relative">
                <Input
                  type="text"
                  id=""
                  name=""
                  value=""
                  onChange={() => null}
                  placeholder="Input Staff Level"
                  className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                <CustomSelect
                  options={Array.from({ length: 10 }, (_, idx) => {
                    return {
                      label: `Level ${idx + 1}`,
                      value: `Level ${idx + 1}`,
                    };
                  })}
                  selected=""
                  setSelected={() => null}
                />
                <button
                  type="button"
                  onClick={() => null}
                  className="text-red-500 hover:text-red-700 absolute -right-6"
                >
                  <Icon name="remove" width={14.28} height={18.63} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => null}
          className="flex items-center gap-2 mt-5 text-primary"
        >
          <Icon name="add" width={24} height={24} />
          Add more level
        </button>
>>>>>>> 41ff531 (updates)
      </div>
    </section>
  );
};

export default GradeLevel;
