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
      transformResponse: (response: any) =>
        response?.data?.subsidiary,
    }),

    getSubsidiaryInBranch: builder.query({
      query: ({id, params}) => ({
        url: `/admin/subsidiary/subsidiary-entities/branch/${id}/${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries"],
      // transformResponse: (response: { data: { data: SubsidiaryData[] } }) =>
      //   response.data.data,
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
  }),
});

export const {
  useCreateSubsidiaryMutation,
  useCreateBulkSubsidiariesMutation,
  useGetSubsidiariesQuery,
  useLazyDownloadSubsidiaryTemplateQuery,
  useDeleteSubsidiariesMutation,
  useGetSubsidiaryByIdQuery,
  useGetSubsidiaryInBranchQuery
} = subsidiaryApi;
