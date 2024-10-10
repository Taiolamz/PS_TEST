import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const unitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUnit: builder.mutation({
      query: (payload) => ({
        url: `/admin/unit/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Units"],
    }),

    createBulkUnits: builder.mutation({
      query: (payload) => ({
        url: `/admin/unit/upload`,
        method: "POST",
        body: payload,
      }),
    }),

    updateUnit: builder.mutation({
      query: (payload) => ({
        url: `admin/unit/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    getUnits: builder.query<any, QueryParams>({
      query: (params) => ({
        url: `/admin/unit${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Units"],
      // transformResponse: (response: { data: { data: BranchData[] } }) =>
      //   response.data.data,
    }),
    getSingleUnit: builder.query<any, string>({
      query: (unit) => ({
        url: `/admin/unit/${unit}`,
        method: "GET",
      }),
      providesTags: ["Units"],
      // transformResponse: (response: { data: { data: BranchData[] } }) =>
      //   response.data.data,
    }),

    deleteUnit: builder.mutation({
      query: (unit) => ({
        url: `/admin/unit/close-unit/${unit}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Units"],
    }),

    downloadUnitTemplate: builder.query<any, FileTemplateParam>({
      query: (params) => ({
        url: `/admin/downloadFile/${generateQueryString({
          ...params,
        })}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useCreateBulkUnitsMutation,
  useGetUnitsQuery,
  useLazyDownloadUnitTemplateQuery,
  useGetSingleUnitQuery,
  useDeleteUnitMutation,
  useUpdateUnitMutation,
} = unitApi;
