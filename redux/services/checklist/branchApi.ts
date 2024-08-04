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
    }),

    createBulkBranches: builder.mutation({
      query: (payload) => ({
        url: `/admin/branch/import-excel`,
        method: "POST",
        body: payload,
      }),
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

    downloadBranchTemplate: builder.query({
      query: (format: string) => ({
        url: `/admin/branch/BulkUpload-template?format=${format}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useCreateBulkBranchesMutation,
  useGetBranchesQuery,
  useLazyDownloadBranchTemplateQuery,
} = branchApi;
