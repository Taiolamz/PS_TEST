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
    // mission and vission

    // strategic pillar
  },
  mission_plan: {},
};

const missionPlanSlice = createSlice({
  name: "mission_plan",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    updateFinancialYearDetails: ( state,action: PayloadAction<{ slug: string; data: any }>
    ) => {
      const { slug, data } = action.payload;
      state.fy_info[slug] = data;
    },
  },
});

export const { updateFinancialYearDetails } = missionPlanSlice.actions;
export const resetMissionPlan = missionPlanSlice.actions.reset;

export const missionPlanSliceReducer = missionPlanSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
