import CustomDateInput from "@/components/custom-date-input";
import { CustomMultipleSelect } from "@/components/inputs/custom-multiple-select";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import { useGetAllOrganizationMissionPlanDropdownQuery } from "@/redux/services/mission-plan/allmissionplanApi";
import { useAppSelector } from "@/redux/store";
import {
  formatDate,
  formatToReadableDate,
} from "@/utils/helpers/date-formatter";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

interface ModalContainerProps {
  show: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

interface FormValues {
  newEndDate: string;
  staffSelection: string;
  multiselectInput: string[] | any[] | string;
  note?: string;
}

const validationSchema = Yup.object().shape({
  newEndDate: Yup.date().required("New end date is required"),
  staffSelection: Yup.string()
    .oneOf(
      [
        "individual",
        "all_staff",
        "department",
        "unit",
        "branches",
        "subsidiary",
      ],
      "Invalid staff selection"
    )
    .required("Please select a staff option"),
  multiselectInput: Yup.string().when("staffSelection", {
    is: (val: string) => val !== "all_staff",
    then: () =>
      Yup.array()
        .min(1, "At least 1 option must be selected")
        .required("Multiselect input is required"),
    otherwise: () => Yup.array().optional(),
  }),
  note: Yup.string().required("Please add a note"),
});

export default function ReopenSubmissionModal({
  show,
  setSuccessModal,
  handleClose,
}: ModalContainerProps) {
  //Get all staffs
  const { data: employeesData } = useGetAllEmployeesQuery();
  //Get hierarcy dropdown
  const { data: dropdownData }: any =
    useGetAllOrganizationMissionPlanDropdownQuery({});

  const handleFormatDropdown = (items: any[] | AllStaff[]) => {
    if (items.length !== 0) {
      const data = items?.map((chi) => {
        return {
          ...chi,
          label: chi?.name,
          value: chi?.id,
        };
      });
      return data;
    } else {
      return [];
    }
  };
  const handleDropdown = (val: string) => {
    let option;
    switch (val) {
      default:
        option = handleFormatDropdown([]);
        break;
      case "department":
        option = handleFormatDropdown(
          dropdownData?.organization_info?.departments
        );
        break;
      case "unit":
        option = handleFormatDropdown(dropdownData?.organization_info?.units);
        break;
      case "individual":
        option = handleFormatDropdown(employeesData ?? []);
        break;
      case "subsidiary":
        option = handleFormatDropdown(
          dropdownData?.organization_info?.subsidiaries
        );
        break;
      case "branches":
        option = handleFormatDropdown(
          dropdownData?.organization_info?.branches
        );
    }
    return option;
  };

  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const formik = useFormik<FormValues>({
    initialValues: {
      newEndDate: "",
      staffSelection: "",
      multiselectInput: [],
      note: "",
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        // logic for form submission
        // setSuccessModal(true);
        // handleClose();
        console.log(values, "vals");
      } catch (error) {
        console.error("Form Submission Error:", error);
      }
    },
  });

  const user_hierarchy = useAppSelector(
    (state) => state?.auth?.user?.organization?.hierarchy
  );

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
        <form onSubmit={formik?.handleSubmit} className="space-y-6 my-2">
          <div className="grid grid-col-2 md:grid-cols-3 gap-x-4">
            <Input
              id="previousStartPeriod"
              name="previousStartPeriod"
              label="Previous Start Period"
              value={formatToReadableDate(active_fy_info?.creation_start_date)}
              labelClass="text-[#6E7C87] text-[13px] mb-1"
              placeholder="Input new end date"
              className="border p-2 bg-[var(--input-bg)]"
              readOnly
              disabled
            />
            <Input
              id="previousEndPeriod"
              name="previousEndPeriod"
              label="Previous End Period"
              value={formatToReadableDate(active_fy_info?.creation_end_date)}
              labelClass="text-[#6E7C87] text-[13px] mb-1"
              placeholder="Input new end date"
              className="border p-2 bg-[var(--input-bg)]"
              readOnly
              disabled
            />
          </div>

          <div className="grid grid-col-2 md:grid-cols-3 gap-x-4">
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
                inputClass="bg-[var(--input-bg)]"
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
              onValueChange={async (e) => {
                await formik?.setFieldValue("staffSelection", "all_staff");
                formik?.setFieldValue("multiselectInput", []);
                formik?.setFieldValue("staffSelection", e);
              }}
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
                <RadioGroupItem value="all_staff" id="all_staff" />
                <Label
                  className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                  htmlFor="all_staff"
                >
                  All Staff
                </Label>
              </div>
              {user_hierarchy?.includes("department") && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="department" id="department" />
                  <Label
                    className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                    htmlFor="department"
                  >
                    Department
                  </Label>
                </div>
              )}
              {user_hierarchy?.includes("unit") && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unit" id="Unit" />
                  <Label
                    className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                    htmlFor="Unit"
                  >
                    Unit
                  </Label>
                </div>
              )}
              {user_hierarchy?.includes("branches") && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branches" id="Branches" />
                  <Label
                    className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                    htmlFor="Branches"
                  >
                    Branches
                  </Label>
                </div>
              )}
              {user_hierarchy?.includes("subsidiary") && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subsidiary" id="subsidiary" />
                  <Label
                    className=" text-[13px] text-[#6E7C87] font-normal cursor-pointer"
                    htmlFor="subsidiary"
                  >
                    Subsidiary
                  </Label>
                </div>
              )}
            </RadioGroup>
            {formik?.touched.staffSelection && formik?.errors.staffSelection ? (
              <div className="text-red-500 text-xs">
                {formik?.errors.staffSelection}
              </div>
            ) : null}
          </div>

          {formik?.values?.staffSelection !== "all_staff" &&
            formik?.values?.staffSelection !== "" && (
              <div className="grid grid-cols-3 gap-x-4">
                <div
                  className={`${
                    formik.values.multiselectInput.length > 1
                      ? "col-span-2"
                      : ""
                  }`}
                >
                  <CustomMultipleSelect
                    onValueChange={(values: any) => {
                      formik.setFieldValue("multiselectInput", values);
                    }}
                    randomBadgeColor
                    label={`Name of ${formik?.values?.staffSelection}`}
                    id="multiselectInput"
                    name="multiselectInput"
                    labelClass="text-[#6E7C87] text-[13px] block pb-[6px] capitalize"
                    placeholder={`Select ${formik?.values?.staffSelection}`}
                    options={handleDropdown(formik?.values?.staffSelection)}
                    badgeClassName={`rounded-[20px] text-[10px] font-normal`}
                    triggerClassName={`min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm`}
                    placeholderClass={`font-light text-sm text-[#6E7C87] opacity-70`}
                    maxCount={6}
                    onBlur={formik?.handleBlur}
                    error={formik?.errors?.multiselectInput}
                    touched={formik?.touched?.multiselectInput}
                  />
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
            </div>
          </div>

          <Button
            type="submit"
            loadingText="Re-open"
            disabled={false}
            loading={false}
          >
            Re-open
          </Button>
        </form>
      </div>
    </ReusableModalContainer>
  );
}
