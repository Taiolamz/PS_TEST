import Cookies from "js-cookie";
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    createBulkSubsidiaries: builder.mutation({
      query: (payload) => ({
        url: `/admin/subsidiary/bulk-upload`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Subsidiaries"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getSubsidiaries: builder.query<SubsidiaryData[], QueryParams>({
      query: (params) => ({
        url: `/admin/subsidiary${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Subsidiaries"],
      transformResponse: (response: { data: { data: SubsidiaryData[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useCreateSubsidiaryMutation,
  useCreateBulkSubsidiariesMutation,
  useGetSubsidiariesQuery,
} = subsidiaryApi;
