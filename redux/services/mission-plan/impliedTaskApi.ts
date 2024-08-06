import { baseApi } from "../baseApi";

export const impliedTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createImpliedTask: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/implied-task`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Branches"],
    }),
  }),
});

export const { useCreateImpliedTaskMutation } = impliedTaskApi;
