import { baseApi } from "../baseApi";

export const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: `/admin/role`,
        method: "GET",
        // credentials: "include" as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result)
        } catch (error: any) {
          // console.log(error)
        }
      },
    })
  }),
});

export const {
    useGetAllRolesQuery
} = rolesApi;
