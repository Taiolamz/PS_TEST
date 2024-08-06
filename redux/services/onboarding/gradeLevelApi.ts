import { baseApi } from "../baseApi";

export const gradeLevelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGradeLevels: builder.query<GradeLevelData[], {}>({
      query: () => ({
        url: `/admin/organization/staff-levels`,
        method: "GET",
      }),
      transformResponse: (response: { data: GradeLevelData[] }) =>
        response.data,
    }),
  }),
});

export const { useGetGradeLevelsQuery } = gradeLevelApi;
