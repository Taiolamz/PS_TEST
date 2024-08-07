import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "./type";

const initialState: Auth = {
  token: "",
  user: {
    organization: {
      id: "",
    },
  },
  checklist: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    setAuthUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    setChecklist: (state, action: PayloadAction<any>) => {
      state.checklist = action.payload;
    },
  },
});

export const { setAuthUser, setChecklist } = authSlice.actions;
export const resetAuth = authSlice.actions.reset;

export const authSliceReducer = authSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
