import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

export const employeeInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    acceptEmployeeInvitation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/invitation/${id}/accept`,
        method: "POST",
        body: payload,
      }),
    }),

    rejectEmployeeInvitation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/invitation/${id}/reject`,
        method: "POST",
        body: payload,
      }),
    }),

    getInvitedEmployees: builder.query<BranchData[], string>({
      query: (id) => ({
        url: `/admin/invitation/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: { data: BranchData[] } }) =>
        response.data.data,
    }),
  }),
});

export const {
  useAcceptEmployeeInvitationMutation,
  useRejectEmployeeInvitationMutation,
  useGetInvitedEmployeesQuery,
} = employeeInvitationApi;
