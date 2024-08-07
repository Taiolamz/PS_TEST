import { Dictionary } from "@/@types/dictionary";
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Dictionary = {
  fy_info: {
    financial_year: {
      title: "",
      start_date: "",
      end_date: "",
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
        {
          pillar: "",
        },
        {
          pillar: "",
        },
      ],
    },
  },
  mission_plan: {
    active_fy_info: null,
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
      state.mission_plan[slug] = data;
    },
    resetMissionPlanDetails: (state) => {
      Object.assign(state.mission_plan, initialState.mission_plan);
    },
  },
});

export const { updateFinancialYearDetails, updateMissionPlanDetails, resetFinancialYearDetails, 
  resetMissionPlanDetails
  } =
  missionPlanSlice.actions;
export const resetMissionPlan = missionPlanSlice.actions.reset;

export const missionPlanSliceReducer = missionPlanSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
