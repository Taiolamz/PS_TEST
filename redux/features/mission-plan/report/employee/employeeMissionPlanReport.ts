import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EmployeeMissionPlanReportFilter {
  fiscal_year: string;
  mission_cycle: string;
}

const initialState: EmployeeMissionPlanReportFilter = {
  fiscal_year: "",
  mission_cycle: "",
};

const employeeMissionPlanReportFilter = createSlice({
  name: "employee_mission_plan_filter",
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.fiscal_year = initialState.fiscal_year;
      state.mission_cycle = initialState.mission_cycle;
    },

    setFilteredFiscalYear: (state, action: PayloadAction<string>) => {
      state.fiscal_year = action.payload;
    },

    setFilteredMissionCycle: (state, action: PayloadAction<string>) => {
      state.mission_cycle = action.payload;
    },
  },
});

export const { setFilteredFiscalYear, setFilteredMissionCycle, resetFilter } =
  employeeMissionPlanReportFilter.actions;

export const employeeMissionPlanReportFilterReducer =
  employeeMissionPlanReportFilter.reducer;
