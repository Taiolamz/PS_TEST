import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => state = initialState,
        setAuthUser: (state, action: PayloadAction<any>) => { 
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }

})

export const { setAuthUser } = authSlice.actions
export const resetAuth = authSlice.actions.reset
export const authSliceReducer = authSlice.reducer