import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const subsidiaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubsidiary: builder.mutation({
      query: (payload) => ({
        url: `/admin/subsidiary`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Subsidiaries"],
    }),

    updateSubsidiary: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/subsidiary/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subsidiaries"],
    }),

    createBulkSubsidiaries: builder.mutation({
      query: (payload) => ({
        url: `/admin/subsidiary/bulk-upload`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Subsidiaries"],
    }),

    getSubsidiaries: builder.query<any, QueryParams>({
      query: (params) => ({
        url: `/admin/subsidiary${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries"],
      // transformResponse: (response: { data: { data: SubsidiaryData[] } }) =>
      //   response.data.data,
    }),

    getSubsidiaryById: builder.query({
      query: (id: string) => ({
        url: `/admin/subsidiary/${id}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries"],
      transformResponse: (response: any) => response?.data?.subsidiary,
    }),

    getSubsidiaryInBranch: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities/branch/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries", "Branches"],
      transformResponse: (response: any) => response.data.branch,
    }),

    exportSubsidiaryInBranch: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities/branch/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: ["Subsidiaries", "Branches"],
    }),

    getSubsidiaryInDept: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities/department/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries", "Departments"],
      transformResponse: (response: any) => response.data.department,
    }),

    exportSubsidiaryInDept: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities/department/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: ["Subsidiaries", "Departments"],
    }),

    getSubsidiaryInUnit: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities/unit/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries", "Units"],
      transformResponse: (response: any) => response.data.unit,
    }),

    exportSubsidiaryInUnit: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities/unit/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: ["Subsidiaries", "Units"],
    }),

    getSubsidiaryInStaff: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities-staff/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries", "Employees"],
      transformResponse: (response: any) => response.data.staff,
    }),

    exportSubsidiaryInStaff: builder.query({
      query: ({ id, params }) => ({
        url: `/admin/subsidiary/subsidiary-entities-staff/${id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: ["Subsidiaries", "Employees"],
    }),

    reopenSubsidiary: builder.mutation({
      query: (id: string) => ({
        url: `/admin/subsidiary/open/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Subsidiaries"],
    }),

    downloadSubsidiaryTemplate: builder.query({
      query: (format: string) => ({
        url: `/admin/subsidiary/BulkUpload-template?format=${format}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),

    deleteSubsidiaries: builder.mutation({
      query: (id: string) => ({
        url: `/admin/subsidiary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subsidiaries"],
    }),

    closeSubsidiaries: builder.mutation({
      query: (id: string) => ({
        url: `/admin/subsidiary/close/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subsidiaries"],
    }),
  }),
});

export const {
  useCreateSubsidiaryMutation,
  useCreateBulkSubsidiariesMutation,
  useGetSubsidiariesQuery,
  useLazyDownloadSubsidiaryTemplateQuery,
  useDeleteSubsidiariesMutation,
  useGetSubsidiaryByIdQuery,
  useGetSubsidiaryInBranchQuery,
  useGetSubsidiaryInDeptQuery,
  useGetSubsidiaryInUnitQuery,
  useGetSubsidiaryInStaffQuery,
  useReopenSubsidiaryMutation,
  useCloseSubsidiariesMutation,
  useUpdateSubsidiaryMutation,
  useLazyExportSubsidiaryInStaffQuery,
  useLazyExportSubsidiaryInUnitQuery,
  useLazyExportSubsidiaryInDeptQuery,
  useLazyExportSubsidiaryInBranchQuery,
} = subsidiaryApi;
