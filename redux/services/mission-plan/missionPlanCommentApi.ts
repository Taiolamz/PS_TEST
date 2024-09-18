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
    getMssionPlanFetchComments: builder.query({
      query: ({ component_id, component_type }) => ({
        url: `/comments/fetch-comments?component_id=${component_id}&component_type=${component_type}`,
        method: "GET",
      }),
    }),
    addMssionPlanCommentOnComponent: builder.mutation({
      query: (payload) => ({
        url: `/comments/comment-on-component`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useAllMssionPlanCommentsMutation,
  useAddMssionPlanCommentMutation,
  useLazyGetCommentableTypeQuery,
  useLazyGetMssionPlanFetchCommentsQuery,
  useAddMssionPlanCommentOnComponentMutation,
} = missionPlanCommentApi;
