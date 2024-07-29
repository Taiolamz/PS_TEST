import { resetAuth, setAuthUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onboarding: builder.mutation({
      query: (payload) => ({
        url: `admin/organization/set-organization`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log("Error:", error);
        }
      },
    }),
  }),
});

export const { useOnboardingMutation } = onboardingApi;
