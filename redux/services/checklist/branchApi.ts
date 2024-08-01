import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBranch: builder.mutation({
      query: (payload) => ({
        url: `/admin/branch`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Branches"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    createBulkBranches: builder.mutation({
      query: (payload) => ({
        url: `/admin/branch/import-excel`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Branches"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getBranches: builder.query<BranchData[], QueryParams>({
      query: (params) => ({
        url: `/admin/branch${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
      transformResponse: (response: { data: { data: BranchData[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useCreateBulkBranchesMutation,
  useGetBranchesQuery,
} = branchApi;
