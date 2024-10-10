import { baseApi } from "../../../baseApi";

export const missionPlanReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffMeasureOfSuccess: builder.query({
      query: (user) => ({
        url: `/mission-plan-report/measures/${user}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getStaffSpecifiedTask: builder.query({
      query: (user) => ({
        url: `/mission-plan-report/specified-tasks/${user}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),

    getMissionPlanReportCycle: builder.query<any, void>({
      query: () => ({
        url: "/mission-plan-report/organization-cycle",
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),
    getOrgFiscalYear: builder.query<any, void>({
      query: () => ({
        url: "/mission-plan-report/organization-fiscal-year",
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),
    getSpecifiedTaskProgress: builder.query<any, void>({
      query: () => ({
        url: "/admin/mission-plan-report/organization-specified-task",
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),
  }),
});

export const {
  useGetStaffMeasureOfSuccessQuery,
  useGetStaffSpecifiedTaskQuery,
  useGetMissionPlanReportCycleQuery,
  useGetOrgFiscalYearQuery,
  useGetSpecifiedTaskProgressQuery
} = missionPlanReportApi;
