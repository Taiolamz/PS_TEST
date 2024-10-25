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

    updateBranch: builder.mutation({
      query: (payload) => ({
        url: `/admin/branch/update/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Branches"],
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

    getBranchesExport: builder.query<any, QueryParams>({
      query: (params) => ({
        url: `/admin/branch${generateQueryString({ ...params })}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: ["Branches"],
    }),

    getBranchById: builder.query({
      query: (branchId) => ({
        url: `/admin/branch/${branchId}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),

    getBranchUnit: builder.query<any, { id: string; params: QueryParams }>({
      query: ({ id, params }) => ({
        url: `/admin/branch/branch-unit-entites/${id}${generateQueryString({
          ...params,
        })}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),

    getBranchDepartment: builder.query<
      any,
      { id: string; params: QueryParams }
    >({
      query: ({ id, params }) => ({
        url: `/admin/branch/branch-department-entites/${id}${generateQueryString(
          {
            ...params,
          }
        )}`,
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),

    getBranchesDeptExport: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/branch/branch-department-entites/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: ["Branches"],
    }),

    getBranchStaff: builder.query<any, { id: string; params: QueryParams }>({
      query: ({ id, params }) => ({
        url: `/admin/branch/branch-staff-entites/${id}${generateQueryString({
          ...params,
        })}`,
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

    reopenBranch: builder.mutation({
      query: (id: string) => ({
        url: `/admin/branch/branches/${id}/reopen`,
        method: "POST",
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
  useUpdateBranchMutation,
  useReopenBranchMutation,
  useLazyGetBranchesExportQuery,
  useLazyGetBranchesDeptExportQuery,
} = branchApi;
