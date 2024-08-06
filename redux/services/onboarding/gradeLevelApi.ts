import { baseApi } from "../baseApi";

export const gradeLevelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGradeLevels: builder.query<BranchData[], QueryParams>({
      query: () => ({
        url: `/admin/organization/staff-levels`,
        method: "GET",
      }),
      transformResponse: (response: { data: { data: BranchData[] } }) =>
        response.data.data,
    }),
  }),
});

export const { useGetGradeLevelsQuery } = gradeLevelApi;
