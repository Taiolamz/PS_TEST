import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { formatDate } from "@/utils/helpers/date-formatter";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

interface ModalContainerProps {
  show: boolean;
  handleClose?: () => void;
}

interface FormValues {
  newEndDate: string;
  staffSelection: string;
  individualName?: string;
  note?: string;
}

const validationSchema = Yup.object().shape({
  newEndDate: Yup.date().required("New end date is required"),
  staffSelection: Yup.string()
    .oneOf(
      [
        "individual",
        "all-staff",
        "department",
        "unit",
        "branches",
        "subsidiary",
      ],
      "Invalid staff selection"
    )
    .required("Please select a staff option"),
  individualName: Yup.string()
    .when("staffSelection", {
      is: (val: string) => val === "individual",
      then: () => Yup.string().required("Please select a staff name"),
      otherwise: () => Yup.string().optional(),
    })
    .when("staffSelection", {
      is: (val: string) => val === "department",
      then: () => Yup.string().required("Please select a staff name"),
      otherwise: () => Yup.string().optional(),
    }),
  note: Yup.string().required("Please add a note"),
});

export default function ReopenSubmissionModal({
  show,
  handleClose,
}: ModalContainerProps) {
  //Get all staffs
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();

  const handleFormatDropdown = (items: AllStaff[]) => {
    if (items.length !== 0) {
      const data = items?.map((chi) => {
        return {
          ...chi,
          label: chi?.name,
          value: chi?.name,
        };
      });
      return [
        {
          label: "Staff Name",
          value: "",
          name: "",
          id: "",
        },
        ...data,
      ];
    } else {
      return [];
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      newEndDate: "",
      staffSelection: "",
      individualName: "",
      note: "",
    },
    validationSchema,
    onSubmit: (values) => {
      try { 
        // logic for form submission
      } catch (error) {
        console.error("Form Submission Error:", error); 
      }
    },
  });

  useEffect(() => {
    if (show) {
      formik.setErrors({});
      formik.resetForm();
    }
  }, [show]);

  return (
    <ReusableModalContainer
      show={show}
      title="Reopen Submission"
      handleClose={handleClose}
      hasCloseButton={true}
      modalClass="md:w-[32.8rem] md:max-w-[37.8rem] lg:w-[50.4rem] lg:max-w-[50.4rem]"
    >
      <div className="px-6">
        <p className="font-light text-sm">
          You are about to reopen submission and approval of mission plan for
          your employees, if your set <br /> submission and approval dates are
          not the same they will be extended by the same amount of <br /> time
          selected
        </p>
        <form onSubmit={formik?.handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-3 gap-x-4">
            <Input
              id="previousStartPeriod"
              name="previousStartPeriod"
              label="Previous Start Period"
              value="March 2022"
              labelClass="text-[#6E7C87] text-[13px] mb-1"
              placeholder="Input new end date"
              className="border p-2 bg-[#F6F8F9]"
              readOnly
              disabled
            />
            <Input
              id="previousEndPeriod"
              name="previousEndPeriod"
              label="Previous End Period"
              value="Feb 2023"
              labelClass="text-[#6E7C87] text-[13px] mb-1"
              placeholder="Input new end date"
              className="border p-2 bg-[#F6F8F9]"
              readOnly
              disabled
            />
          </div>

          <div className="grid grid-cols-3 gap-x-4">
            <div>
              <CustomDateInput
                id="newEndDate"
                name="newEndDate"
                label="New End Date"
                labelClass="text-[#6E7C87] text-[13px] mb-1"
                selected={new Date(formik.values.newEndDate)}
                handleChange={(date) => {
                  formik.setFieldValue("newEndDate", formatDate(date));
                }}
                placeholder="YYYY/MM/DD"
                className="border p-2 bg-[#F6F8F9]"
                iconClass="top-9"
                error={formik?.errors?.newEndDate ?? ""}
                touched={formik?.touched?.newEndDate}
              />
              {/* {formik?.errors?.newEndDate ? (
                <div className="text-red-500 text-xs">
                  {formik?.errors?.newEndDate}
                </div>
              ) : null} */}
            </div>
          </div>

          <div>
            <Label
              className="text-[13px] text-[#6E7C87] font-normal pb-2 cursor-pointer"
              htmlFor="staffSelection"
            >
              Select Staff
            </Label>
            <RadioGroup
              onValueChange={(e) => formik?.setFieldValue("staffSelection", e)}
              defaultValue={formik?.values?.staffSelection}
              className="flex space-y-1 mt-3 justify-between items-center w-[90%]"
              id="staffSelection"
              name="staffSelection"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="individual"
                >
                  Individual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-staff" id="all-staff" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="all-staff"
                >
                  All Staff
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="department" id="department" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="department"
                >
                  Department
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unit" id="Unit" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="Unit"
                >
                  Unit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="branches" id="Branches" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="Branches"
                >
                  Branches
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="subsidiary" id="subsidiary" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="subsidiary"
                >
                  Subsidiary
                </Label>
              </div>
            </RadioGroup>
            {formik?.touched.staffSelection && formik?.errors.staffSelection ? (
              <div className="text-red-500 text-xs">
                {formik?.errors.staffSelection}
              </div>
            ) : null}
          </div>

          {formik?.values?.staffSelection === "individual" && (
            <div className="grid grid-cols-3 gap-x-4">
              <div>
                {/* <Input
                  id="individualName"
                  name="individualName"
                  type="text"
                  value={formik?.values?.individualName}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  label="Name of Staff"
                  labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                  placeholder="Input name of staff"
                  className="border p-2 bg-[#F6F8F9]"
                  error={formik?.errors?.individualName}
                /> */}
                <CustomSelect
                  label="Name of Staff"
                  id="individualName"
                  labelClass="text-[#6E7C87] text-[13px] mb-[6px]"
                  placeholder="Input name of staff"
                  options={handleFormatDropdown(employeesData ?? [])}
                  selected={formik?.values?.individualName ?? ""}
                  setSelected={(value) => {
                    formik.setFieldValue("individualName", value);
                  }}
                  onBlur={formik?.handleBlur}
                  // isRequired
                />
                {formik?.touched?.individualName &&
                formik?.errors?.individualName ? (
                  <div className="text-red-500 text-xs">
                    {formik?.errors?.individualName}
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-x-4">
            <div className="col-span-2">
              <Label
                className=" text-[13px] text-[#6E7C87] font-normal pb-2 cursor-pointer"
                htmlFor="note"
              >
                Add Note
              </Label>
              <Textarea
                rows={3}
                id="note"
                name="note"
                placeholder="Text area label"
                className="mt-1  block col-span-2 px-3 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
                value={formik?.values?.note}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                touched={formik?.touched?.note}
                error={formik?.errors?.note}
              />
              {/* {formik.touched.note && formik.errors.note ? (
              <div className="text-red-500 text-xs">{formik.errors.note}</div>
            ) : null} */}
            </div>
          </div>

          <Button type="submit">Re-open</Button>
        </form>
      </div>
    </ReusableModalContainer>
  );
}
