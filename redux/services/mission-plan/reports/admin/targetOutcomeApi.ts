import { baseApi } from "../../../baseApi";

export const targetOutcomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setExpectedOutcomeSubmission: builder.mutation({
      query: (payload) => ({
        url: `/admin/mission-plan-report/settings/target`,
        method: "POST",
        body: payload
      }),
    }),
    setActualOutcomeSubmission: builder.mutation({
      query: (payload) => ({
        url: `/admin/mission-plan-report/settings/achievement`,
        method: "POST",
        body: payload
      }),
    }),
  }),
});

export const {
    useSetExpectedOutcomeSubmissionMutation,
    useSetActualOutcomeSubmissionMutation
} = targetOutcomeApi;
