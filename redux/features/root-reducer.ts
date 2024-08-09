import { combineReducers } from "@reduxjs/toolkit";

import { authSliceReducer } from "./auth/authSlice";
import { baseApi } from "../services/baseApi";
import { missionPlanSliceReducer } from "./mission-plan/missionPlanSlice";
import { missionPlanPreviewSliceReducer } from "./mission-plan/missionPlanPreviewSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSliceReducer,
  mission_plan: missionPlanSliceReducer,
  mission_plan_preview: missionPlanPreviewSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
