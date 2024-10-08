import { baseApi } from "../../../baseApi";

export const targetOutcomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setExpectedOutcomeSubmission: builder.mutation({
      query: (payload) => ({
        url: `/admin/mission-plan-report/settings/target`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['TargetOutcomeSettings']
    }),
    setActualOutcomeSubmission: builder.mutation({
      query: (payload) => ({
        url: `/admin/mission-plan-report/settings/achievement`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['TargetOutcomeSettings']
    }),
    fetchReportSubmissionSettings: builder.query({
      query: () => ({
        url: `/admin/mission-plan-report/settings`,
        method: "GET",
      }),
      providesTags: ['TargetOutcomeSettings']
    }),
  }),
});

export const {
    useSetExpectedOutcomeSubmissionMutation,
    useSetActualOutcomeSubmissionMutation,
    useFetchReportSubmissionSettingsQuery
} = targetOutcomeApi;
