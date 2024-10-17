import { combineReducers } from "@reduxjs/toolkit";

import { authSliceReducer } from "./auth/authSlice";
import { baseApi } from "../services/baseApi";
import { missionPlanSliceReducer } from "./mission-plan/missionPlanSlice";
import { missionPlanPreviewSliceReducer } from "./mission-plan/missionPlanPreviewSlice";
import { missionPlanTemplateSliceReducer } from "./mission-plan/missionPlanTemplateSlice";
import { employeeDataSliceReducer } from "./mission-plan/employeeDataSlice";
import { specifiedTaskReassignmentReducer } from "./mission-plan/specifiedTaskReassignment";
import { employeeMissionPlanReportFilterReducer } from "./mission-plan/report/employee/employeeMissionPlanReport";
import { employeeSliceReducer } from "./employee/employeeSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSliceReducer,
  mission_plan: missionPlanSliceReducer,
  mission_plan_preview: missionPlanPreviewSliceReducer,
  mission_plan_template: missionPlanTemplateSliceReducer,
  single_employee: employeeDataSliceReducer,
  specified_task_reassignment: specifiedTaskReassignmentReducer,
  employee_mission_plan_filter: employeeMissionPlanReportFilterReducer,
  employee: employeeSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
