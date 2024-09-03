import { isValidDate } from "@/utils/helpers";
import {
  formatToReadableDate,
  parseDate,
} from "@/utils/helpers/date-formatter";
import * as yup from "yup";

export const missionStatementSchema = yup.object().shape({
  mission: yup
    .string()
    .min(5, "mission statement must be at least 5 characters")
    .required("This field is required"),
});

export const measureSuccessSchema = yup.object().shape({
  // mission_plan_id: yup.string().required("Mission Plan ID is required"),
  // strategic_intent_id: yup.string().required("Strategic Intent ID is required"),
  measures: yup.array().of(
    yup.object().shape({
      measure: yup.string().required("Measure of success is required"),
      unit: yup.string().required("Unit is required"),
      target: yup.string().required("Target is required"),
    })
  ),
});

export const commentSchema = yup.object().shape({
  comment: yup
    .string()
    .min(2, "Can't send empty comment")
    .max(200, "Message is too long")
    .required("Type your comment"),
});

export const boundariesSchema = yup.object({
  constraints: yup.array().of(yup.string().required("Constraint is required")),
  freedoms: yup.array().of(yup.string().required("Freedom is required")),
});

export const fiscalYearSchema = yup.object().shape({
  title: yup.string().required(),
  start_date: yup.string().required("start date is required"),
  end_date: yup.string().required("end date is required"),
});

export const missionVissionSchema = yup.object().shape({
  mission: yup.string().min(5).required("company mission is required"),
  vision: yup.string().min(5).required("company vision is required"),
});

export const strategicPillarSchema = yup.object().shape({
  strategic_pillars: yup.array().of(
    yup.object().shape({
      pillar: yup.string().required("field is required"),
    })
  ),
});

export const setStrategicIntentsSchema = yup.object().shape({
  intents: yup.array().of(
    yup.object().shape({
      intent: yup.string().required("Intent is required"),
      behaviours: yup.array().of(
        yup.object().shape({
          id: yup.string(),
          value: yup.string().required("Behaviour is required"),
        })
      ),
    })
  ),
});

export const specifiedTaskSchema = (endDate: any, startDate: any) => {
  return yup.object().shape({
    tasks: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          task: yup.string().required("Title is required"),
          weight: yup
            .number()
            .typeError("Weight must be a number")
            .required("Weight is required")
            .max(100, "Weight must not be greater than 100"),
          strategic_pillars: yup
            .array()
            .of(yup.string().required("Pillar is required"))
            .min(1, "At least one strategic pillar is required")
            .required("Strategic pillar is required"),
          is_main_effort: yup.boolean(),
          success_measures: yup
            .array()
            .of(yup.string().required("Measure is required"))
            .min(1, "At least one measure is required")
            .required("Measure is required"),

          start_date: yup
            .string()
            .required("Start date is required")
            .typeError("Start date must be a valid date")
            .test(
              "is-valid-date",
              "Start date must be a valid date in DD/MM/YYYY format",
              (value) => isValidDate(value)
            )
            .test(
              "is-after-min-start-date",
              `Start date must not be before ${formatToReadableDate(
                startDate
              )}`, // Format: DD/MM/YYYY
              (value) => {
                if (!value) return true; // Skip this test if value is empty or undefined
                const dateParts = value.split("/"); // Assuming DD/MM/YYYY format
                const enteredDate = new Date(
                  `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                );
                enteredDate.setHours(0, 0, 0, 0);
                startDate.setHours(0, 0, 0, 0);
                return enteredDate.getTime() >= startDate.getTime();
              }
            )
            .test(
              "is-later-than-end-date",
              "Start date must be later than the end date",
              function (value) {
                const { end_date } = this.parent;
                if (!value || !end_date) return true;
                const startDate = parseDate(value);
                const endDate = parseDate(end_date);
                return startDate < endDate;
              }
            ),
          end_date: yup
            .string()
            .required("End date is required")
            .typeError("End date must be a valid date")
            .test(
              "is-valid-date",
              "End date must be a valid date in DD/MM/YYYY format",
              (value) => isValidDate(value)
            )
            .test(
              "is-after-end-date",
              `End date must not be later than ${formatToReadableDate(
                endDate
              )}`,
              (value) => {
                if (!value) return true;
                const dateParts = value.split("/");
                const enteredDate = new Date(
                  `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                );
                return enteredDate <= endDate;
              }
            )
            .test(
              "is-before-start-date",
              "End date must be earlier than the start date",
              function (value) {
                const { start_date } = this.parent;
                if (!value || !start_date) return true; // Skip if either date is not provided
                const endDate = parseDate(value);
                const startDate = parseDate(start_date);
                return endDate > startDate; // end date should be greater than start date
              }
            ),
        })
      )
      .test(
        "weights-sum",
        "The sum of all weights must be equal to 100",
        function (tasks) {
          const totalWeight = tasks?.reduce(
            (sum, task) => sum + (task.weight || 0),
            0
          );
          if (totalWeight) return totalWeight === 100;
        }
      )
      .test(
        "one-main-effort",
        "You must select exactly one main effort",
        function (tasks) {
          const selectedEfforts = tasks?.filter((task) => task.is_main_effort);
          if (selectedEfforts?.length !== 1) {
            return this.createError({
              path: "tasks",
              message: "Exactly one main effort must be selected",
            });
          }
          return true;
        }
      ),
  });
};

export const timelineReminderSchema = (endDate?: any, startDate?: any) => {
  return yup.object().shape({
    creation_start_date: yup.string().required('submission start period is required'),
    creation_end_date: yup.string().required('submission end period is required'),
    approval_start_date: yup.string().required('approval start period is required'),
    approval_end_date: yup.string().required('approval end period is required'),
    setup_reminder: yup.string(),
    approval_reminder: yup.string(),
    before_start_reminder: yup.string(),
  });
};

export const ApprovalItemsSchema = yup.object().shape({
  comments: yup.array().of(
    yup
      .string()
      .test(
        "comment-required",
        "Comment is required when rejecting.",
        function (value) {
          const { actionType } = this.parent;
          if (actionType === "reject" && (!value || value.trim() === "")) {
            return false;
          }
          return true;
        }
      )
  ),
});
