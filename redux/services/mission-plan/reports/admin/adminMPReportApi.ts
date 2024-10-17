import { baseApi } from "../../../baseApi";

export const adminMPReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganiationSpecifiedTaskProgress: builder.query({
      query: (payload) => ({
        url: `/admin/organization/target?fiscal_year=${
          payload.fiscal_year || ""
        }&cycle=${payload.cycle || ""}&is_admin=${
          payload?.is_admin || ""
        }&staff_id=${payload?.staff_id || ""}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),
    getTopLevelExecutiveMissonPlan: builder.query({
      query: (payload) => ({
        url: `/mission-plan-report/top-level-executives?fiscal_year_id=${payload.fiscal_year_id}`,
        method: "GET",
      }),
      // providesTags: ["MissionPlanReport"],
    }),
  }),
});

export const {
  useGetOrganiationSpecifiedTaskProgressQuery,
  useGetTopLevelExecutiveMissonPlanQuery,
} = adminMPReportApi;
