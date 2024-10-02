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
  checklist: {},
  profile: {},
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
    setUserProfile: (state, action: PayloadAction<any>) => {
      // console.log(action?.payload?.profile);

      state.profile = action.payload.profile;
    },
  },
});

export const { setAuthUser, setChecklist, setUserProfile } = authSlice.actions;
export const resetAuth = authSlice.actions.reset;

export const authSliceReducer = authSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
