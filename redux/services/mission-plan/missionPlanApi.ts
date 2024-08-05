import { resetAuth, setAuthUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

export const missionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStrategicIntent: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/strategic-intent`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getCurrentMissionPlan: builder.query({
      query: () => ({
        url: `/mission-plan/user/current`,
        method: "GET",
      }),
      providesTags: ["Branches"],
      transformResponse: (response: { data: CurrentMissionPlanData[] }) =>
        response.data,
    }),
  }),
});

export const { useAddStrategicIntentMutation, useGetCurrentMissionPlanQuery } =
  missionPlanApi;
