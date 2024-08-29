import { baseApi } from "../baseApi";
import { generateQueryString } from "@/utils/helpers";

export const allmissionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganizationEmployeeMissionPlan: builder.query({
      query: ({ params, fiscal_year_id }) => ({
        url: `/mission-plan/organization/${fiscal_year_id}${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    getAllOrganizationMissionPlanSummary: builder.query({
      query: ({ params, fiscal_year_id }) => ({
        url: `/mission-plan/organization/${fiscal_year_id}/summary${generateQueryString(
          { ...params }
        )}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    getAllOrganizationMissionPlanDropdown: builder.query({
      query: () => ({
        url: `/admin/organization/organization-info-dropdown`,
        method: "GET",
      }),
      providesTags: [
        "Subsidiaries",
        "Branches",
        "Departments",
        "Units",
        "Employees",
      ],
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

    extendFinancialYear: builder.mutation({
      query: (params) => ({
        url: `mission-plan/financial-year/extend`,
        method: "PATCH",
        body: {
          fiscal_year_id: params.fiscal_year_id,
          new_end_date: params.new_end_date,
        },
        cache: "no-cache",
      }),
      invalidatesTags: ["OrganizationFiscalYear"],
    }),
  }),
});

export const {
  useGetAllOrganizationMissionPlanSummaryQuery,
  useGetAllOrganizationEmployeeMissionPlanQuery,
  useGetAllOrganizationMissionPlanDropdownQuery,
  useLazyGetAllOrganizationEmployeeMissionPlanExportQuery,
  useExtendFinancialYearMutation,
} = allmissionPlanApi;
