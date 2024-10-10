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

    getStaffSpecifiedTask: builder.query({
      query: (user) => ({
        url: `/mission-plan-report/specified-tasks/${user}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getMissionPlanReportCycle: builder.query<any, void>({
      query: () => ({
        url: "/mission-plan-report/organization-cycle",
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getFiscalYearsProgress: builder.query({
      query: (payload: { type: "measures" | "tasks"; page: number }) => ({
        url: `mission-plan-report/fiscal-years-progress?type=${payload.type}&page=${payload.page}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
      transformResponse: (response: any) => response?.data,
    }),

    getMOSMeasureofSuccess: builder.query({
      query: (id) => ({
        url: `/mission-plan-report/user-measure-of-success/${id}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getAchievementHistoy: builder.query({
      query: (id) => ({
        url: `/mission-plan-report/achievement/history/${id}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getMOSComment: builder.query({
      query: (id) => ({
        url: `/mission-plan-report/success-measure/${id}/comments`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    addMOSTarget: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan-report/target`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MissionPlanReport"],
    }),

    addMOSAchievement: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan-report/achievement`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MissionPlanReport"],
    }),
  }),
});

export const {
  useGetStaffMeasureOfSuccessQuery,
  useGetStaffSpecifiedTaskQuery,
  useGetMissionPlanReportCycleQuery,
  useGetFiscalYearsProgressQuery,
  useGetMOSMeasureofSuccessQuery,
  useLazyGetAchievementHistoyQuery,
  useLazyGetMOSCommentQuery,
  useAddMOSTargetMutation,
  useAddMOSAchievementMutation,
} = missionPlanReportApi;
