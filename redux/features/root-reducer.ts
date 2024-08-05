import { combineReducers } from "@reduxjs/toolkit";

import { authSliceReducer } from "./auth/authSlice";
import { baseApi } from "../services/baseApi";
import { missionPlanSliceReducer } from "./mission-plan/missionPlanSlice";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSliceReducer,
    mission_plan: missionPlanSliceReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;