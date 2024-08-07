import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const allmissionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationMissionPlan: builder.query({
      query: () => ({
        url: `/mission-plan/fiscal-years/organization`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    getAllOrganizationEmployeeMissionPlan: builder.query({
      query: (params) => ({
        url: `/mission-plan/organization/${
          params?.fiscal_year_id
        }${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    getAllOrganizationMissionPlanSummary: builder.query({
      query: (params) => ({
        url: `/mission-plan/organization/${
          params?.fiscal_year_id
        }/summary${generateQueryString({ ...params })}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    getAllOrganizationMissionPlanDropdown: builder.query({
      query: () => ({
        url: `/admin/organization/organization-info-dropdown`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    getAllOrganizationEmployeeMissionPlanExport: builder.query({
      query: (params) => ({
        url: `/mission-plan/organization/${
          params?.fiscal_year_id
        }${generateQueryString({ ...params })}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useGetAllOrganizationMissionPlanSummaryQuery,
  useGetAllOrganizationEmployeeMissionPlanQuery,
  useGetAllOrganizationMissionPlanDropdownQuery,
  useGetOrganizationMissionPlanQuery,
  useLazyGetAllOrganizationEmployeeMissionPlanExportQuery,
} = allmissionPlanApi;
