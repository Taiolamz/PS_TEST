import { Dictionary } from "@/@types/dictionary";
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Dictionary = {
  isPreview: false,
};

const missionPlanPreviewSlice = createSlice({
  name: "mission_plan_preview",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    updateMissionPlanPreview: (
      state,
      action: PayloadAction<{ isPreview: boolean }>
    ) => {
      const { isPreview } = action.payload;
      state.isPreview = isPreview;
    },
  },
});

export const { updateMissionPlanPreview } = missionPlanPreviewSlice.actions;
export const resetMissionPlanPreview = missionPlanPreviewSlice.actions.reset;

export const missionPlanPreviewSliceReducer = missionPlanPreviewSlice.reducer;
