import React from "react";
import { FormHeader } from "../_components";
import { Input } from "@/components/ui/input";
import CustomDateInput from "@/components/custom-date-input";
import CustomTimeInput from "@/components/custom-time-picker";
import { formatMonthYear } from "@/utils/helpers/date-formatter";

interface OperationsParameterProps {
  formik: any;
  fyDate: any;
  setFyDate: (item: any) => void;
  time: any;
  setTime: (item: any) => void;
}

const OperationsParameter = ({
  formik,
  setFyDate,
  fyDate,
  time,
  setTime,
}: OperationsParameterProps) => {
  const handleChange = (
    newDate: { format: (arg0: string) => any },
    name: string
  ) => {
    formik.setFieldValue(name, formatMonthYear(newDate));
    setFyDate({ ...fyDate, [name]: newDate });
  };

  const handleTimeChange = (
    newDate: { format: (arg0: string) => any },
    name: string
  ) => {
    setTime({ ...time, [name]: newDate });
    formik.setFieldValue(name, newDate.format("HH:mm"));
  };

  console.log({ Formikkk: formik.values.opening_time, fyDate, time });
  return (
    <section className="max-w-[54.625rem] px-4 scroll-hidden">
      <FormHeader
        title="Give details of your organizational information and hierarchical
        structure."
        subTitle="Give details of your organizational information and hierachial
        structure."
      />
      <div className="">
        <div className=" pb-6 border-b mb-6 gap-6">
          <h3 className="block mb-4 text-sm font-medium text-[#162238]">
            1. Fiscal Year
          </h3>
          <div className="flex gap-6">
            <div className="basis-1/2">
              <label className="block text-[#5A5B5F] text-[0.8125rem]">
                Title
              </label>
              <Input
                type="text"
                id="fy_title"
                name="fy_title"
                onChange={formik.handleChange}
                value={formik.values.fy_title}
                touched={formik.touched.fy_title}
                onBlur={formik.handleBlur}
                error={formik.errors.fy_title}
                placeholder="2022 Financial Year"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
              />
            </div>

            <div className="basis-1/4">
              <CustomDateInput
                id="start_fy"
                name="start_fy"
                label="Start Period"
                selected={fyDate.start_fy}
                handleChange={(date) => {
                  handleChange(date, "start_fy");
                }}
                touched={formik.touched.start_fy}
                error={formik.errors.start_fy}
                labelClass="mb-1"
                placeholder="MM/YYYY"
                className="relative"
                // iconClass="top-4"
                showOnlyMonth={true}
                format="MMM YYYY"
              />
            </div>
            <div className="basis-1/4">
              <CustomDateInput
                id="end_fy"
                name="end_fy"
                label="End Period"
                selected={fyDate.end_fy}
                handleChange={(date) => {
                  handleChange(date, "end_fy");
                }}
                touched={formik.touched.end_fy}
                error={formik.errors.end_fy}
                labelClass="mb-1"
                className="relative"
                placeholder="MM/YYYY"
                showOnlyMonth={true}
                format="MMM YYYY"
                // iconClass="top-4"
              />
            </div>
          </div>
        </div>
        <div className=" pb-6 border-b mb-6 gap-6 ">
          <h3 className="block mb-2 text-sm font-medium text-[#162238]">
            2. New Staff Probationary Period
          </h3>
          <p className="mb-4 text-sm text-[#6E7C87]">
            Set the default time range for staff probation
          </p>
          <div className="w-[47%]">
            <label className="block text-[#5A5B5F] text-[0.8125rem]">
              Period
            </label>
            <Input
              type="text"
              placeholder="3 Months"
              id="probation_duration"
              name="probation_duration"
              value={formik.values.probation_duration}
              onChange={formik.handleChange}
              touched={formik.touched.probation_duration}
              error={formik.errors.probation_duration}
              className="mt-1 block w-full px-3 py-2 border border-gray-300  sm:text-sm"
            />
          </div>
        </div>

        <div className=" pb-6 mb-6 gap-6 w-[47%]">
          <h3 className="block mb-4 text-sm font-medium text-[#162238]">
            3. Operating Hours
          </h3>
          <div className="flex space-x-2 mt-2">
            <div className="w-1/2">
              <CustomTimeInput
                id="opening_time"
                label="Opening Time"
                name="opening_time"
                selected={time.opening_time}
                handleChange={(date) => handleTimeChange(date, "opening_time")}
                touched={formik.touched.opening_time}
                error={formik.errors.opening_time}
                format="HH:mm"
              />
            </div>
            <div className="w-1/2">
              <CustomTimeInput
                id="closing_time"
                label="Closing Time"
                name="closing_time"
                selected={time.closing_time}
                handleChange={(date) => handleTimeChange(date, "closing_time")}
                touched={formik.touched.closing_time}
                error={formik.errors.closing_time}
                format="HH:mm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsParameter;
