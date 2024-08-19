import { Dictionary } from "@/@types/dictionary";
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Dictionary = {
  name: "",
};

const employeeDataSlice = createSlice({
  name: "single-employee",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    updateEmployeeDetails: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      state.name = name;
    },
  },
});

export const { updateEmployeeDetails } = employeeDataSlice.actions;
export const resetSingleEmployee = employeeDataSlice.actions.reset;

export const employeeDataSliceReducer = employeeDataSlice.reducer;
