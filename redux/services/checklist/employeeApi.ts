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
      invalidatesTags: ["Employees", "Staff"],
    }),

    createBulkEmployees: builder.mutation({
      query: (payload) => ({
        url: `/admin/employee/bulk-upload`,
        method: "POST",
        body: payload,
      }),
    }),

    getEmployees: builder.query<EmployeeRolesData[], QueryParams>({
      query: (params) => ({
        url: `/admin/invitation${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Employees", "Staff"],
      transformResponse: (response: { data: EmployeeRolesData[] }) =>
        response.data,
    }),

    downloadEmployeeTemplate: builder.query({
      query: (format: string) => ({
        url: `/admin/employee/template?format=${format}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),

    downloadEmployeeData: builder.query({
      query: (format: string) => ({
        url: `/admin/invitation/export/${format}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useCreateBulkEmployeesMutation,
  useGetEmployeesQuery,
  useLazyDownloadEmployeeTemplateQuery,
  useLazyDownloadEmployeeDataQuery,
} = employeeApi;
