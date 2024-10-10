import { baseApi } from "../../../baseApi";

export const adminMPReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganiationSpecifiedTaskProgress: builder.query({
      query: (payload) => ({
        url: `/admin/organization/target?fiscal_year=${payload.fiscal_year}&cycle=${payload.cycle}`,
        method: "GET",
      }),
      providesTags: ["MissionPlanReport"],
    }),
  }),
});

export const { useGetOrganiationSpecifiedTaskProgressQuery } = adminMPReportApi;
