import * as yup from "yup";

export const missionStatementSchema = yup.object().shape({
  missionstatement: yup.string()
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

export const fiscalYearSchema = yup.object().shape({
  title: yup.string().required(),
  start_date: yup.string().required('start date is required'),
  end_date: yup.string().required('end date is required'),
})

export const missionVissionSchema = yup.object().shape({
  mission: yup.string().min(5).required('company mission is required'),
  vision: yup.string().min(5).required('company vision is required'),
})