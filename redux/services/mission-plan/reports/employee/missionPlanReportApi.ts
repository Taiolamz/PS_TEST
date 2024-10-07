import { baseApi } from "../../../baseApi";

export const missionPlanReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffMeasureOfSuccess: builder.query({
      query: (user) => ({
        url: `/mission-plan-report/measures/${user}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),
  }),
});

export const { useGetStaffMeasureOfSuccessQuery } = missionPlanReportApi;
