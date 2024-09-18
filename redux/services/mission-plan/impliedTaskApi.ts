import { baseApi } from "../baseApi";

export const impliedTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createImpliedTask: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/implied-task`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["MissionPlan"],
    }),
    deleteImpliedTask: builder.mutation({
      query: (id) => ({
        url: `/mission-plan/implied-task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MissionPlan"],
    }),
    reAssignImpliedTask: builder.mutation({
      query: (payload) => ({
        url: `/mission-plan/implied-task/reassign`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["MissionPlan"],
    }),
  }),
});

export const {
  useCreateImpliedTaskMutation,
  useDeleteImpliedTaskMutation,
  useReAssignImpliedTaskMutation,
} = impliedTaskApi;
