import React, { useState } from "react";
import { FormHeader } from "../_components";
import Icon from "@/components/icon/Icon";
import CustomSelect from "@/components/custom-select";
import { Input } from "@/components/ui/input";
import { Field, FieldArray } from "formik";

import { FaCirclePlus } from "react-icons/fa6";

interface GradeLevelProps {
  formik: any;
}

const GradeLevel = ({ formik }: GradeLevelProps) => {
  const handleStaffName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newName = e.target.value;
    formik.setFieldValue(`staff_levels.${index}.name`, newName);
  };
  const totalNum = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  const handleStaffLevel = (newValue: number, index: number) => {
    formik.setFieldValue(`staff_levels.${index}.level`, newValue);
  };

  const gradeOptions = (index: number) => {
    let selected = formik.values?.staff_levels?.map((item: any) =>
      Number(item?.level)
    );
    const filteredArray = totalNum?.filter(
      (vals) => !selected?.includes(vals) || selected[index] === vals
    );
    if (index === 0) {
      return filteredArray?.map((idx) => {
        return {
          label: `Level ${idx}`,
          value: `${idx}`,
        };
      });
    } else {
      const previousSelected = selected[index - 1];
      const newfilteredArray = filteredArray.filter(
        (option) => option < previousSelected
      );
      return newfilteredArray?.map((idx) => {
        return {
          label: `Level ${idx}`,
          value: `${idx}`,
        };
      });
    }
  };

  return (
    <section className="max-w-[37.9375rem]">
      <div className="w-[32rem]">
        <FormHeader
          title="Give organization details and outline structure"
          subTitle="Give details of your organizational information and hierachial structure."
        />
      </div>
      <div>
        <h3 className="block mb-5 text-sm font-medium text-[#162238]">
          1. Staff Level
        </h3>
        <div className="space-y-5">
          <div>
            <div className="">
              <div>
                <label className="text-[#6E7C87] text-[0.8125rem]">
                  Input Level Name
                </label>
              </div>

              <FieldArray name="staff_levels">
                {({ insert, remove, push }) => (
                  <div className="w-full">
                    {formik.values.staff_levels?.length > 0 &&
                      formik.values.staff_levels.map(
                        (staff_levels: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mb-5 w-full"
                          >
                            <Input
                              type="text"
                              id=""
                              name={`staff_levels.${index}.name`}
                              value={formik.values.staff_levels[index].name}
                              onChange={(e) => handleStaffName(e, index)}
                              placeholder="Input Level Name"
                              className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              containerClass=" w-[26.5625rem]"
                            />
                            {formik.errors.staff_levels?.[index]?.name &&
                              formik.touched.staff_levels?.[index]?.name && (
                                <div className="text-red-500">
                                  {formik.errors.staff_levels[index].name}
                                </div>
                              )}

                            <CustomSelect
                              id={`staff_levels.${index}.level`}
                              options={gradeOptions(index)}
                              selected={
                                formik.values.staff_levels?.[index]?.level
                              }
                              setSelected={(val: any) => {
                                handleStaffLevel(val, index);
                              }}
                              emptyStateText="No More level"
                              className="inline-flex mt-1 w-[7.9375rem] max-w-[7.9375rem] px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
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
                              className="text-red-500 hover:text-red-700"
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
                      <FaCirclePlus width={24} height={24} />
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
