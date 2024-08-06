import { baseApi } from "../baseApi";

export const missionFlowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMissionFlow: builder.mutation({
      query: (payload) => ({
        url: `/admin/organization/approval-flow/create`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateMissionFlowMutation } = missionFlowApi;
