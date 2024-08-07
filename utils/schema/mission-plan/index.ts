import { isValidDate } from "@/utils/helpers";
import * as yup from "yup";

export const missionStatementSchema = yup.object().shape({
  missionstatement: yup
    .string()
    .min(5, "This field is required")
    .required("This field is required"),
});

export const measureSuccessSchema = yup.object().shape({
  // mission_plan_id: yup.string().required("Mission Plan ID is required"),
  // strategic_intent_id: yup.string().required("Strategic Intent ID is required"),
  allSuccess: yup.array().of(
    yup.object().shape({
      success: yup.string().required("Measure of success is required"),
      unit: yup.string().required("Unit is required"),
      target: yup.string().required("Target is required"),
    })
  ),
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

export const specifiedTaskSchema = yup.object().shape({
  tasks: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      title: yup.string().required("Title is required"),
      pillars: yup
        .array()
        .of(
          yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
            color: yup.string().required(),
          })
        )
        .min(1, "At least one pillar is required"),
      measures: yup
        .array()
        .of(
          yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required(),
            color: yup.string().required(),
          })
        )
        .min(1, "At least one measure is required"),

      start_date: yup
        .string()
        .required("Start date is required")
        .typeError("Start date must be a valid date")
        .test(
          "is-valid-date",
          "Start date must be a valid date in DD/MM/YYYY format",
          (value) => isValidDate(value)
        ),
      end_date: yup
        .string()
        .required("End date is required")
        .typeError("End date must be a valid date")
        .test(
          "is-valid-date",
          "End date must be a valid date in DD/MM/YYYY format",
          (value) => isValidDate(value)
        ),
    })
  ),
});
