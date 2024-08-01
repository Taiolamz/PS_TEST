import Cookies from "js-cookie";
import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (payload) => ({
        url: `/admin/invitation/create-invitation`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    createBulkEmployees: builder.mutation({
      query: (payload) => ({
        url: `/admin/employee/bulk-upload`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // console.log('Error:', error)
        }
      },
    }),

    getEmployees: builder.query<EmployeeRolesData[], QueryParams>({
      query: (params) => ({
        url: `/admin/invitation${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Employees"],
      transformResponse: (response: { data: EmployeeRolesData[] }) =>
        response.data,
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useCreateBulkEmployeesMutation,
  useGetEmployeesQuery,
} = employeeApi;
