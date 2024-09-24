/* eslint-disable react-hooks/exhaustive-deps */
import CustomDateInput from "@/components/custom-date-input";
import { CustomMultipleSelect } from "@/components/inputs/custom-multiple-select";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useGetAllEmployeesQuery } from "@/redux/services/employee/employeeApi";
import {
  useExtendSubmissionMutation,
  useGetAllOrganizationMissionPlanDropdownQuery,
} from "@/redux/services/mission-plan/allmissionplanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
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
  new_end_date: string;
  staff_selection: string;
  fiscal_year_id?: string;
  staff_members: string[] | any[] | string;
  reason?: string;
}

const validationSchema = Yup.object().shape({
  new_end_date: Yup.date().required("New end date is required"),
  staff_selection: Yup.string()
    .oneOf(
      ["individual", "all_staff", "department", "unit", "branch", "subsidiary"],
      "Invalid staff selection"
    )
    .required("Please select a staff option"),
  staff_members: Yup.string().when("staff_selection", {
    is: (val: string) => val !== "all_staff",
    then: () =>
      Yup.array()
        .min(1, "At least 1 option must be selected")
        .required("Multiselect input is required"),
    otherwise: () => Yup.array().optional(),
  }),
  reason: Yup.string().required("Please add a reason"),
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

  // Dropdown content for multiselect
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
      case "branch":
        option = handleFormatDropdown(
          dropdownData?.organization_info?.branches
        );
    }
    return option;
  };

  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const dispatch = useAppDispatch();

  const [extendSubmission, { isLoading, data: updatedData }] =
    useExtendSubmissionMutation();
  const formik = useFormik<FormValues>({
    initialValues: {
      new_end_date: "",
      staff_selection: "",
      staff_members: [],
      reason: "",
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      try {
        // logic for form submission
        values["fiscal_year_id"] = active_fy_info?.id;
        extendSubmission(values)
          .unwrap()
          .then(
            (res) => {
              dispatch(
                updateMissionPlanDetails({
                  slug: "active_fy_info",
                  data: res?.data.organization_mission_plan,
                })
              );
              setSuccessModal(true);
              formik.setErrors({});
              formik.resetForm();
              handleClose();
            },
            (error) => {
              console.log(error, "unknown error");
            }
          );
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
                id="new_end_date"
                name="new_end_date"
                label="New End Date"
                labelClass="text-[#6E7C87] text-[13px] mb-1"
                selected={new Date(formik.values.new_end_date)}
                handleChange={(date) => {
                  formik.setFieldValue("new_end_date", formatDate(date));
                }}
                placeholder="YYYY/MM/DD"
                inputClass="bg-[var(--input-bg)]"
                className="border p-2 bg-[#F6F8F9]"
                iconClass="top-9"
                error={formik?.errors?.new_end_date ?? ""}
                touched={formik?.touched?.new_end_date}
                portal={false}
              />
              {/* {formik?.errors?.new_end_date ? (
                <div className="text-red-500 text-xs">
                  {formik?.errors?.new_end_date}
                </div>
              ) : null} */}
            </div>
          </div>

          {/* Select Staff */}
          <div>
            <Label
              className="text-[13px] text-[#6E7C87] font-normal pb-2 cursor-pointer"
              htmlFor="staff_selection"
            >
              Select Staff
            </Label>
            <RadioGroup
              onValueChange={async (e) => {
                await formik?.setFieldValue("staff_selection", "all_staff");
                formik?.setFieldValue("staff_members", []);
                formik?.setFieldValue("staff_selection", e);
              }}
              defaultValue={formik?.values?.staff_selection}
              className="flex space-y-1 mt-3 justify-between items-center w-[90%]"
              id="staff_selection"
              name="staff_selection"
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
              {user_hierarchy?.includes("branch") && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="branch" id="Branches" />
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
            {formik?.touched.staff_selection &&
            formik?.errors.staff_selection ? (
              <div className="text-red-500 text-xs">
                {formik?.errors.staff_selection}
              </div>
            ) : null}
          </div>

          {formik?.values?.staff_selection !== "all_staff" &&
            formik?.values?.staff_selection !== "" && (
              <div className="grid grid-cols-3 gap-x-4">
                <div
                  className={`${
                    formik.values.staff_members.length > 1 ? "col-span-2" : ""
                  }`}
                >
                  <CustomMultipleSelect
                    onValueChange={(values: any) => {
                      formik.setFieldValue("staff_members", values);
                    }}
                    // randomBadgeColor
                    label={`Name of ${formik?.values?.staff_selection}`}
                    id="staff_members"
                    name="staff_members"
                    labelClass="text-[#6E7C87] text-[13px] block pb-[6px] capitalize"
                    placeholder={`Select ${formik?.values?.staff_selection}`}
                    options={handleDropdown(formik?.values?.staff_selection)}
                    badgeClassName={`rounded-[20px] text-[10px] font-normal`}
                    triggerClassName={`min-h-[37px] rounded-[6px] border bg-transparent text-sm bg-[#ffffff] border-gray-300 shadow-sm`}
                    placeholderClass={`font-light text-sm text-[#6E7C87] opacity-70`}
                    maxCount={6}
                    onBlur={formik?.handleBlur}
                    error={formik?.errors?.staff_members}
                    touched={formik?.touched?.staff_members}
                  />
                </div>
              </div>
            )}

          <div className="grid grid-cols-3 gap-x-4">
            <div className="col-span-2">
              <Label
                className=" text-[13px] text-[#6E7C87] font-normal pb-2 cursor-pointer"
                htmlFor="reason"
              >
                Add Note
              </Label>
              <Textarea
                rows={3}
                id="reason"
                name="reason"
                placeholder="Text area label"
                className="mt-1  block col-span-2 px-3 py-2 border outline-none border-gray-300 bg-[var(--input-bg)] rounded-md shadow-sm sm:text-sm"
                value={formik?.values?.reason}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                touched={formik?.touched?.reason}
                error={formik?.errors?.reason}
              />
            </div>
          </div>

          <Button
            type="submit"
            loadingText="Re-open"
            disabled={isLoading}
            loading={isLoading}
          >
            Re-open
          </Button>
        </form>
      </div>
    </ReusableModalContainer>
  );
}
