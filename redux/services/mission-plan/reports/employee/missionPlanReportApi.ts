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

    getFiscalYearsProgress: builder.query({
      query: (payload: { type: "measures" | "tasks"; page: number }) => ({
        url: `mission-plan-report/fiscal-years-progress?type=${payload.type}&page=${payload.page}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
      transformResponse: (response: any) => response?.data,
    }),

    getMOSMeasureofSuccess: builder.query({
      query: (id) => ({
        url: `/mission-plan-report/user-measure-of-success/${id}`,
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
  useGetFiscalYearsProgressQuery,
  useGetMOSMeasureofSuccessQuery,
} = missionPlanReportApi;
