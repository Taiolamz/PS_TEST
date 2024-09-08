/* eslint-disable react-hooks/exhaustive-deps */
import { Dictionary } from "@/@types/dictionary";
import CustomDateInput from "@/components/custom-date-input";
import CustomSelect from "@/components/custom-select";
import { Button } from "@/components/ui/button";
import {
  updateFinancialYearDetails,
  updateMissionPlanDetails,
} from "@/redux/features/mission-plan/missionPlanSlice";
import {
  useCreateFinancialYearMutation,
  useUpdateFiscalYearMutation,
} from "@/redux/services/mission-plan/missionPlanApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeCharFromString } from "@/utils/helpers";
import { formatDate } from "@/utils/helpers/date-formatter";
import routesPath from "@/utils/routes";
import {
  fiscalYearSchema,
  timelineReminderSchema,
} from "@/utils/schema/mission-plan";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const { ADMIN } = routesPath;

const TimelineAndReminderUpdate = () => {
  const [updateFiscalYear, { isLoading }] = useUpdateFiscalYearMutation();

  const { active_fy_info: timeline_reminder } = useAppSelector(
    (state) => state?.mission_plan?.mission_plan
  );
  const FYID = timeline_reminder?.id;

  const location = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values: Dictionary) => {
    const DATE_DIFFERENCE =
      Number(removeCharFromString(values.creation_end_date, "-")) -
      Number(removeCharFromString(values.creation_start_date, "-"));
    if (DATE_DIFFERENCE <= 0) {
      toast.info("Submission end date must be a future date");
      return;
    }
    const obj = {
      ...values,
      review_period: timeline_reminder?.review_period,
    };
    updateFiscalYear(obj)
      .unwrap()
      .then((payload: Dictionary) => {
        dispatch(
          updateMissionPlanDetails({
            slug: "active_fy_info",
            data: payload?.data?.organization_mission_plan,
          })
        );
        toast.success("Timeline And Reminder Updated Successfully");
        // router.push(`${ADMIN.KICK_START_MISSION_PLAN}?ui=approval-flow`);
        router.push(`${ADMIN.SINGLE_MISSION_PLAN}?id=${FYID}`);
      });
  };

  const formik = useFormik({
    initialValues: {
      creation_start_date:
        (timeline_reminder?.creation_start_date as string) || "",
      creation_end_date: (timeline_reminder?.creation_end_date as string) || "",
      approval_start_date:
        (timeline_reminder?.approval_start_date as string) || "",
      approval_end_date: (timeline_reminder?.approval_end_date as string) || "",
      setup_reminder: (timeline_reminder?.setup_reminder as string) || "",
      approval_reminder: (timeline_reminder?.approval_reminder as string) || "",
      before_start_reminder:
        (timeline_reminder?.before_start_reminder as string) || "",
      id: FYID,
    },
    validationSchema: timelineReminderSchema(),
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  //   useEffect(() => {
  //     dispatch(
  //       updateFinancialYearDetails({
  //         slug: "timeline_reminder",
  //         data: formik.values,
  //       })
  //     );
  //   }, [formik.values]);

  return (
    <div className="w-full">
      <h1>Set Mission Plan Submission Duration</h1>
      <form className="mt-2" onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="">
          <div className="w-full flex gap-4 items-center">
            <CustomDateInput
              label="Start Period"
              id="creation_start_date"
              selected={new Date(formik.values.creation_start_date)}
              handleChange={(selected) => {
                formik.setFieldValue(
                  "creation_start_date",
                  formatDate(selected)
                );
              }}
              touched={formik.touched.creation_start_date}
              error={formik.errors.creation_start_date as string}
              placeholder="YYYY-MM-DD"
              isRequired
              iconClass="top-10"
            />
            <CustomDateInput
              label="End Period"
              id="creation_end_date"
              selected={new Date(formik.values.creation_end_date)}
              handleChange={(selected) => {
                formik.setFieldValue("creation_end_date", formatDate(selected));
              }}
              touched={formik.touched.creation_end_date}
              error={formik.errors.creation_end_date as string}
              placeholder="YYYY-MM-DD"
              isRequired
              iconClass="top-10"
            />
          </div>
        </div>
        <div className="mt-8">
          <h1>Set Mission Plan Approval Duration</h1>
          <div className="mt-2 w-ful flex gap-4 items-center">
            <CustomDateInput
              label="Start Period"
              id="approval_start_date"
              selected={new Date(formik.values.approval_start_date)}
              handleChange={(selected) => {
                formik.setFieldValue(
                  "approval_start_date",
                  formatDate(selected)
                );
              }}
              touched={formik.touched.approval_start_date}
              error={formik.errors.approval_start_date as string}
              placeholder="YYYY-MM-DD"
              isRequired
              iconClass="top-10"
            />
            <CustomDateInput
              label="End Period"
              id="approval_end_date"
              selected={new Date(formik.values.approval_end_date)}
              handleChange={(selected) => {
                formik.setFieldValue("approval_end_date", formatDate(selected));
              }}
              touched={formik.touched.approval_end_date}
              error={formik.errors.approval_end_date as string}
              placeholder="YYYY-MM-DD"
              isRequired
              iconClass="top-10"
            />
          </div>
        </div>
        <div className="mt-8 lg:w-[80%]">
          <h1>Employee Reminder Interval</h1>
          <div className="mt-2 grid grid-cols-3 gap-4 items-center">
            <CustomSelect
              label="Before FY Start Reminder"
              id="before_start_reminder"
              options={[
                { label: "Every week before start", value: "weekly" },
                { label: "Every 2 weeks before start", value: "two-weeks" },
                { label: "Only at start", value: "start" },
              ]}
              selected={formik.values.before_start_reminder}
              setSelected={(selected) =>
                formik.setFieldValue("before_start_reminder", selected)
              }
            />
            <CustomSelect
              label="Mission Plan Setup Reminder"
              id="setup_reminder"
              options={[
                { label: "Every week", value: "weekly" },
                { label: "Every 2 weeks", value: "two-weeks" },
                { label: "Only at start", value: "start" },
              ]}
              selected={formik.values.setup_reminder}
              setSelected={(selected) =>
                formik.setFieldValue("setup_reminder", selected)
              }
            />
            <CustomSelect
              label="Mission Plan Approval Reminder"
              id="approval_reminder"
              options={[
                { label: "Every week", value: "weekly" },
                { label: "Every 2 weeks", value: "two-weeks" },
                { label: "Only at start", value: "start" },
              ]}
              selected={formik.values.approval_reminder}
              setSelected={(selected) =>
                formik.setFieldValue("approval_reminder", selected)
              }
            />
          </div>
        </div>
        <div className="mt-5">
          <Button
            disabled={
              !formik.values.creation_start_date ||
              !formik.values.creation_end_date ||
              !formik.values.approval_start_date ||
              !formik.values.approval_end_date ||
              isLoading
            }
            // className=''
            type="submit"
            loading={isLoading}
            loadingText="Save Changes"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TimelineAndReminderUpdate;
