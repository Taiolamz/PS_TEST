import { combineReducers } from "@reduxjs/toolkit";

import { authSliceReducer } from "./auth/authSlice";
import { baseApi } from "../services/baseApi";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSliceReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;