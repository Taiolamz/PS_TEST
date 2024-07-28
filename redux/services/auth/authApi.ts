import { resetAuth, setAuthUser } from "@/redux/features/auth/authSlice";
import Cookies  from "js-cookie"
import { baseApi } from "../baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: `/login`,
                method: 'POST',
                body: user,
                // credentials: "include" as const
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                    const { data: { data } } = result
                    Cookies.set('token', data.token)
                    dispatch(setAuthUser(data))
                } catch (error: any) {
                    // console.log(error)
                }
            }
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: `/admin/register`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                    const { data: { data } } = result
                    Cookies.set('token', data.token)
                    dispatch(setAuthUser(data))
                } catch (error: any) {
                    console.log('Error:', error)
                }
            }
        }),
        adminVerifyOTP: builder.mutation({
            query: (payload) => ({
                url: `/admin/otp/verify`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                } catch (error: any) {
                    console.log('Error:', error)
                }
            }
        }),
        adminResendOTP: builder.mutation({
            query: () => ({
                url: `/admin/otp/resend`,
                method: 'POST',
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                } catch (error: any) {
                    // console.log('Error:', error)
                }
            }
        }),
        forgotPassword: builder.mutation({
            query: (payload) => ({
                url: `/password/forgot`,
                method: 'POST',
                body: payload
                
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                } catch (error: any) {
                    // console.log('Error:', error)
                }
            }
        }),
        verifyOTP: builder.mutation({
            query: (payload) => ({
                url: `/verify-otp`,
                method: 'POST',
                body: payload
                
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                } catch (error: any) {
                    // console.log('Error:', error)
                }
            }
        }),
        resendOTP: builder.mutation({
            query: (payload) => ({
                url: `/resend-otp`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                } catch (error: any) {
                    // console.log('Error:', error)
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (payload) => ({
                url: `/password/reset`,
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                } catch (error: any) {
                    // console.log('Error:', error)
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: 'POST',
                // credentials: "include" as const
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                    Cookies.remove('token')
                    window.location.href = '/'
                    dispatch(resetAuth())
                } catch (error: any) {
                    console.log('Error:', error)
                }
            }
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useAdminVerifyOTPMutation, useAdminResendOTPMutation, useForgotPasswordMutation, useResetPasswordMutation, useVerifyOTPMutation, useResendOTPMutation } = authApi