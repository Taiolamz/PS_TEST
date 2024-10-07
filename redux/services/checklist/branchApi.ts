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

    getBranches: builder.query<any, QueryParams>({
      query: (params) => ({
        url: `/admin/branch${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
      // transformResponse: (response: {
      //   data: { branches: { data: BranchData[] } };
      // }) => response?.data?.branches?.data,
    }),

    getBranchById: builder.query({
      query: (branchId) => ({
        url: `/admin/branch/${branchId}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),

    getBranchDepartment: builder.query({
      query: (branchId) => ({
        url: `/admin/branch/branch-department-entites/${branchId}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),
    getBranchUnit: builder.query({
      query: (branchId) => ({
        url: `/admin/branch/branch-unit-entites/${branchId}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),
    getBranchStaff: builder.query({
      query: (branchId) => ({
        url: `/admin/branch/branch-staff-entites/${branchId}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),

    downloadBranchTemplate: builder.query({
      query: (format: string) => ({
        url: `/admin/branch/BulkUpload-template?format=${format}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/admin/branch/branches/${id}/close`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branches"],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useCreateBulkBranchesMutation,
  useGetBranchesQuery,
  useLazyDownloadBranchTemplateQuery,
  useGetBranchByIdQuery,
  useGetBranchDepartmentQuery,
  useGetBranchStaffQuery,
  useGetBranchUnitQuery,
  useDeleteBranchMutation,
} = branchApi;
