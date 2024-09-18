import { Dictionary } from "@/@types/dictionary";
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Dictionary = {
  fy_info: {
    financial_year: {
      title: "",
      start_date: "",
      end_date: "",
      review_period: "",
    },
    mission_vision: {
      mission: "",
      vision: "",
    },
    strategic_pillars: {
      strategic_pillars: [
        {
          pillar: "",
        },
      ],
    },
    timeline_reminder: {
      creation_start_date: "",
      creation_end_date: "",
      approval_start_date: "",
      approval_end_date: "",
      setup_reminder: "",
      approval_reminder: "",
      before_start_reminder: "",
    },
    order_of_approvals: [],
  },
  mission_plan: {
    active_fy_info: null,
    mission_plan: null,
  },
};

const missionPlanSlice = createSlice({
  name: "mission_plan",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    updateFinancialYearDetails: (
      state,
      action: PayloadAction<{ slug: string; data: any }>
    ) => {
      const { slug, data } = action.payload;
      state.fy_info[slug] = data;
    },
    resetFinancialYearDetails: (state) => {
      Object.assign(state.fy_info, initialState.fy_info);
    },
    updateMissionPlanDetails: (
      state,
      action: PayloadAction<{ slug: string; data: any }>
    ) => {
      const { slug, data } = action.payload;
      state.mission_plan[slug] = {
        ...state.mission_plan[slug],
        ...data,
      };
    },
    resetMissionPlanDetails: (state) => {
      Object.assign(state.mission_plan, initialState.mission_plan);
    },
  },
});

export const {
  updateFinancialYearDetails,
  updateMissionPlanDetails,
  resetFinancialYearDetails,
  resetMissionPlanDetails,
} = missionPlanSlice.actions;
export const resetMissionPlan = missionPlanSlice.actions.reset;

export const missionPlanSliceReducer = missionPlanSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
