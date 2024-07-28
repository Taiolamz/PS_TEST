import React from "react";
import { FormHeader } from "../_components";
import Icon from "@/components/icon/Icon";
import CustomSelect from "@/components/custom-select";
import { Input } from "@/components/ui/input";

interface GradeLevelProps {
  formik: any;
}

const GradeLevel = ({ formik }: GradeLevelProps) => {
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
      </div>
    </section>
  );
};

export default GradeLevel;
