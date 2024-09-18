import { Dictionary } from "@/@types/dictionary";
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Dictionary = {
  old_specified_task_id: "",
  new_specified_task_id: "",
};

const specifiedTaskReassignmentSlice = createSlice({
  name: "specified_task_reassignment",
  initialState,
  reducers: {
    setNewSpecifiedTask: (
      state,
      action: PayloadAction<{ oldSpecifiedId: string; newSpecifiedId: string }>
    ) => {
      state.old_specified_task_id = action.payload.oldSpecifiedId;
      state.new_specified_task_id = action.payload.newSpecifiedId;
    },
  },
});

export const { setNewSpecifiedTask } = specifiedTaskReassignmentSlice.actions;

export const specifiedTaskReassignmentReducer = specifiedTaskReassignmentSlice.reducer;
