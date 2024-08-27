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
import { formatDate } from "@/utils/helpers/date-formatter";
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
  note?: string;
}

const validationSchema = Yup.object().shape({
  newEndDate: Yup.date().required("New end date is required"),
  note: Yup.string().required("Please add a note"),
});

export default function SubmissionExtendModal({
  show,
  handleClose,
  setSuccessModal,
}: ModalContainerProps) { 
  //Get all staffs
  const { data: employeesData, isLoading: isLoadingEmployees } =
    useGetAllEmployeesQuery();
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

  const formik = useFormik<FormValues>({
    initialValues: {
      newEndDate: "",
      note: "",
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        // logic for form submission
          setSuccessModal(true);
          handleClose();
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
      handleClose={handleClose}
      hasCloseButton={true}
      title="Submission Extension"
      modalClass="md:w-[28.8rem] md:max-w-[30.8rem] lg:w-[39.5rem]"
    >
      <div className="px-6">
        <form onSubmit={formik?.handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-5 gap-x-4">
            <div className="col-span-2">
              <Input
                id="previousStartPeriod"
                name="previousStartPeriod"
                label="Previous Start Period"
                value="March 2022"
                labelClass="text-[#6E7C87] text-[13px] mb-1"
                placeholder="Input new end date"
                className="border p-2 bg-[var(--input-bg)]"
                readOnly
                disabled
              />
            </div>
            <div className="col-span-2">
              <Input
                id="previousEndPeriod"
                name="previousEndPeriod"
                label="Previous End Period"
                value="Feb 2023"
                labelClass="text-[#6E7C87] text-[13px] mb-1"
                placeholder="Input new end date"
                className="border p-2 bg-[var(--input-bg)]"
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-x-4">
            <div className="col-span-2">
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

          <div className="grid grid-cols-5 gap-x-4">
            <div className="col-span-4">
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

          <Button type="submit">Extend Mission Plan Submission</Button>
        </form>
      </div>
    </ReusableModalContainer>
  );
}
