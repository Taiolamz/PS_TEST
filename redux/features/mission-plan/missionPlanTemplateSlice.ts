// import { missionContentModal } from "@/app/(dashboard)/admin/checklist/checklist-steps";
import {
  MissionContentDetails,
  missionContentModal,
} from "@/app/(dashboard)/admin/mission-plan/template/level/_component/checklist-steps";
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MissionPlanTemplate = {
  missionPlanTemplates: missionContentModal,
};
export const missionPlanTemplateSlice = createSlice({
  name: "mission_plan_template",
  initialState,
  reducers: {
    setMissionPlanTemplates: (
      state,
      action: PayloadAction<MissionContentDetails[]>
    ) => {
      state.missionPlanTemplates = action.payload;
    },
  },
});

export const missionPlanTemplateSliceReducer = missionPlanTemplateSlice.reducer;

export const { setMissionPlanTemplates } = missionPlanTemplateSlice.actions;

export const selectMissionPlanTemplates = (state: RootStateType) =>
  state.mission_plan_template.missionPlanTemplates;
