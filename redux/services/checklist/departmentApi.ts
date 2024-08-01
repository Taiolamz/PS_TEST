import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (payload) => ({
        url: `/admin/department/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    createBulkDepartments: builder.mutation({
      query: (payload) => ({
        url: `/admin/department/upload`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getDepartments: builder.query<DepartmentData[], QueryParams>({
      query: (params) => ({
        url: `/admin/department${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
      transformResponse: (response: { data: { data: DepartmentData[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useCreateBulkDepartmentsMutation,
  useGetDepartmentsQuery,
} = departmentApi;
