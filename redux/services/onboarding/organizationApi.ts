import { baseApi } from "../baseApi";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrgDetails: builder.query<BranchData[], void>({
      query: () => ({
        url: `/admin/organization/organization-info-dropdown`,
        method: "GET",
      }),
      transformResponse: (response: {
        data: { organization_info: BranchData[] };
      }) => response.data.organization_info,
    }),
  }),
});

export const { useGetOrgDetailsQuery } = organizationApi;
