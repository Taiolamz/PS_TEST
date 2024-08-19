import { isValidDate } from "@/utils/helpers";
import { formatToReadableDate } from "@/utils/helpers/date-formatter";
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
    tasks: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        task: yup.string().required("Title is required"),
        strategic_pillars: yup
          .array()
          .of(yup.string().required("Pillar is required"))
          .min(1, "At least one strategic pillar is required")
          .required("Strategic pillar is required"),
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
            `Start date must not be before ${formatToReadableDate(startDate)}`, // Format: DD/MM/YYYY
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
            `End date must not be later than ${formatToReadableDate(endDate)}`,
            (value) => {
              if (!value) return true;
              const dateParts = value.split("/");
              const enteredDate = new Date(
                `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
              );
              return enteredDate <= endDate;
            }
          ),
      })
    ),
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
