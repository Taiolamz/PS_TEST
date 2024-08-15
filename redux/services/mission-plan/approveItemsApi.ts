import { baseApi } from "../baseApi";

export const approveItemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    approveMissionPlanItems: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/approve/item`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useApproveMissionPlanItemsMutation } = approveItemsApi;