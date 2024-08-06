import { baseApi } from "../baseApi";

export const gradeLevelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGradeLevels: builder.query<string, {}>({
      query: () => ({
        url: `/admin/organization/staff-levels`,
        method: "GET",
      }),
      transformResponse: (response: { data: string }) =>
        response.data,
    }),
  }),
});

export const { useGetGradeLevelsQuery } = gradeLevelApi;
