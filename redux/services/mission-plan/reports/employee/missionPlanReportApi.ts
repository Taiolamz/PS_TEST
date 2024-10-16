import { generateQueryString } from "@/utils/helpers";
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
    getDownlinerExpectedOutcome: builder.query({
      query: (user) => ({
        url: `/mission-plan-report/task-submission/${user}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getDownlinerMissionPlanReport: builder.query({
      query: (params) => ({
        url: `/mission-plan-report/downline${generateQueryString({
          ...params,
        })}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
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

    getOrgFiscalYear: builder.query<any, void>({
      query: () => ({
        url: "/mission-plan-report/organization-fiscal-year",
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

    addChallange: builder.mutation({
      query: (payload) => ({
        url: `/challenges/store`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["MissionPlanReport"],
    }),

    getTaskOutcomeTask: builder.query({
      query: (id) => ({
        url: `/mission-plan-report/tasks/${id}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getDownlineReport: builder.query({
      query: () => ({
        url: `/mission-plan-report/downline`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getApprovalReport: builder.query({
      query: () => ({
        url: `/mission-plan-report/approvals`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    addTaskOutcome: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan-report/expected-task-outcome`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MissionPlanReport"],
    }),

    addActualOutcome: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan-report/actual-task-outcome`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MissionPlanReport"],
    }),

    addTaskAttachment: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan-report/outcome-attachement`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MissionPlanReport"],
    }),

    getStaffPhotoFiscalYear: builder.query({
      query: (id) => ({
        url: `/mission-plan-report/mission-statement/${id}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
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
  useGetOrgFiscalYearQuery,
  useAddChallangeMutation,
  useGetTaskOutcomeTaskQuery,
  useGetDownlineReportQuery,
  useGetApprovalReportQuery,
  useAddTaskOutcomeMutation,
  useAddActualOutcomeMutation,
  useAddTaskAttachmentMutation,
  useGetStaffPhotoFiscalYearQuery,
  useGetDownlinerExpectedOutcomeQuery,
  useGetDownlinerMissionPlanReportQuery,
} = missionPlanReportApi;
