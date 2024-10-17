import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "./type";

const initialState: Employee = {
  employee: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    setEmployeeData: (state, action: PayloadAction<any>) => {
      state.employee = action.payload;
    },
  },
});

export const { setEmployeeData } = employeeSlice.actions;
export const resetAuth = employeeSlice.actions.reset;

export const employeeSliceReducer = employeeSlice.reducer;

// export const selectEmployee = (state: RootStateType) => state.auth.employee;
