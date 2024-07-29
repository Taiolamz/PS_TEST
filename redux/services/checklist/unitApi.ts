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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    createBulkUnits: builder.mutation({
      query: (payload) => ({
        url: `/admin/unit/upload`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getUnits: builder.query<UnitData[], QueryParams>({
      query: (params) => ({
        url: `/admin/unit${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      transformResponse: (response: { data: { data: BranchData[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useCreateBulkUnitsMutation,
  useGetUnitsQuery,
} = unitApi;
