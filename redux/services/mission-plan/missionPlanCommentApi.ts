import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const allmissionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allMssionPlanComments: builder.mutation({
      query: (payload) => ({
        url: `/comments`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Comments"],
    }),
    // getMissionPlanCommentable: builder.query({
    //   query: (params) => ({
    //     url: `/mission-plan/organization/${
    //       params?.fiscal_year_id
    //     }${generateQueryString({ ...params })}`,
    //     method: "GET",
    //     responseHandler: (response) => response.blob(),
    //     cache: "no-cache",
    //   }),
    // }),
  }),
});

export const {
  useAllMssionPlanCommentsMutation,
} = allmissionPlanApi;
