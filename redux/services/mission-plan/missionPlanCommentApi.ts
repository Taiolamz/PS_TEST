import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const missionPlanCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allMssionPlanComments: builder.mutation({
      query: (payload) => ({
        url: `/comments`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Comments"],
    }),
    addMssionPlanComment: builder.mutation({
      query: (payload) => ({
        url: `/comments/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Comments"],
    }),
    getCommentableType: builder.query({
      query: () => ({
        url: `/comments/commentable-types`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllMssionPlanCommentsMutation,
  useAddMssionPlanCommentMutation,
} = missionPlanCommentApi;
