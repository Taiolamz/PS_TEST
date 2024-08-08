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
    }),

    createBulkDepartments: builder.mutation({
      query: (payload) => ({
        url: `/admin/department/upload`,
        method: "POST",
        body: payload,
      }),
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

    getSingleDepartment: builder.query<string[], void>({
      query: (id) => ({
        url: `/admin/department/${id}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
      transformResponse: (response: { data: { data: string[] } }) =>
        response.data.data,
    }),

    downloadDepartmentTemplate: builder.query<any, FileTemplateParam>({
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
  useCreateDepartmentMutation,
  useCreateBulkDepartmentsMutation,
  useGetDepartmentsQuery,
  useLazyDownloadDepartmentTemplateQuery,
  useGetSingleDepartmentQuery,
} = departmentApi;
