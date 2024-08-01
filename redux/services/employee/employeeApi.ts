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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          // console.error('Error:', error);
        }
      },
    }),

    rejectEmployeeInvitation: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/invitation/${id}/reject`,
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          // console.error('Error:', error);
        }
      },
    }),
  }),
});

export const {
  useAcceptEmployeeInvitationMutation,
  useRejectEmployeeInvitationMutation,
} = employeeInvitationApi;
