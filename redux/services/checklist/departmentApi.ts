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

    getDepartments: builder.query<DepartmentResponse, QueryParams>({
      query: (params) => ({
        url: `/admin/department${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
      transformResponse: (response: { data: DepartmentResponse }) =>
        response.data,
    }),

    getDepartmentById: builder.query({
      query: (departmentId) => ({
        url: `/admin/department/${departmentId}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
    }),

    getAllDepartmentStaffById: builder.query<
      any,
      { id: string; params: QueryParams }
    >({
      query: ({ id, params }) => ({
        url: `/admin/department/${id}/staff-members${generateQueryString({
          ...params,
        })}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
      // transformResponse: (response: { data: { data: BranchData[] } }) =>
      //   response.data.data,
    }),

    getAllDepartmentUnitById: builder.query<
      any,
      { id: string; params: QueryParams }
    >({
      query: ({ id, params }) => ({
        url: `/admin/department/${id}/units${generateQueryString({
          ...params,
        })}`,
        method: "GET",
      }),
      providesTags: ["Departments"],
      // transformResponse: (response: { data: { data: BranchData[] } }) =>
      //   response.data.data,
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
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/admin/department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),

    updateDepartment: builder.mutation({
      query: (payload) => ({
        url: `/admin/department/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useCreateBulkDepartmentsMutation,
  useGetDepartmentsQuery,
  useLazyDownloadDepartmentTemplateQuery,
  // useGetSingleDepartmentQuery,
  useDeleteDepartmentMutation,
  useGetDepartmentByIdQuery,
  useGetAllDepartmentStaffByIdQuery,
  useGetAllDepartmentUnitByIdQuery,
  useUpdateDepartmentMutation,
} = departmentApi;
