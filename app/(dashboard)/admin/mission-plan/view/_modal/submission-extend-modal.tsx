import CustomDateInput from "@/components/custom-date-input";
import ReusableModalContainer from "@/components/reusable-modal-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateMissionPlanDetails } from "@/redux/features/mission-plan/missionPlanSlice";
import { useExtendSubmissionMutation } from "@/redux/services/mission-plan/allmissionplanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  formatDate,
  formatToReadableDate,
} from "@/utils/helpers/date-formatter";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
interface ModalContainerProps {
  show: boolean;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

interface FormValues {
  new_end_date: string;
  reason?: string;
  fiscal_year_id?: string;
}

const validationSchema = Yup.object().shape({
  new_end_date: Yup.date().required("New end date is required"),
  reason: Yup.string().required("Please add a note"),
});

export default function SubmissionExtendModal({
  show,
  handleClose,
  setSuccessModal,
}: ModalContainerProps) {
  const { active_fy_info } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const dispatch = useAppDispatch();

  const [extendSubmission, { isLoading, data: updatedData }] =
    useExtendSubmissionMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      new_end_date: "",
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
              // console.log(res, "ress");
              // console.log(updatedData, "vals", active_fy_info);
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
                value={formatToReadableDate(
                  active_fy_info?.creation_start_date
                )}
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
                value={formatToReadableDate(active_fy_info?.creation_end_date)}
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
                id="new_end_date"
                name="new_end_date"
                label="Extension Duration"
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
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-x-4">
            <div className="col-span-4">
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
            loadingText="Extend Mission Plan Submission"
            disabled={isLoading}
            loading={isLoading}
          >
            Extend Mission Plan Submission
          </Button>
        </form>
      </div>
    </ReusableModalContainer>
  );
}
