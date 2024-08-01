import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RolesData[], QueryParams>({
      query: (params) => ({
        url: `/admin/invitation`,
        method: "GET",
      }),
      transformResponse: (response: { data: RolesData[] }) => response.data,
    }),
  }),
});

export const { useGetRolesQuery } = employeeApi;
